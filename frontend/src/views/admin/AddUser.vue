<template>
  <div class="flex flex-wrap">
    <div class="w-full px-4">
      <div
        class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
      >
        <div class="px-6 py-4">
          <h3 class="text-2xl mb-4">Add User</h3>
          <form @submit.prevent="addUser">
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
                id="name"
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
                id="username"
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
                id="email"
                placeholder="Email"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                required
              />
              <div v-if="emailError" class="text-red-500 text-xs mt-1">
                {{ emailError }}
              </div>
            </div>
            <div class="mb-3 pt-0 relative">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="password"
              >
                Password
              </label>
              <div class="relative w-full">
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  placeholder="Password"
                  class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                  required
                />
                <div
                  class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  @click="togglePassword"
                >
                  <i
                    :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                  ></i>
                </div>
              </div>
            </div>
            <div class="mb-3 pt-0 relative">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="confirmPassword"
              >
                Confirm Password
              </label>
              <div class="relative w-full">
                <input
                  v-model="confirmPassword"
                  :type="showPassword ? 'text' : 'password'"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                  required
                />
                <div
                  class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  @click="togglePassword"
                >
                  <i
                    :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                  ></i>
                </div>
              </div>
              <div v-if="passwordError" class="text-red-500 text-xs mt-1">
                {{ passwordError }}
              </div>
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
      emailError: "",
      passwordError: "",
      showPassword: false,
    };
  },
  methods: {
    validateEmail() {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
      return re.test(String(this.form.email).toLowerCase());
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    addUser() {
      this.emailError = "";
      this.passwordError = "";

      if (!this.validateEmail()) {
        this.emailError = "Please enter a valid email address.";
        return;
      }

      if (this.form.password !== this.confirmPassword) {
        this.passwordError = "Passwords do not match.";
        return;
      }

      axios
        .post("http://localhost:8000/api/users", this.form)
        .then(() => {
          this.$router.push("/admin/users");
        })
        .catch((error) => {
          console.error("Error adding user:", error);
        });
    },
  },
};
</script>

<style scoped>
.input-wrapper {
  position: relative;
}
.input-wrapper input {
  width: 100%;
}
.input-wrapper .eye-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>
