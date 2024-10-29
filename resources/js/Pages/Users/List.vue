<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, usePage, useForm} from '@inertiajs/vue3';
import {toast} from "vue3-toastify";
import {onMounted} from "vue";
import DangerButton from "@/Components/DangerButton.vue";

const { props } = usePage();
console.log(props.flash);
const users = props.users || [];
const success = props.flash?.success;
const error = props.flash?.error;


const form = useForm({})

const deleteUser = (id) => {
 form.delete(route('users.destroy', id), {
   onSuccess: () => {
     toast.success('Usuário excluído com sucesso.');
   },
   onError: () => {
     toast.error('Ocorreu um erro ao excluir o usuário.');
   }
 });
};

onMounted(() => {
  if (success) {
    toast.success(success);
  } else if(error){
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
        <Link :href="route('users.create')"
              class="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm">
          Cadastrar Usuários
        </Link>
      </div>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
        <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
          <table class="min-w-full bg-white border border-gray-200">
            <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in users" :key="user.id" class="bg-white border-b border-gray-200">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ user.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center space-x-2">
                <Link :href="route('users.edit', user.id)"
                      class="text-indigo-600 hover:text-indigo-900">
                  <i class="fas fa-edit"></i>
                </Link>
                <DangerButton
                    class="ml-3"
                    @click="() => deleteUser(user.id)"
                >
                  <i class="fas fa-trash"></i>
                </DangerButton>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </AuthenticatedLayout>
</template>
