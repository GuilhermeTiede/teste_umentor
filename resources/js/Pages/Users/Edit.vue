<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm, usePage } from '@inertiajs/vue3';
import { VBtn, VCard, VCardText, VCardTitle, VContainer, VRow, VCol, VTextField } from 'vuetify/components';
import {toast} from "vue3-toastify";

const { props } = usePage();
const users = props.users || [];

const form = useForm({
  name: '',
  email: '',
  password: '',
});

const handleSubmit = () => {
  form.post(route('users.store'), {
    onSuccess: () => {
      toast.success('success');
      form.reset();
    },
    onError: () => {
      toast.error('error');
    }
  });
};
</script>

<template>
  <Head title="Dashboard" />

  <AuthenticatedLayout>
    <template #header>
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-semibold leading-tight text-gray-800">
          Cadastrar Usuários
        </h2>
        <VBtn color="primary" @click="handleSubmit">Cadastrar Usuário</VBtn>
      </div>
    </template>

    <VContainer class="py-12">
      <VRow>
        <VCol cols="12" md="6" offset-md="3">
          <VCard class="mb-4">
            <VCardTitle>Formulário de Cadastro</VCardTitle>
            <VCardText>
              <form @submit.prevent="handleSubmit">
                <VRow>
                  <VCol cols="12" md="12">
                    <VTextField v-model="form.name" label="Nome" variant="outlined" dense />
                  </VCol>
                  <VCol cols="12" md="12">
                    <VTextField v-model="form.email" label="Email" variant="outlined" dense />
                  </VCol>
                  <VCol cols="12" md="12">
                    <VTextField v-model="form.password" label="Senha" type="password" variant="outlined" dense />
                  </VCol>
                  <VCol cols="12" class="text-right">
                    <VBtn type="submit" color="primary">Cadastrar</VBtn>
                  </VCol>
                </VRow>
              </form>
            </VCardText>
          </VCard>

          <VCard>
            <VCardTitle>Lista de Usuários</VCardTitle>
            <VCardText>
              <VRow v-if="users.length > 0">
                <VCol v-for="user in users" :key="user.id" cols="12" md="6">
                  <VCard>
                    <VCardTitle>{{ user.name }}</VCardTitle>
                    <VCardText>{{ user.email }}</VCardText>
                  </VCard>
                </VCol>
              </VRow>
              <div v-else>Nenhum usuário cadastrado.</div>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VContainer>
  </AuthenticatedLayout>
</template>
