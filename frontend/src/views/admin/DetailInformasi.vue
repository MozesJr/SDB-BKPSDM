<template>
  <div class="flex flex-wrap">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
      >
        <div class="px-6 py-4">
          <h3 class="text-2xl mb-4">{{ informasi.judul }}</h3>
          <div class="mb-3 pt-0">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              for="Deskripsi"
            >
              Deskripsi
            </label>
            <div v-html="informasi.deskripsi"></div>
          </div>
          <div class="mb-3 pt-0">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              for="User"
            >
              Author
            </label>
            <p>{{ informasi.user.name }}</p>
          </div>
          <div class="mb-3 pt-0">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              for="Image"
            >
              Image
            </label>
            <img
              :src="`http://localhost:8000/uploads/${informasi.image}`"
              class="w-full h-auto rounded"
              v-if="informasi.image"
            />
          </div>
          <div class="flex items-center justify-end">
            <router-link
              to="/admin/data-informasi"
              class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            >
              Back
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
