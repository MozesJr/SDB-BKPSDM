<template>
  <div class="flex flex-wrap">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
      >
        <div class="px-6 py-4">
          <h3 class="text-2xl mb-4">Add Informasi</h3>
          <form @submit.prevent="createInformasi">
            <div class="mb-3 pt-0">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="Judul"
              >
                Judul
              </label>
              <input
                v-model="form.judul"
                type="text"
                placeholder="Judul"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                required
              />
            </div>
            <div class="mb-3 pt-0">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="Deskripsi"
              >
                Deskripsi
              </label>
              <ckeditor
                :editor="editor"
                v-model="form.deskripsi"
                :config="editorConfig"
              />
            </div>
            <div class="mb-3 pt-0">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="User"
              >
                User
              </label>
              <select
                v-model="form.user"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                required
              >
                <option v-for="user in users" :key="user._id" :value="user._id">
                  {{ user.name }}
                </option>
              </select>
            </div>
            <div class="mb-3 pt-0">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="Image"
              >
                Image
              </label>
              <input
                type="file"
                @change="onFileChange"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
              />
              <div v-if="imagePreview" class="mt-3">
                <img :src="imagePreview" class="w-full h-auto rounded" />
              </div>
            </div>
            <div class="flex items-center justify-end">
              <router-link
                to="/admin/data-informasi"
                class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              >
                Cancel
              </router-link>
              <button
                class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
              >
                Save
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
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from "sweetalert2"; // Import SweetAlert

export default {
  components: {
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      form: {
        judul: "",
        deskripsi: "",
        user: "",
        image: null,
      },
      users: [],
      imagePreview: null,
      editor: ClassicEditor,
      editorConfig: {
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "link",
          "bulletedList",
          "numberedList",
          "|",
          "indent",
          "outdent",
          "|",
          "blockQuote",
          "insertTable",
          "mediaEmbed",
          "undo",
          "redo",
        ],
      },
    };
  },
  methods: {
    async fetchUsers() {
      const response = await axios.get("http://localhost:8000/api/users");
      this.users = response.data;
    },
    onFileChange(event) {
      const file = event.target.files[0];
      this.form.image = file;
      this.imagePreview = URL.createObjectURL(file);
    },
    async createInformasi() {
      const formData = new FormData();
      formData.append("judul", this.form.judul);
      formData.append("deskripsi", this.form.deskripsi);
      formData.append("user", this.form.user);
      if (this.form.image) {
        formData.append("image", this.form.image);
      }

      try {
        await axios.post("http://localhost:8000/api/informasi", formData);
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Data informasi berhasil ditambahkan.",
          showConfirmButton: false,
          timer: 1500,
        });
        this.$router.push("/admin/data-informasi");
      } catch (error) {
        console.error("Error creating informasi:", error);
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Terjadi kesalahan saat menambahkan data informasi.",
        });
      }
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
/* Add any necessary styling here */
</style>
