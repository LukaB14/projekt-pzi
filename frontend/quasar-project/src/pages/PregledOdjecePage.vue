<template>
  <div class="q-pa-md">
    <q-table
      title="Odjeća"
      :rows="rows"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios';

const columns = [
  { name: 'VelicinaOdjece', required: true, align: 'left', label: 'Veličina odjeće', field: 'VelicinaOdjece', sortable: true },
  { name: 'Cijena', align: 'left', label: 'Cijena', field: 'Cijena', sortable: true },
  { name: 'MarkaOdjece', align: 'left', label: 'Marka Odjeće', field: 'MarkaOdjece', sortable: true },
  { name: 'VrstaOdjece', align: 'left', label: 'Vrsta Odjeće', field: 'VrstaOdjece' },
]
const rows = ref([])

export default {
  setup () {
    return {
      columns,
      rows
    }
  },
  mounted() {
    this.loadBooks()
  },
  methods: {
    async loadBooks() {
      await axios.get('http://localhost:3000/api/odjeca/')
        .then(result => {
          console.log(result.data)
          this.rows = result.data
          console.log(this.books[0].id)
        })
        .catch(error => {
          console.error(error)
        })
    },
  }
}
</script>

