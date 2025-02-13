import { createRouter, createWebHistory } from 'vue-router'

import type { RouteComponent, Router, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    name: 'home',
    path: '/',
    redirect: { name: 'songs' },
  },
  {
    component: async () => import('@/views/SongsView.vue') as RouteComponent,
    name: 'songs',
    path: '/songs',
  },
  {
    component: async () => import('@/views/AlbumsView.vue') as RouteComponent,
    name: 'albums',
    path: '/albums',
  },
  {
    component: async () => import('@/views/artists/ArtistsView.vue') as RouteComponent,
    name: 'artists',
    path: '/artists',
  },
  {
    component: async () => import('@/views/artists/ArtistDetailView.vue') as RouteComponent,
    name: 'artist-detail',
    path: '/artists/:id',
    props: true,
  },
  {
    component: async () => import('@/views/GenresView.vue') as RouteComponent,
    name: 'genres',
    path: '/genres',
  },
]

let instance: Router

export function getRouter() {
  return instance
}

export function createAppRouter() {
  const router = (instance = createRouter({
    history: createWebHistory('/'),
    routes,
  }))

  router.beforeEach((to) => {
    if (!to.name) {
      return { name: 'home' }
    }
  })

  return router
}
