<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, usePage, useForm } from '@inertiajs/vue3';
import { toast } from "vue3-toastify";
import { onMounted, ref, h, } from "vue";
import DataTable from '@/Components/DataTable.vue';
import {route} from "ziggy-js";
import ItemActions from "@/Components/ItemActions.vue";

const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: 'Nome '},
  { field: 'email', headerName: 'E-mail', sortable: true },
];

const { props } = usePage();

const customColumns = ref([...columns]);
const url = ref(route('users.index'));

const users = ref(props.users || []);
const success = props.flash?.success;
const error = props.flash?.error;

onMounted(() => {
  if (success) {
    toast.success(success);
  } else if(error) {
    toast.error(error);
  }
});
</script>

<template>
  <div>
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
          <DataTable
              :url="url"
              :columns="customColumns"
              :pageSize="25"
              :rowsPerPageOptions="[25, 50, 100]"
          />
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
  </div>
</template>
