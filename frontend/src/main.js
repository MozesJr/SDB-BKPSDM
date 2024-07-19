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
import Pegawai from '@/views/admin/Pegawai.vue';
import AddPegawai from '@/views/admin/AddPegawai.vue';
import EditPegawai from '@/views/admin/EditPegawai.vue';
import ImportPegawai from '@/views/admin/ImportPegawai.vue';
import DataInformasi from '@/views/admin/DataInformasi.vue';
import AddInformasi from '@/views/admin/AddInformasi.vue';
import UpdateInformasi from '@/views/admin/EditInformasi.vue';
import DetailInformasi from '@/views/admin/DetailInformasi.vue';

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
import Information from '@/components/User/Informasi.vue';
import DetailInformation from '@/components/User/DetailInformasi.vue';
import Kontak from '@/components/User/Kontak.vue';
import ContactUs from '@/components/User/Kontak.vue';

// routes
const routes = [
  {
    path: '/admin',
    redirect: '/admin/dashboard',
    component: Admin,
    meta: { requiresAuth: true }, // tambahkan meta requiresAuth
    children: [
      {
        path: '/admin/dashboard',
        component: Dashboard,
        meta: { requiresAuth: true },
      },
      {
        path: '/admin/settings',
        component: Settings,
        meta: { requiresAuth: true },
      },
      {
        path: '/admin/tables',
        component: Tables,
        meta: { requiresAuth: true },
      },
      {
        path: '/admin/maps',
        component: Maps,
        meta: { requiresAuth: true },
      },
      {
        path: '/admin/users',
        component: Users,
        meta: { requiresAuth: true },
      },
      {
        path: '/admin/add-user',
        component: AddUser,
        meta: { requiresAuth: true },
      },
      {
        path: '/admin/edit-user/:id',
        component: EditUser,
        meta: { requiresAuth: true },
      },
      {
        path: '/admin/pegawai',
        component: Pegawai,
        meta: { requiresAuth: true },
      },
      {
        path: '/admin/add-pegawai',
        component: AddPegawai,
        meta: { requiresAuth: true },
      },
      {
        path: '/admin/edit-pegawai/:id',
        component: EditPegawai,
        meta: { requiresAuth: true },
      },
      {
        path: '/admin/import-pegawai',
        component: ImportPegawai,
        meta: { requiresAuth: true, title: 'Import Pegawai' },
      },
      {
        path: '/admin/data-informasi',
        component: DataInformasi,
        meta: { requiresAuth: true, title: 'Data Informasi' },
      },
      {
        path: '/admin/add-informasi',
        component: AddInformasi,
        meta: { requiresAuth: true, title: 'Tambah Data Informasi' },
      },
      {
        path: '/admin/update-informasi/:id',
        component: UpdateInformasi,
        meta: { requiresAuth: true, title: 'Ubah Data Informasi' },
      },
      {
        path: '/admin/detail-informasi/:id',
        component: DetailInformasi,
        meta: { requiresAuth: true, title: 'Ubah Data Informasi' },
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
      },
      {
        path: '/auth/register',
        component: Register,
      },
    ],
  },
  {
    path: '/landing',
    component: Landing,
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/search-employee',
    name: 'Search',
    component: Search,
    meta: { title: 'Search Pegawai' },
  },
  {
    path: '/contact-us',
    name: 'ContactUs',
    component: ContactUs,
    meta: { title: 'ContactUs' },
  },
  {
    path: '/data-informasi',
    name: 'Information',
    component: Information,
    meta: { title: 'Information' },
  },
  {
    path: '/informasi/:id',
    name: 'DetailInformasi',
    component: DetailInformation,
  },
  {
    path: '/',
    component: Index,
    children: [
      {
        path: '',
        name: 'Beranda',
        component: Beranda,
      },
      {
        path: 'informasi',
        name: 'Informasi',
        component: Informasi,
      },
      {
        path: 'kontak',
        name: 'Kontak',
        component: Kontak,
      },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
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

createApp(App).use(router).mount('#app');
