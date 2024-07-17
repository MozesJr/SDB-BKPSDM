<template>
  <div class="flex flex-wrap">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
      >
        <div class="px-6 py-4">
          <h3 class="text-2xl mb-6">Import Pegawai</h3>
          <a
            href="http://localhost:8080/api/download-template"
            class="bg-emerald-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            download
          >
            Download Template Excel
          </a>
          <form @submit.prevent="importPegawai">
            <div class="mb-3 pt-0">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2 mt-6"
                for="file"
              >
                Pilih File Excel
              </label>
              <input
                ref="file"
                type="file"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                accept=".xlsx, .xls"
                required
              />
            </div>
            <div class="flex items-center justify-end">
              <router-link
                to="/admin/pegawai"
                class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              >
                Cancel
              </router-link>
              <button
                class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
              >
                Import
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
  methods: {
    async importPegawai() {
      const fileInput = this.$refs.file;
      const formData = new FormData();
      formData.append("file", fileInput.files[0]);

      try {
        await axios.post("http://localhost:8000/api/import-pegawai", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        Swal.fire("Success", "Data pegawai berhasil diimpor.", "success");
        this.$router.push("/admin/pegawai");
      } catch (error) {
        Swal.fire("Error", error.response.data.message, "error");
      }
    },
  },
};
</script>

<style scoped>
/* Add any necessary styling here */
</style>
