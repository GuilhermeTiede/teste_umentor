<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, usePage, useForm } from '@inertiajs/vue3';
import { toast } from "vue3-toastify";
import { onMounted, ref, computed } from "vue";
import DangerButton from "@/Components/DangerButton.vue";
import http from "@/Libs/Http.js";
import { VDataTable, VTextField, VBtn } from 'vuetify/components';

const { props } = usePage();
const users = ref(props.users || []);
const success = props.flash?.success;
const error = props.flash?.error;
const searchQuery = ref("");

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value;
  return users.value.filter(user => user.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

const deleteUser = (id) => {
  http.delete(route('users.destroy', id))
      .then((response) => {
        if (response.data.success) {
          users.value = users.value.filter(user => user.id !== id);
          toast.success(response.data.success);
        }
      })
      .catch((error) => {
        if (error.response && error.response.data.error) {
          toast.error(error.response.data.error);
        }
      });
};

onMounted(() => {
  if (success) {
    toast.success(success);
  } else if(error) {
    toast.error(error);
  }
});
</script>

<template>
  <Head title="Dashboard" />

  <AuthenticatedLayout>
    <template #header>
      <div class="flex justify-between items-center">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">Cadastrar Usuários</h2>
        <Link :href="route('users.create')" class="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm">
          Cadastrar Usuário
        </Link>
      </div>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
        <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
          <!-- Campo de Busca -->
          <VTextField
              v-model="searchQuery"
              label="Buscar por Nome"
              prepend-inner-icon="mdi-magnify"
              outlined
              dense
          />

          <!-- Tabela com Vuetify -->
          <VDataTable
              :items="filteredUsers"
              :headers="[
              { text: 'Nome', value: 'name' },
              { text: 'Ações', value: 'actions', sortable: false }
            ]"
              item-value="id"
              class="mt-4"
          >
            <template #item.name="{ item }">
              <span>{{ item.name }}</span>
            </template>
            <template #item.actions="{ item }">
              <Link :href="route('users.edit', item.id)" class="text-indigo-600 hover:text-indigo-900">
                <i class="fas fa-edit"></i>
              </Link>
              <DangerButton @click="() => deleteUser(item.id)">
                <i class="fas fa-trash"></i>
              </DangerButton>
            </template>
          </VDataTable>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
