<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      class="q-gutter-md"
    >
      <q-input filled v-model="VelicinaOdjece" label="Veličina odjeće" />
      <q-input filled v-model="Cijena" label="Cijena" />
      <q-input filled v-model="MarkaOdjece" label="Marka odjeće" />
      <q-input filled v-model="VrstaOdjece" label="Vrsta odjeće" />
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
    const VelicinaOdjece = ref(null)
    const Cijena = ref(null)
    const MarkaOdjece = ref(null)
    const VrstaOdjece = ref(null)
    return {
      VelicinaOdjece,
      Cijena,
      MarkaOdjece,
      VrstaOdjece
    }
  },
  methods: {
    async onSubmit () {
      const formData = {
        VelicinaOdjece: this.VelicinaOdjece,
        Cijena: this.Cijena,
        MarkaOdjece: this.MarkaOdjece,
        VrstaOdjece: this.VrstaOdjece,
      }
      await axios.post('http://localhost:3000/api/unos_odjece/', formData)
        .then(result => {
          console.log(result)
        })
        .catch(error => {
          console.error(error)
        })
    },
    onReset () {
      this.VelicinaOdjece.value = null
      this.Cijena.value = null
      this.MarkaOdjece.value = null
      this.VrstaOdjece.value = null
    }
  }
}
</script>