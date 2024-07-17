<template>
  <div class="flex flex-wrap">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
      >
        <div class="px-6 py-4">
          <h3 class="text-2xl mb-4">Edit Pegawai</h3>
          <form @submit.prevent="updatePegawai">
            <div class="mb-3 pt-0">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="NIP"
              >
                NIP
              </label>
              <input
                v-model="form.nip"
                type="text"
                placeholder="NIP"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                required
                disabled
              />
            </div>
            <div class="mb-3 pt-0">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="NamaLengkap"
              >
                Nama Lengkap
              </label>
              <input
                v-model="form.nama_lengkap"
                type="text"
                placeholder="Nama Lengkap"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                required
              />
            </div>
            <div class="mb-3 pt-0">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="Instansi"
              >
                Instansi
              </label>
              <input
                v-model="form.instansi"
                type="text"
                placeholder="Instansi"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                required
              />
            </div>
            <div class="mb-3 pt-0">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="PangkatGolongan"
              >
                Pangkat Golongan
              </label>
              <input
                v-model="form.pangkat_golongan"
                type="text"
                placeholder="Pangkat/Golongan"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                required
              />
            </div>
            <div class="mb-3 pt-0">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="Jabatan"
              >
                Jabatan
              </label>
              <input
                v-model="form.jabatan"
                type="text"
                placeholder="Jabatan"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                required
              />
            </div>
            <div class="mb-3 pt-0">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="Esalon"
              >
                Esalon
              </label>
              <input
                v-model="form.esalon"
                type="text"
                placeholder="Esalon"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                required
              />
            </div>
            <div class="mb-3 pt-0">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="TahunAngkatan"
              >
                Tahun Angkatan
              </label>
              <input
                v-model="form.tahun"
                type="text"
                placeholder="Tahun"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                required
              />
            </div>
            <div class="mb-3 pt-0 flex space-x-4">
              <label class="inline-flex items-center">
                <input
                  type="checkbox"
                  v-model="form.pkn"
                  class="form-checkbox text-emerald-500"
                />
                <span class="ml-2">PKN</span>
              </label>
              <label class="inline-flex items-center">
                <input
                  type="checkbox"
                  v-model="form.pka"
                  class="form-checkbox text-emerald-500"
                />
                <span class="ml-2">PKA</span>
              </label>
              <label class="inline-flex items-center">
                <input
                  type="checkbox"
                  v-model="form.pkp"
                  class="form-checkbox text-emerald-500"
                />
                <span class="ml-2">PKP</span>
              </label>
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
        nip: "",
        nama_lengkap: "",
        instansi: "",
        pangkat_golongan: "",
        jabatan: "",
        esalon: "",
        tahun: "",
        pkn: false,
        pka: false,
        pkp: false,
      },
      pegawaiId: null,
    };
  },
  created() {
    this.pegawaiId = this.$route.params.id;
    this.fetchPegawai();
  },
  methods: {
    fetchPegawai() {
      axios
        .get(`http://localhost:8000/api/pegawai/${this.pegawaiId}`)
        .then((response) => {
          this.form = response.data;
        })
        .catch((error) => {
          console.error("Error fetching pegawai:", error);
        });
    },
    updatePegawai() {
      axios
        .put(`http://localhost:8000/api/pegawai/${this.pegawaiId}`, this.form)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Data pegawai berhasil diperbarui!",
          }).then(() => {
            this.$router.push("/admin/pegawai");
          });
        })
        .catch((error) => {
          console.error("Error updating pegawai:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data.message,
          });
        });
    },
  },
};
</script>

<style scoped>
/* Add any necessary styling here */
</style>
