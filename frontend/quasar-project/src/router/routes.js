const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () =>
          import('pages/IndexPage.vue') },
      { path: 'pregled_odjece', component: () =>
          import('pages/PregledOdjecePage.vue') },
      { path: 'unos_odjece', component: () =>
          import('pages/UnosOdjecePage.vue') },
      { path: 'rezervacija_odjece', component: () =>
          import('pages/RezervacijaOdjecePage.vue') }
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
