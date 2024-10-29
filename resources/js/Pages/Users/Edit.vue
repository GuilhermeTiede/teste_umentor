<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import {Head, Link, useForm, usePage} from '@inertiajs/vue3';
import {onMounted} from "vue";
import {toast} from "vue3-toastify";

const {props} = usePage();
const user = props.user || {};
const editMode = !!user.id;
const success = props.flash?.success;
const error = props.flash?.error;

const form = useForm({
  name: user.name || '',
  email: user.email || '',
  password: '',
  password_confirmation: '',
});

const handleSubmit = () => {
  if (!editMode) {
    form.post(route('users.store'), {
      onError: (errors) => {
        Object.values(errors).forEach((error) => toast.error(error));
      }
    });
  } else {
    form.put(route('users.update', user.id), {
      onError: (errors) => {
        Object.values(errors).forEach((error) => toast.error(error));
      }
    });
  }
};
</script>

<template>
  <Head title="Dashboard"/>

  <AuthenticatedLayout>
    <template #header>
      <div class="flex justify-between items-center">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
          {{ editMode ? 'Editar Usuário' : 'Cadastrar Usuário' }}
        </h2>
        <button @click="handleSubmit"
                class="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm">
          {{ editMode ? 'Salvar Alterações' : 'Cadastrar Usuário' }}
        </button>
      </div>
    </template>

    <div class="py-12">
      <div class="max-w-5xl mx-auto sm:px-6 lg:px-8 space-y-6">
        <div class="p-6 bg-white shadow sm:rounded-lg">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editMode ? 'Informações do Usuário' : 'Novo Usuário' }}
          </h3>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Nome</label>
              <input v-model="form.name" type="text"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                     placeholder="Nome do usuário"/>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input v-model="form.email" type="email"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                     placeholder="Email do usuário"/>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Senha</label>
              <input v-model="form.password" type="password"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                     :placeholder="editMode ? 'Deixe em branco para manter a senha atual' : 'Informe a senha'"/>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Confirmar Senha</label>
              <input v-model="form.password_confirmation" type="password"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                     :placeholder="editMode ? 'Deixe em branco para manter a senha atual' :  'Confirme a senha'"/>
            </div>

            <div class="flex justify-end">
              <Link :href="route('users.index')"
                    class="text-white bg-gray-500 hover:bg-gray-400 px-4 py-2 rounded-lg text-sm">
                Voltar
              </Link>
              <span class="ml-3"></span>
              <button type="submit"
                      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {{ editMode ? 'Salvar' : 'Cadastrar' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>