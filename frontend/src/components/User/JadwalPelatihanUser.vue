<template>
  <div>
    <index-navbar />
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
                  Jadwal Pelatihan
                </h1>
                <p class="mt-4 text-lg text-blueGray-200">
                  Berikut merupakan jadwal pelatihan yang tersedia.
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
            <div
              v-for="jadwal in jadwalPelatihanList"
              :key="jadwal._id"
              class="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center"
            >
              <div
                class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
              >
                <div class="px-4 py-5 flex-auto">
                  <div
                    class="text-white p-3 text-center inline-flex items-center justify-center rounded-full"
                  >
                    <i class="fas fa-file-pdf fa-3x text-red-500"></i>
                  </div>
                  <h6 class="text-xl font-semibold mt-4">
                    <a
                      :href="`http://localhost:8000/uploads/${jadwal.file_pdf}`"
                      target="_blank"
                      class="text-lightBlue-500 underline"
                    >
                      {{ jadwal.judul }}
                    </a>
                  </h6>
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
import FooterComponent from "@/components/Footers/Footer.vue";
import IndexNavbar from "@/components/Navbars/IndexNavbar.vue";

export default {
  data() {
    return {
      jadwalPelatihanList: [],
    };
  },
  components: {
    IndexNavbar,
    FooterComponent,
  },
  methods: {
    fetchJadwalPelatihan() {
      axios
        .get("http://localhost:8000/api/jadwal-pelatihan")
        .then((response) => {
          this.jadwalPelatihanList = response.data;
        })
        .catch((error) => {
          console.error("Error fetching jadwal pelatihan:", error);
        });
    },
  },
  created() {
    this.fetchJadwalPelatihan();
  },
};
</script>

<style scoped>
/* Add any necessary styling here */
</style>
