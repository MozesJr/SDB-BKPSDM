<template>
  <div class="flex flex-wrap">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
      >
        <div class="px-6 py-4">
          <h3 class="text-2xl mb-4">Edit User</h3>
          <form @submit.prevent="updateUser">
            <div class="mb-3 pt-0">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="name"
              >
                Name
              </label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Name"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                required
              />
            </div>
            <div class="mb-3 pt-0">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="username"
              >
                Username
              </label>
              <input
                v-model="form.username"
                type="text"
                placeholder="Username"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                required
              />
            </div>
            <div class="mb-3 pt-0">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="email"
              >
                Email
              </label>
              <input
                v-model="form.email"
                type="email"
                placeholder="Email"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                required
              />
            </div>
            <div class="mb-3 pt-0 relative">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="password"
              >
                Password
              </label>
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Password"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
              />
              <i
                :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                @click="togglePassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-blueGray-600"
              ></i>
            </div>
            <div class="mb-3 pt-0 relative">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Confirm Password"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
              />
              <i
                :class="showConfirmPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                @click="toggleConfirmPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-blueGray-600"
              ></i>
            </div>
            <div class="flex items-center justify-end">
              <router-link
                to="/admin/users"
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

export default {
  data() {
    return {
      form: {
        name: "",
        username: "",
        email: "",
        password: "",
      },
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
      userId: null,
    };
  },
  created() {
    this.userId = this.$route.params.id;
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      axios
        .get(`http://localhost:8000/api/users/${this.userId}`)
        .then((response) => {
          this.form = response.data;
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    },
    updateUser() {
      if (this.form.password && this.form.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      axios
        .put(`http://localhost:8000/api/users/${this.userId}`, this.form)
        .then(() => {
          this.$router.push("/admin/users");
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
  },
};
</script>

<style scoped>
/* Add any necessary styling here */
</style>
