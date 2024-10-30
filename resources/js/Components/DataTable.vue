<script setup>
import { ref, watch, onMounted, toRefs } from 'vue';
import http from '@/Libs/Http';
import DefaultErrorAlert from '@/Components/DefaultErrorAlert.vue';
import qs from 'qs';

// Uso de defineProps sem necessidade de atribuição
const props = defineProps({
  url: String,
  columns: Array,
  data: Array,
  pageSize: Number,
  rowsPerPageOptions: Array,
  checkboxSelection: Boolean,
});

// Reactive state management
const error = ref(null);
const loading = ref(false);
const currentRows = ref(props.data || []);
const currentRowCount = ref(0);
const tableOptions = ref({
  page: 1,
  itemsPerPage: props.pageSize || 25,
  sortBy: [],
  filters: [],
  showSelect: props.checkboxSelection || false,
});
const serverSide = ref(!!props.url);

const headers = ref([]);

watch(
    () => props.checkboxSelection,
    (newValue) => {
      tableOptions.value.showSelect = newValue;
    },
    { immediate: true }
);

// Set up headers for Vuetify data table
watch(
    () => props.columns,
    (newColumns) => {
      headers.value = newColumns.map((col) => ({
        title: col.headerName,
        key: col.field,
        sortable: col.sortable ?? true,
      }));
    },
    { immediate: true }
);

// Watchers for table options changes (pagination, sorting, filtering)
watch(tableOptions, () => {
  if (serverSide.value) {
    loadDataTable();
  }
});

// Function to load data from server-side
const loadDataTable = () => {
  loading.value = true;
  const { page, itemsPerPage, sortBy, sortDesc } = tableOptions.value;

  const selectColumns = props.columns.map((col, index) => {
    let search = {
      value: null,
      regex: false,
      operator: 'contains',
    };

    return {
      data: index,
      name: col.field,
      searchable: col.filterable ?? true,
      orderable: col.sortable ?? true,
      search,
    };
  });

  const queryString = qs.stringify({
    draw: 1,
    columns: selectColumns,
    order: sortBy.map((item, index) => ({
      dir: sortDesc[index] ? 'desc' : 'asc',
      column: selectColumns.findIndex((col) => col.name === item),
    })),
    start: (page - 1) * itemsPerPage,
    length: itemsPerPage,
    search: {
      value: null,
      regex: false,
    },
  });

  const route = props.url.includes('?') ? `${props.url}&${queryString}` : `${props.url}?${queryString}`;

  http.get(route)
      .then((response) => {
        const newRows = response.data.data.map((row) => {
          return selectColumns.reduce((obj, col) => {
            return {
              ...obj,
              [col.name]: row[col.data],
            };
          }, {});
        });

        currentRows.value = newRows;
        currentRowCount.value = response.data.recordsTotal;
      })
      .catch((err) => {
        error.value = err;
      })
      .finally(() => {
        loading.value = false;
      });
};

// Function to reload the data table
const reloadDataTable = () => {
  loadDataTable();
};

// Handler for when table options change (pagination, sorting, etc.)
const onOptionsUpdate = (options) => {
  tableOptions.value = {
    ...tableOptions.value,
    page: options.page,
    itemsPerPage: options.itemsPerPage,
    sortBy: options.sortBy,
  };
};

// Initial data load if serverSide is true
onMounted(() => {
  if (serverSide.value) {
    loadDataTable();
  }
});
</script>

<template>
  <div>
    <!-- Error Alert -->
    <DefaultErrorAlert v-if="error" :error="error" @close="error = null"/>

    <v-card>
      <!-- Data Table -->
      <v-data-table-server
          :headers="headers"
          :items="currentRows"
          :items-per-page="tableOptions.itemsPerPage"
          :items-length="currentRowCount"
          :loading="loading"
          :options.sync="tableOptions"
          :show-select="tableOptions.showSelect"
          :footer-props="{
          itemsPerPageOptions: rowsPerPageOptions,
        }"
          @update:options="onOptionsUpdate"
      >
        <!-- Custom cell rendering using the slot item.<key> -->
        <template v-for="column in headers" #[`item.${column.key}`]="{ item }">
          <span v-if="props.columns.find(col => col.field === column.key)?.renderCell">
            <!-- Call renderCell function and pass the row as a parameter -->
            <component :is="props.columns.find(col => col.field === column.key).renderCell" :row="item"/>
          </span>
          <span v-else>{{ item[column.key] }}</span>
        </template>
      </v-data-table-server>
    </v-card>
  </div>
</template>