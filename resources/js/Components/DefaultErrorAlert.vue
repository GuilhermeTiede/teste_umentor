<template>
  <v-dialog v-model="isOpen" max-width="500">
    <v-card>
      <v-card-title class="headline">
        <v-icon left color="error">mdi-alert</v-icon>
        Ooops! Ocorreu um problema!
      </v-card-title>

      <v-card-text>
        <strong>{{ getErrorMessage() }}</strong>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click="handleClose">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
  onClose: {
    type: Function,
    default: null,
  },
});

const isOpen = ref(true);

// Watch for changes in the `error` prop to re-open the dialog if needed
watch(() => props.error, () => {
  if (props.error) {
    isOpen.value = true;
  }
});

const handleClose = () => {
  isOpen.value = false;
  if (props.onClose) {
    props.onClose();
  }
  console.error(props.error); // Log the error
};

const getErrorMessage = () => {
  return (
      props.error?.response?.data?.message ||
      props.error?.response?.data?.error ||
      props.error?.message ||
      "Erro desconhecido"
  );
};
</script>
