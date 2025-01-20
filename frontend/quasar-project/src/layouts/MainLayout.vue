<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Izbornik
        </q-toolbar-title>

        
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
   {
    title: 'Početna',
    caption: 'Početna stranica',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Pregled odjeće',
    caption: 'Pregled sve odjeće',
    icon: 'inventory',
    link: '#/pregled_odjece/'
  },
  {
    title: 'Pregled obuće',
    caption: 'Pregled sve obuće',
    icon: 'directions_walk',
    link: '#/pregled_obuce/'
  },
   {
    title: 'Pregled rezervacija',
    caption: 'Pregled svih rezervacija',
    icon: 'event',
    link: '#/pregled_rezervacija/'
  },
  {
    title: 'Unos odjeće',
    caption: 'Unos nove odjeće',
    icon: 'add_circle',
    link: '#/unos_odjece/'
  },
  {
    title: 'Unos obuće',
    caption: 'Unos nove obuće',
    icon: 'add_circle',
    link: '#/unos_obuce/'
  },
  {
    title: 'Unos rezervacije',
    caption: 'Unos rezervacije',
    icon: 'add_circle_outline',
    link: '#/rezerv_odjece'
  },
]


const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
