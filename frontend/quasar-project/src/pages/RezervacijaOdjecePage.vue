<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form class="q-gutter-md">
      <q-input filled v-model="DatumRezervacije" label="Datum rezervacije" />
      <q-input filled v-model="Korisnik" label="Ime i prezime" />
      <q-input filled v-model="IdOdjece" label="ID odjeće" />
      <q-input filled v-model="IdObuce" label="ID obuće" />
      <div>
        <q-btn
          label="Submit"
          type="submit"
          color="primary"
          @click="onSubmit"
        />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
          @click="onReset"
        />
      </div>
      <q-banner v-if="errorMessage" class="q-mt-md" dense inline-actions color="negative">
        {{ errorMessage }}
      </q-banner>
    </q-form>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const DatumRezervacije = ref(null);
    const Korisnik = ref(null);
    const IdOdjece = ref(null);
    const IdObuce = ref(null);
    const errorMessage = ref("");

    return {
      DatumRezervacije,
      Korisnik,
      IdOdjece,
      IdObuce,
      errorMessage,
    };
  },
  methods: {
    async onSubmit() {
      // Reset error poruku
      this.errorMessage = "";

      // Provjera da li su svi potrebni podaci uneseni
      if (!this.DatumRezervacije || !this.Korisnik || !this.IdOdjece || !this.IdObuce) {
        this.errorMessage = "Sva polja moraju biti popunjena.";
        return;
      }

      try {
        // Provjeri da li su `IdOdjece` i `IdObuce` već rezervirani
        const rezervacije = await axios.get("http://localhost:3000/api/rezervacija");
        const postojiOdjeca = rezervacije.data.some((rez) => rez.IdOdjece == this.IdOdjece);
        const postojiObuca = rezervacije.data.some((rez) => rez.IdObuce == this.IdObuce);

        if (postojiOdjeca || postojiObuca) {
          this.errorMessage = "Odjeća ili obuća s tim ID-om je već rezervirana.";
          return;
        }

        // Podaci za slanje
        const formData = {
          DatumRezervacije: this.DatumRezervacije,
          Korisnik: this.Korisnik,
          IdOdjece: this.IdOdjece,
          IdObuce: this.IdObuce,
        };

        // Slanje rezervacije
        const result = await axios.post("http://localhost:3000/api/rezerv_odjece/", formData);
        console.log(result);
        alert("Rezervacija uspješno dodana!");

        // Reset polja
        this.onReset();
      } catch (error) {
        console.error(error);
        this.errorMessage = "Došlo je do greške prilikom slanja rezervacije.";
      }
    },
    onReset() {
      this.DatumRezervacije = null;
      this.Korisnik = null;
      this.IdOdjece = null;
      this.IdObuce = null;
      this.errorMessage = "";
    },
  },
};
</script>