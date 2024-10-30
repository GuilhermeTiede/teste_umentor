<script setup>
import {ref} from 'vue';
import {router} from '@inertiajs/vue3';
import {toast} from 'vue3-toastify';

const props = defineProps({
  viewRoute: String,
  editRoute: String,
  deleteRoute: String,
  openPdfRoute: String,
  customerId: Number,
  reloadDataTable: Function,
});

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
  router.delete(props.deleteRoute, {
    onFinish: () => {
      menu.value = false;
      if (props.reloadDataTable) props.reloadDataTable();
      toast.success('Removido com sucesso!');
    },
  });
};
</script>

<template>
  <div>


    <!-- Container flex para alinhar os ícones -->
    <div style="display: flex; align-items: center; gap: 8px;">
      <!-- Menu Icon -->
      <v-menu v-model="menu" :close-on-content-click="false" offset-y>
        <template #activator="{ props }">
          <i class="fas fa-ellipsis-v" style="cursor: pointer" v-bind="props"></i>
        </template>

        <!-- Lista de opções do menu -->
        <v-list>
          <!-- Ver Item -->
          <v-list-item v-if="viewRoute" @click="navigate(viewRoute)">
            <i class="fas fa-eye" style="margin-right: 8px;"></i>
            <v-list-item-title>Ver</v-list-item-title>
          </v-list-item>

          <!-- Editar Item -->
          <v-list-item v-if="editRoute" @click="navigate(editRoute)">
            <i class="fas fa-edit" style="margin-right: 8px;"></i>
            <v-list-item-title>Editar</v-list-item-title>
          </v-list-item>

          <!-- Deletar Item -->
          <v-list-item v-if="deleteRoute" @click="deleteItem">
            <i class="fas fa-trash" style="margin-right: 8px;"></i>
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
