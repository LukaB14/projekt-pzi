<template>
  <div class="q-pa-md">
    <!-- Polje za unos filtera -->
    <q-input 
      outlined 
      debounce="300" 
      v-model="filterText" 
      placeholder="Pretraži obuću..." 
      class="q-mb-md"
    />

    <!-- Tabela za prikaz obuće -->
    <q-table
      title="Obuća"
      :rows="filteredRows"
      :columns="columns"
      row-key="Id"
    >
      <template v-slot:body-cell-actions="props">
        <q-btn
          color="red"
          icon="delete"
          @click="deleteObuca(props.row.Id)"
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
  { name: 'Id', required: true, align: 'left', label: 'ID obuće', field: 'Id', sortable: true },
  { name: 'VelicinaObuce', required: true, align: 'left', label: 'Veličina obuće', field: 'VelicinaObuce', sortable: true },
  { name: 'Cijena', align: 'left', label: 'Cijena', field: 'Cijena', sortable: true },
  { name: 'MarkaObuce', align: 'left', label: 'Marka obuće', field: 'MarkaObuce', sortable: true },
  { name: 'VrstaObuce', align: 'left', label: 'Vrsta obuće', field: 'VrstaObuce' },
  { name: 'Boja', align: 'left', label: 'Boja', field: 'Boja' },
  { name: 'actions', align: 'center', label: 'Brisanje', field: 'actions' },
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
        const result = await axios.get('http://localhost:3000/api/obuca/');
        this.rows = result.data;
      } catch (error) {
        console.error(error);
      }
    },
    // Brisanje obuće prema ID-u
    async deleteObuca(id) {
      if (confirm('Jeste li sigurni da želite obrisati ovu obuću?')) {
        try {
          await axios.delete(`http://localhost:3000/api/obuca/${id}`);
          this.rows = this.rows.filter(row => row.Id !== id);
          alert('Obuća uspješno obrisana.');
        } catch (error) {
          console.error(error);
          alert('Došlo je do greške prilikom brisanja.');
        }
      }
    },
  },
};
</script>