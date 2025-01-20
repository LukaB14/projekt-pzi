<template>
  <div class="q-pa-md">
    <q-table
      title="Rezervacije"
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
  { name: 'DatumRezervacije', required: true, align: 'left', label: 'Datum rezervacije', field: 'DatumRezervacije', sortable: true, format: val => formatDate(val) },
  { name: 'Korisnik', required: true, align: 'left', label: 'Ime i prezime korisnika', field: 'Korisnik', sortable: true },
  { name: 'IdOdjece', align: 'left', label: 'ID odjeće', field: 'IdOdjece', sortable: true },
  { name: 'IdObuce', align: 'left', label: 'ID obuće', field: 'IdObuce', sortable: true },
]
const rows = ref([])

function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  const date = new Date(dateString)
  return date.toLocaleDateString('hr-HR', options) 
}

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
      await axios.get('http://localhost:3000/api/rezervacija/')
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

