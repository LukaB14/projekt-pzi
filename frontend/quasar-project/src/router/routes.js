const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () =>
          import('pages/IndexPage.vue') },
      { path: 'pregled_odjece', component: () =>
          import('pages/PregledOdjecePage.vue') },
      { path: 'pregled_obuce', component: () =>
        import('pages/PregledObucePage.vue') },
      { path: 'pregled_rezervacija', component: () =>
        import('pages/PregledRezervacijaPage.vue') },
      { path: 'unos_odjece', component: () =>
          import('pages/UnosOdjecePage.vue') },
      { path: 'rezerv_odjece', component: () =>
          import('pages/RezervacijaOdjecePage.vue') },
       { path: 'unos_obuce', component: () =>
          import('pages/UnosObucePage.vue') }
    ]
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
