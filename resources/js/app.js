import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, h } from 'vue';
import { ZiggyVue } from 'ziggy-js';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import { createPinia } from 'pinia';
import { mask } from 'vue-the-mask';
import { VMoney } from 'v-money';
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

//Imports do Datatables
import DataTablesLib from 'datatables.net';
import DataTable from 'datatables.net-vue3';
DataTable.use(DataTablesLib);

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const vuetify = createVuetify();


createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        const pinia = createPinia();

        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue, Ziggy)
            .use(vuetify)
            .use(Vue3Toastify)
            .use(pinia)
            .directive('mask', mask)
            .directive('money', VMoney)
            .component('DataTable', DataTable)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
