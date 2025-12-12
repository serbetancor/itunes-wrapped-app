import { createRouter, createWebHistory } from 'vue-router'

import type { RouteComponent, Router, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    name: 'home',
    path: '/',
    redirect: { name: 'tracks' },
  },
  {
    component: async () => import('@/views/tracks/TracksView.vue') as RouteComponent,
    name: 'tracks',
    path: '/tracks',
  },
  {
    component: async () => import('@/views/albums/AlbumsView.vue') as RouteComponent,
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
    component: async () => import('@/views/genres/GenresView.vue') as RouteComponent,
    name: 'genres',
    path: '/genres',
  },
  {
    component: async () => import('@/views/WrappedView.vue') as RouteComponent,
    name: 'wrapped',
    path: '/wrapped',
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
