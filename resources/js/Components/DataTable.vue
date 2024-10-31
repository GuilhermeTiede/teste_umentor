<script setup>
import {ref, watch, onMounted, toRefs, computed} from 'vue';
import http from '@/Libs/Http';
import DefaultErrorAlert from '@/Components/DefaultErrorAlert.vue';
import qs from 'qs';

const props = defineProps({
  url: String,
  columns: Array,
  data: Array,
  pageSize: Number,
  rowsPerPageOptions: Array,
  checkboxSelection: Boolean,
  filters: Object,
});
const columns = props.columns;

const searchTerm = ref('');
const error = ref(null);
const loading = ref(false);
const currentRows = ref(props.data || []);
const currentRowCount = ref(0);
const tableOptions = ref({
  page: 1,
  itemsPerPage: props.pageSize || 25,
  sortBy: [],
  sortDesc: [],
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
},{ deep: true });

watch(searchTerm, () => {
  if (serverSide.value) {
    loadDataTable();
  }
});
watch(
    () => props.columns,
    () => {
      if (serverSide.value) {
        loadDataTable();
      }
    },
    { deep: true }
);
// Function to load data from server-side
const loadDataTable = () => {
  loading.value = true;
  const { page, itemsPerPage, sortBy, sortDesc } = tableOptions.value;

  const selectColumns = props.columns.map((col, index) => {
    let search = col.search || {
      value: null,
      regex: false,
      operator: 'contains',
    };

    if (props.filters && props.filters[col.field]) {
      search.value = props.filters[col.field];
    }

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
      value: searchTerm.value || null,
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

// Handler for when table options change (pagination, sorting, etc.)
const onOptionsUpdate = (options) => {
  tableOptions.value = {
    ...tableOptions.value,
    page: options.page,
    itemsPerPage: options.itemsPerPage,
    sortBy: options.sortBy,
    sortDesc: options.sortDesc,
  };
};

// Initial data load if serverSide is true
onMounted(() => {
  if (serverSide.value) {
    loadDataTable();
  }
});

const config = computed(() => ({
  columns: columns.map(column => {
    if (!column.renderCell) return column;
    return {
      ...column,
      renderCell: (defaultParams) => {
        const customParams = {
          ...defaultParams,
          reloadDataTable: serverSide ? loadDataTable : () => defaultParams.api.forceUpdate(),
        };
        return column.renderCell(customParams);
      },
    };
  }),
  rows: [],
  rowCount: serverSide ? 0 : [],
  page: 0,
  pageSize: 25,
  rowsPerPageOptions: [25, 50, 75, 100],
  autoHeight: true,
  sortingMode: serverSide ? 'server' : 'client',
  filterModel: {
    linkOperator: 'and',
    items: columns.filter(col => col.filterable),
  },
  filterMode: serverSide ? 'server' : 'client',
  pagination: true,
  paginationMode: serverSide ? 'server' : 'client',
  loading: false,
}));

</script>

<template>
  <div>
    <!-- Error Alert -->
    <DefaultErrorAlert v-if="error" :error="error" @close="error = null"/>

    <v-card>
      <!-- Data Table -->
      <v-data-table-server
          :v-bind="{...config}"
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
            <component :is="props.columns.find(col => col.field === column.key).renderCell" :row="item" @reload="loadDataTable"/>
          </span>
          <span v-else>{{ item[column.key] }}</span>
        </template>
      </v-data-table-server>
    </v-card>
  </div>
</template>