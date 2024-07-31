<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-lg text-blueGray-700">
            Manage Jadwal Pelatihan
          </h3>
        </div>
        <div
          class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
        >
          <router-link
            to="/admin/add-jadwal-pelatihan"
            class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          >
            <i class="fas fa-plus"></i> Add Jadwal Pelatihan
          </router-link>
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <!-- Jadwal Pelatihan table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
            >
              No
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
            >
              Judul Pelatihan
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
            >
              File PDF
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(jadwal, index) in jadwalPelatihanList" :key="jadwal._id">
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ index + 1 }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ jadwal.judul }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <a
                :href="`http://localhost:8000/uploads/${jadwal.file_pdf}`"
                target="_blank"
                >{{ jadwal.file_pdf }}</a
              >
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <button
                @click="editJadwalPelatihan(jadwal)"
                class="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                @click="deleteJadwalPelatihan(jadwal._id)"
                class="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      jadwalPelatihanList: [],
    };
  },
  created() {
    this.fetchJadwalPelatihan();
  },
  methods: {
    async fetchJadwalPelatihan() {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/jadwal-pelatihan"
        );
        this.jadwalPelatihanList = response.data;
      } catch (error) {
        console.error("Error fetching jadwal pelatihan:", error);
      }
    },
    editJadwalPelatihan(jadwal) {
      this.$router.push({ path: `/admin/edit-jadwal-pelatihan/${jadwal._id}` });
    },
    async deleteJadwalPelatihan(id) {
      try {
        await axios.delete(`http://localhost:8000/api/jadwal-pelatihan/${id}`);
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Jadwal pelatihan berhasil dihapus.",
          showConfirmButton: false,
          timer: 1500,
        });
        this.fetchJadwalPelatihan();
      } catch (error) {
        console.error("Error deleting jadwal pelatihan:", error);
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Terjadi kesalahan saat menghapus jadwal pelatihan.",
        });
      }
    },
  },
};
</script>
