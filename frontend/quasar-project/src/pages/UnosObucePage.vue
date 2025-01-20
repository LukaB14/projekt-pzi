<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      class="q-gutter-md"
    >
      <q-input filled v-model="VelicinaObuce" label="Veličina obuće" />
      <q-input filled v-model="Cijena" label="Cijena" />
      <q-input filled v-model="MarkaObuce" label="Marka obuće" />
      <q-input filled v-model="VrstaObuce" label="Vrsta obuće" />
      <q-input filled v-model="Boja" label="Boja" />
      <div>
        <q-btn label="Submit" type="submit" color="primary"
            @click="onSubmit()" />
        <q-btn label="Reset" type="reset" color="primary"
            flat class="q-ml-sm" @click="onReset()"/>
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios';

export default {
  setup () {
    const VelicinaObuce = ref(null)
    const Cijena = ref(null)
    const MarkaObuce = ref(null)
    const VrstaObuce = ref(null)
    const Boja = ref(null)
    return {
      VelicinaObuce,
      Cijena,
      MarkaObuce,
      VrstaObuce,
      Boja
    }
  },
  methods: {
    async onSubmit () {
      const formData = {
        VelicinaObuce: this.VelicinaObuce,
        Cijena: this.Cijena,
        MarkaObuce: this.MarkaObuce,
        VrstaObuce: this.VrstaObuce,
        Boja: this.Boja,
      }
      await axios.post('http://localhost:3000/api/unos_obuce/', formData)
        .then(result => {
          console.log(result)
        })
        .catch(error => {
          console.error(error)
        })
    },
    onReset () {
      this.VelicinaObuce.value = null
      this.Cijena.value = null
      this.MarkaObuce.value = null
      this.VrstaObuce.value = null
      this.Boja.value = null
    }
  }
}
</script>