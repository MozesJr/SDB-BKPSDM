<template>
  <div>
    <index-navbar />
    <main>
      <section
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
                  {{ informasi.judul }}
                </h1>
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
      </section>

      <section class="pb-20 bg-blueGray-200 -mt-24">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap">
            <div class="w-full px-4">
              <div
                class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
              >
                <div class="px-6 py-4">
                  <img
                    :src="`http://localhost:8000/uploads/${informasi.image}`"
                    class="w-full h-auto rounded"
                    v-if="informasi.image"
                  />
                  <div class="mt-4" v-html="informasi.deskripsi"></div>
                </div>
                <div class="px-6 py-4">
                  <router-link
                    :to="`/data-informasi`"
                    class="text-lightBlue-500 underline"
                  >
                    Kembali
                  </router-link>
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
      informasi: {
        judul: "",
        deskripsi: "",
        user: {},
        image: "",
      },
    };
  },
  components: {
    IndexNavbar,
    FooterComponent,
  },
  methods: {
    async fetchInformasi(id) {
      const response = await axios.get(
        `http://localhost:8000/api/informasi/${id}`
      );
      this.informasi = response.data;
    },
  },
  created() {
    this.fetchInformasi(this.$route.params.id);
  },
};
</script>

<style scoped>
/* Add any necessary styling here */
</style>
