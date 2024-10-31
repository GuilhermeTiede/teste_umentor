<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, usePage, useForm } from '@inertiajs/vue3';
import { toast } from "vue3-toastify";
import { onMounted, ref, h, watch} from "vue";
import DataTable from '@/Components/DataTable.vue';
import {route} from "ziggy-js";
import ItemActions from "@/Components/ItemActions.vue";

const defaultFilter = {
  name: '',
  email: '',
};

const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: 'Nome '},
  { field: 'email', headerName: 'E-mail'},
  { field: 'created_at', headerName: 'Criado em'},
  { field: 'updated_at', headerName: 'Atualizado em'},
  {
    field: 'actions',
    headerName: 'Ações',
    sortable: false,
    filterable: false,
    renderCell: (props) => {
      return h(ItemActions, {
        editRoute: route('users.edit', [props.row.id]),
        deleteRoute: route('users.destroy', [props.row.id]),
      });
    },
  },
];

const { props } = usePage();

const filter = ref({
  ...defaultFilter,
});

const customColumns = ref([...columns]);
const url = ref(route('users.index'));

const users = ref(props.users || []);
const success = props.flash?.success;
const error = props.flash?.error;

onMounted(() => {
  if (success) {
    toast.success(success);
  } else if (error) {
    toast.error(error);
  }
});
watch(filter, (newFilter) => {
  customColumns.value = columns.map((column) => {
    if (typeof newFilter[column.field] === 'undefined' || newFilter[column.field] === '') {
      return { ...column };
    }

    const searchValue = newFilter[column.field];

    return {
      ...column,
      search: {
        value: searchValue === null ? 'null' : searchValue,
        regex: false,
        operator:
            searchValue === null
                ? 'isEmpty'
                : (column.search && column.search.operator) || 'equals',
      },
    };
  });
}, { deep: true });

const onReset = () => {
  filter.value = { ...defaultFilter };
  customColumns.value = [...columns];
};

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
        <div class="mb-4">
          <label class="block text-lg font-medium text-gray-700">Filtros</label>
        </div>
        <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg flex flex-wrap gap-4">
          <input
              type="text"
              v-model="filter.name"
              placeholder="Nome"
              class="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <input
              type="text"
              v-model="filter.email"
              placeholder="E-mail"
              class="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
              @click="onReset"
              class="text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm"
          >
            Limpar Filtros
          </button>
        </div>
      </div>
    </div>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
        <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
          <DataTable
              :url="url"
              :columns="customColumns"
              :pageSize="25"
              :rowsPerPageOptions="[25, 50, 100]"
              :filters="filter"
          />
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
  </div>
</template>
