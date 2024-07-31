<template>
  <div class="flex flex-wrap">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
      >
        <div class="px-6 py-4">
          <h3 class="text-2xl mb-4">Edit Jadwal Pelatihan</h3>
          <form @submit.prevent="updateJadwalPelatihan">
            <div class="mb-3 pt-0">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="judul"
              >
                Judul Pelatihan
              </label>
              <input
                v-model="form.judul"
                type="text"
                id="judul"
                placeholder="Judul Pelatihan"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                required
              />
            </div>
            <div class="mb-3 pt-0">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="file_pdf"
              >
                File PDF (Optional)
              </label>
              <input
                type="file"
                id="file_pdf"
                @change="onFileChange"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
              />
            </div>
            <div class="flex items-center justify-end">
              <router-link
                to="/admin/jadwal-pelatihan"
                class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              >
                Cancel
              </router-link>
              <button
                class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      form: {
        judul: "",
      },
      selectedFile: null,
      jadwalId: this.$route.params.id,
    };
  },
  created() {
    this.fetchJadwalPelatihan();
  },
  methods: {
    async fetchJadwalPelatihan() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/jadwal-pelatihan/${this.jadwalId}`
        );
        this.form = response.data;
      } catch (error) {
        console.error("Error fetching jadwal pelatihan:", error);
      }
    },
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async updateJadwalPelatihan() {
      const formData = new FormData();
      formData.append("judul", this.form.judul);
      if (this.selectedFile) {
        formData.append("file_pdf", this.selectedFile);
      }

      try {
        await axios.put(
          `http://localhost:8000/api/jadwal-pelatihan/${this.jadwalId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Jadwal pelatihan berhasil diperbarui.",
          showConfirmButton: false,
          timer: 1500,
        });
        this.$router.push("/admin/jadwal-pelatihan");
      } catch (error) {
        console.error("Error updating jadwal pelatihan:", error);
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Terjadi kesalahan saat memperbarui jadwal pelatihan.",
        });
      }
    },
  },
};
</script>
