import _ from 'lodash';
window._ = _;

import './api/axios';
import { createApp } from 'vue';
import App from './App.vue';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

const app = createApp(App);

app.use(VueSweetalert2);
app.component('EasyDataTable', Vue3EasyDataTable);
app.mount('#app');
