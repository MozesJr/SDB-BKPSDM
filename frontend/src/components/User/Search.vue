<template>
  <div>
    <IndexNavbar />
    <main>
      <div
        class="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75"
      >
        <div
          class="absolute top-0 w-full h-full bg-center bg-cover"
          style="
            background-image: url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80');
          "
        >
          <span
            id="blackOverlay"
            class="w-full h-full absolute opacity-75 bg-black"
          ></span>
        </div>
        <div class="container relative mx-auto">
          <div class="items-center flex flex-wrap">
            <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div class="pr-12">
                <h1 class="text-white font-semibold text-5xl">
                  Pencarian Data Pegawai
                </h1>
                <p class="mt-4 text-lg text-blueGray-200">
                  Sub Bidang Diklat Badan Kepegawaian dan Pengembangan Sumber
                  Daya Manusia. Kabupaten Manokwari Selatan, Provinsi Papua
                  Barat, Indonesia.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style="transform: translateZ(0)"
        >
          <svg
            class="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              class="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </div>

      <section class="pb-20 bg-blueGray-200 -mt-24">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap">
            <div class="w-full md:w-12/12 px-4 text-center">
              <div
                class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
              >
                <div class="px-12 py-5 flex-auto">
                  <div class="text-center">
                    <h6 class="text-xl font-semibold">
                      Pencarian Data Pegawai
                    </h6>
                    <p class="mt-2 mb-4 text-blueGray-500">
                      Masukkan kata kunci dan pilih kategori untuk mencari data
                      pegawai.
                    </p>
                  </div>
                  <div class="flex justify-center">
                    <div class="relative mr-4">
                      <select
                        v-model="selectedCategory"
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      >
                        <option>Semua</option>
                        <option value="nip">NIP</option>
                        <option value="nama_lengkap">Nama Lengkap</option>
                        <option value="instansi">Instansi</option>
                        <option value="jabatan">Jabatan</option>
                      </select>
                    </div>
                    <div class="w-full px-4 flex-1">
                      <input
                        v-model="keyword"
                        type="text"
                        placeholder="Keyword: [NIP] [Nama Lengkap] [Instansi] [Jabatan]"
                        class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                      />
                      <button
                        @click="searchData"
                        class="ml-2 absolute flex text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400"
                      >
                        <i class="fas fa-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
              >
                <div v-if="searchResults.length">
                  <table class="table-auto w-full text-left">
                    <thead>
                      <tr>
                        <th class="px-4 py-2">NIP</th>
                        <th class="px-4 py-2">Nama Lengkap</th>
                        <!-- <th class="px-4 py-2">Instansi</th>
                        <th class="px-4 py-2">Jabatan</th> -->
                        <th class="px-4 py-2">Pangkat/Golongan</th>
                        <th class="px-4 py-2">Esalon</th>
                        <!-- <th class="px-4 py-2">Tahun</th> -->
                        <th class="px-4 py-2">PKN</th>
                        <th class="px-4 py-2">PKA</th>
                        <th class="px-4 py-2">PKP</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(result, index) in searchResults" :key="index">
                        <td class="border px-4 py-2">{{ result.nip }}</td>
                        <td class="border px-4 py-2">
                          {{ result.nama_lengkap }}
                        </td>
                        <!-- <td class="border px-4 py-2">{{ result.instansi }}</td>
                        <td class="border px-4 py-2">{{ result.jabatan }}</td> -->
                        <td class="border px-4 py-2">
                          {{ result.pangkat_golongan }}
                        </td>
                        <td class="border px-4 py-2">{{ result.esalon }}</td>
                        <!-- <td class="border px-4 py-2">{{ result.tahun }}</td> -->
                        <td class="border px-4 py-2">
                          {{ result.pkn ? "✔" : "✘" }}
                        </td>
                        <td class="border px-4 py-2">
                          {{ result.pka ? "✔" : "✘" }}
                        </td>
                        <td class="border px-4 py-2">
                          {{ result.pkp ? "✔" : "✘" }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-else>
                  <p class="text-blueGray-500">
                    Tidak ada data yang ditemukan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer-component />
  </div>
</template>

<script>
import axios from "axios";
import IndexNavbar from "@/components/Navbars/IndexNavbar.vue";
import FooterComponent from "@/components/Footers/Footer.vue";

export default {
  data() {
    return {
      keyword: "",
      selectedCategory: "Semua",
      searchResults: [],
    };
  },
  methods: {
    searchData() {
      axios
        .get("http://localhost:8000/api/search-pegawai", {
          params: {
            category: this.selectedCategory,
            keyword: this.keyword,
          },
        })
        .then((response) => {
          this.searchResults = response.data;
        })
        .catch((error) => {
          console.error("Error searching data:", error);
        });
    },
  },
  components: {
    IndexNavbar,
    FooterComponent,
  },
};
</script>

<style scoped>
/* Add any necessary styling here */
</style>
