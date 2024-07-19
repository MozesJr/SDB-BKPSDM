<template>
  <div class="flex flex-wrap">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
      >
        <div class="px-6 py-4">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-blueGray-700">
                Data Informasi
              </h3>
            </div>
            <div
              class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
            >
              <router-link
                to="/admin/add-informasi"
                class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              >
                <i class="fas fa-plus"></i> Add Informasi
              </router-link>
            </div>
          </div>
          <table class="w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >
                  No
                </th>
                <th
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >
                  Judul
                </th>
                <th
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >
                  Deskripsi
                </th>
                <th
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >
                  Gambar
                </th>
                <th
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >
                  Author
                </th>
                <th
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >
                  Tanggal Upload
                </th>
                <th
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(informasi, index) in informasiList"
                :key="informasi._id"
              >
                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                >
                  {{ index + 1 }}
                </td>
                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                >
                  {{ informasi.judul }}
                </td>
                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-normal p-4 max-w-xs"
                >
                  {{ informasi.deskripsi.slice(0, 200)
                  }}{{ informasi.deskripsi.length > 200 ? "..." : "" }}
                </td>
                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                >
                  <img
                    :src="`http://localhost:8000/uploads/${
                      informasi.image || 'default-image.jpg'
                    }`"
                    class="w-20 h-auto rounded"
                    alt="Informasi Image"
                  />
                </td>
                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                >
                  {{ informasi.user.name }}
                </td>
                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                >
                  {{ new Date(informasi.created_at).toLocaleString() }}
                </td>
                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                >
                  <button
                    @click="editInformasi(informasi._id)"
                    class="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteInformasi(informasi._id)"
                    class="bg-red-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Delete
                  </button>
                  <router-link
                    :to="`/admin/detail-informasi/${informasi._id}`"
                    class="bg-emerald-500 text-white px-2 py-1 rounded"
                  >
                    Detail
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert

export default {
  data() {
    return {
      informasiList: [],
    };
  },
  methods: {
    fetchInformasi() {
      axios
        .get("http://localhost:8000/api/informasi")
        .then((response) => {
          this.informasiList = response.data;
        })
        .catch((error) => {
          console.error("Error fetching informasi:", error);
        });
    },
    editInformasi(id) {
      this.$router.push(`/admin/update-informasi/${id}`);
    },
    deleteInformasi(id) {
      Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Data ini akan dihapus dan tidak dapat dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://localhost:8000/api/informasi/${id}`)
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: "Data informasi berhasil dihapus.",
                showConfirmButton: false,
                timer: 1500,
              });
              this.fetchInformasi();
            })
            .catch((error) => {
              console.error("Error deleting informasi:", error);
              Swal.fire({
                icon: "error",
                title: "Gagal!",
                text: "Terjadi kesalahan saat menghapus data informasi.",
              });
            });
        }
      });
    },
  },
  created() {
    this.fetchInformasi();
  },
};
</script>

<style scoped>
.max-w-xs {
  max-width: 20rem;
  white-space: normal;
}
</style>

<style scoped>
.max-w-xs {
  max-width: 20rem;
  white-space: normal;
}
</style>
