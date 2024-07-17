import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
/* eslint-disable-next-line */
import axios from 'axios';

// styles
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@/assets/styles/tailwind.css';

// mounting point for the whole app.
import App from '@/App.vue';

// layouts
import Admin from '@/layouts/Admin.vue';
import Auth from '@/layouts/Auth.vue';

// views for Admin layout
import Dashboard from '@/views/admin/Dashboard.vue';
import Settings from '@/views/admin/Settings.vue';
import Tables from '@/views/admin/Tables.vue';
import Maps from '@/views/admin/Maps.vue';
import Users from '@/views/admin/Users.vue';
import AddUser from '@/views/admin/AddUser.vue';
import EditUser from '@/views/admin/EditUser.vue';

// views for Auth layout
import Login from '@/views/auth/Login.vue';
import Register from '@/views/auth/Register.vue';

// views without layouts
import Landing from '@/views/Landing.vue';
import Profile from '@/views/Profile.vue';
import Index from '@/views/Index.vue';

// Importing your new components
import Beranda from '@/components/User/Beranda.vue';
import Search from '@/components/User/Search.vue';
import Informasi from '@/components/User/Informasi.vue';
import Kontak from '@/components/User/Kontak.vue';

// routes
const routes = [
  {
    path: '/admin',
    redirect: '/admin/dashboard',
    component: Admin,
    meta: { requiresAuth: true, title: 'Admin' }, // tambahkan title
    children: [
      {
        path: '/admin/dashboard',
        component: Dashboard,
        meta: { requiresAuth: true, title: 'Dashboard' },
      },
      {
        path: '/admin/settings',
        component: Settings,
        meta: { requiresAuth: true, title: 'Settings' },
      },
      {
        path: '/admin/tables',
        component: Tables,
        meta: { requiresAuth: true, title: 'Tables' },
      },
      {
        path: '/admin/maps',
        component: Maps,
        meta: { requiresAuth: true, title: 'Maps' },
      },
      {
        path: '/admin/users',
        component: Users,
        meta: { requiresAuth: true, title: 'Users' },
      },
      {
        path: '/admin/add-user',
        component: AddUser,
        meta: { requiresAuth: true, title: 'Add User' },
      },
      {
        path: '/admin/edit-user/:id',
        component: EditUser,
        meta: { requiresAuth: true, title: 'Edit User' },
      },
    ],
  },
  {
    path: '/auth',
    redirect: '/auth/login',
    component: Auth,
    children: [
      {
        path: '/auth/login',
        component: Login,
        meta: { title: 'Login' },
      },
      {
        path: '/auth/register',
        component: Register,
        meta: { title: 'Register' },
      },
    ],
  },
  {
    path: '/landing',
    component: Landing,
    meta: { title: 'Landing' },
  },
  {
    path: '/profile',
    component: Profile,
    meta: { title: 'Profile' },
  },
  {
    path: '/',
    component: Index,
    children: [
      {
        path: '',
        name: 'Beranda',
        component: Beranda,
        meta: { title: 'Beranda' },
      },
      {
        path: 'search',
        name: 'Search',
        component: Search,
        meta: { title: 'Search' },
      },
      {
        path: 'informasi',
        name: 'Informasi',
        component: Informasi,
        meta: { title: 'Informasi' },
      },
      {
        path: 'kontak',
        name: 'Kontak',
        component: Kontak,
        meta: { title: 'Kontak' },
      },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/', meta: { title: 'Home' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard untuk memeriksa autentikasi sebelum setiap perubahan rute
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Logika untuk memeriksa token di localStorage atau metode autentikasi lain
    const token = localStorage.getItem('token');
    if (!token) {
      next({
        path: '/auth/login',
        query: { redirect: to.fullPath }, // Redirect ke halaman login
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

// Setelah setiap rute berubah, perbarui judul halaman
router.afterEach((to) => {
  const defaultTitle = 'SBD BPKSDM';
  document.title = to.meta.title ? `${defaultTitle} | ${to.meta.title}` : defaultTitle;
});

createApp(App).use(router).mount('#app');
