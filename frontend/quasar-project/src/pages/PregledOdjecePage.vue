<template>
  <div class="q-pa-md">
    <!-- Polje za unos filtera -->
    <q-input 
      outlined 
      debounce="300" 
      v-model="filterText" 
      placeholder="Pretraži odjeću..." 
      class="q-mb-md"
    />

    <!-- Tabela za prikaz odjeće -->
    <q-table
      title="Odjeća"
      :rows="filteredRows"
      :columns="columns"
      row-key="Id"
    >
      <template v-slot:body-cell-actions="props">
        <q-btn
          color="red"
          icon="delete"
          @click="deleteOdjeca(props.row.Id)"
          label="Obriši"
          flat
        />
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import axios from 'axios';

const columns = [
  { name: 'Id', required: true, align: 'left', label: 'ID odjeće', field: 'Id', sortable: true },
  { name: 'VelicinaOdjece', required: true, align: 'left', label: 'Veličina odjeće', field: 'VelicinaOdjece', sortable: true },
  { name: 'Cijena', align: 'left', label: 'Cijena', field: 'Cijena', sortable: true },
  { name: 'MarkaOdjece', align: 'left', label: 'Marka Odjeće', field: 'MarkaOdjece', sortable: true },
  { name: 'VrstaOdjece', align: 'left', label: 'Vrsta Odjeće', field: 'VrstaOdjece' },
  { name: 'actions', align: 'center', label: 'Akcije', field: 'actions' },
];

const rows = ref([]);
const filterText = ref('');

export default {
  setup() {
    // Filtriranje podataka prema unosu
    const filteredRows = computed(() => {
      if (!filterText.value) {
        return rows.value;
      }
      return rows.value.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(filterText.value.toLowerCase())
        )
      );
    });

    return {
      columns,
      rows,
      filterText,
      filteredRows,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    // Učitavanje podataka iz API-ja
    async loadData() {
      try {
        const result = await axios.get('http://localhost:3000/api/odjeca/');
        this.rows = result.data;
      } catch (error) {
        console.error(error);
      }
    },
    // Brisanje odjeće prema ID-u
    async deleteOdjeca(id) {
      if (confirm('Jeste li sigurni da želite obrisati ovu odjeću?')) {
        try {
          await axios.delete(`http://localhost:3000/api/odjeca/${id}`);
          this.rows = this.rows.filter(row => row.Id !== id);
          alert('Odjeća uspješno obrisana.');
        } catch (error) {
          console.error(error);
          alert('Došlo je do greške prilikom brisanja.');
        }
      }
    },
  },
};
</script>