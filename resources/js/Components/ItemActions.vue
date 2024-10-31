<script setup>
import {ref} from 'vue';
import {router} from '@inertiajs/vue3';
import {toast} from 'vue3-toastify';
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import http from "@/Libs/Http.js";

const props = defineProps({
  viewRoute: String,
  editRoute: String,
  deleteRoute: String,
  openPdfRoute: String,
  customerId: Number,
  reloadDataTable: Function,
});
const emit = defineEmits(['reload']);


const menu = ref(false);
const importDialog = ref(false);

const navigate = (route) => {
  router.visit(route);
  menu.value = false;
};

const openPdf = () => {
  window.open(props.openPdfRoute, '_self');
  menu.value = false;
};

const deleteItem = () => {
  http.delete(props.deleteRoute)
      .then((response) => {
        if (response.data.success) {
          emit('reload');
          toast.success(response.data.success);
        }
      })
      .catch((error) => {
        if (error.response && error.response.data.error) {
          toast.error(error.response.data.error);
        }
      })
      .finally(() => {
        menu.value = false;
      });
};
</script>

<template>
  <div>
    <!-- Container flex para alinhar os ícones -->
    <div style="display: flex; align-items: center; gap: 8px;">
      <!-- Menu Icon -->
      <v-menu v-model="menu" :close-on-content-click="false" offset-y>
        <template v-slot:activator="{ props }">
          <menu-icon style="cursor: pointer" v-bind="props"/>
        </template>

        <!-- Lista de opções do menu -->
        <v-list>
          <!-- Ver Item -->
          <v-list-item v-if="viewRoute" @click="navigate(viewRoute)">
            <v-list-item-title>Ver</v-list-item-title>
          </v-list-item>

          <!-- Editar Item -->
          <v-list-item v-if="editRoute" @click="navigate(editRoute)">
            <v-list-item-title>Editar</v-list-item-title>
          </v-list-item>

          <!-- Deletar Item -->
          <v-list-item v-if="deleteRoute" @click="deleteItem">
            <v-list-item-title>Deletar</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<style scoped>
.v-list-item {
  cursor: pointer;
}
</style>
