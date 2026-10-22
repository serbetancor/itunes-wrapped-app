<template>
  <div class="relative flex h-240 w-135 flex-col overflow-hidden bg-[#071426] text-[#FFF7E6]">
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_15%,rgba(20,87,197,0.20),transparent_40%),radial-gradient(ellipse_at_85%_75%,rgba(20,87,197,0.14),transparent_45%)]"
    />
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_28%,rgba(20,87,197,0.30),transparent_43%),radial-gradient(ellipse_at_83%_68%,rgba(35,105,220,0.23),transparent_44%),radial-gradient(ellipse_at_50%_50%,rgba(217,172,83,0.10),transparent_55%)]"
    />
    <div class="absolute top-[15%] left-[8%] size-40 rounded-full bg-blue-600/10 blur-3xl" />
    <div class="absolute right-[5%] bottom-[12%] size-44 rounded-full bg-sky-400/10 blur-3xl" />

    <section class="relative isolate flex h-1/3 items-center justify-center px-10">
      <div v-if="tracks[0]" class="flex items-center justify-center gap-5">
        <div class="relative flex max-w-50 flex-col items-center justify-center gap-4">
          <div class="absolute -inset-8 rounded-4xl bg-[#1457C5]/25 blur-2xl" />
          <div
            class="absolute -inset-5 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(255,205,100,0.28)_0%,rgba(217,172,83,0.12)_38%,transparent_72%)] blur-xl"
          />

          <div
            class="relative aspect-square size-35 -rotate-2 rounded-xl bg-cover bg-center shadow-[0_0_24px_-12px_rgba(255,220,150,0.75)] ring-1 ring-[#FFF1C9]/60"
            :style="{ backgroundImage: `url(${tracks[0].image})` }"
          >
            <div
              class="absolute inset-0 rounded-xl bg-linear-to-br from-[#FFF7E6]/30 via-transparent to-[#071426]/50"
            />
            <div
              class="absolute inset-x-0 top-0 h-1/3 rounded-t-xl bg-linear-to-b from-[#FFF7E6]/15 to-transparent"
            />
          </div>

          <div class="relative flex flex-col items-center gap-1">
            <h2
              class="line-clamp-2 text-center text-lg leading-tight font-extrabold tracking-tight text-[#FFF7E6]"
            >
              {{ tracks[0].name }}
            </h2>
            <h3 class="-mt-1 text-sm font-semibold text-[#E8C878]">
              {{ tracks[0].artist }}
            </h3>
            <p class="text-sm font-medium text-[#E5D9C0]/90">
              {{ formatMilliseconds(tracks[0].timePlayed) }}
            </p>
          </div>
        </div>

        <div class="flex flex-col gap-5">
          <div v-for="track in tracks.slice(1, 4)" :key="track.id" class="flex flex-col gap-2">
            <div class="flex items-center gap-2.5">
              <div
                class="relative size-8 shrink-0 rounded-md bg-cover bg-center shadow-[0_0_12px_-5px_rgba(217,172,83,0.5)] ring-1 ring-[#E8C878]/45"
                :style="{ backgroundImage: `url(${track.image})` }"
              />

              <div class="flex flex-col gap-1">
                <p class="line-clamp-2 text-xs font-semibold text-[#FFF7E6]">
                  {{ track.name }}
                </p>
                <p class="text-xs text-[#E5D9C0]/70">
                  {{ formatMilliseconds(track.timePlayed) }}
                </p>
              </div>
            </div>

            <div class="h-0.5 rounded-full bg-white/10">
              <div
                class="h-full rounded-full bg-linear-to-r from-[#8B641E] via-[#D9AC53] to-[#FFF1C9] shadow-[0_0_8px_rgba(217,172,83,0.35)]"
                :style="{
                  width: `${Math.min(100, Math.max(0, (track.timePlayed / tracks[0].timePlayed) * 100))}%`,
                }"
              />
            </div>
          </div>
        </div>
      </div>

      <ImperialTopFrame class="absolute inset-0 -z-10 size-full p-6" />
    </section>

    <section class="relative isolate h-1/3 flex-1">
      <GalaxyBackground class="overflow-hidden" />
      <div
        class="absolute top-1/2 left-1/2 size-92.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D9AC53]/10 shadow-[0_0_50px_-30px_rgba(217,172,83,0.25)]"
      />
      <div
        class="absolute top-1/2 left-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D9AC53]/20 shadow-[0_0_50px_-30px_rgba(217,172,83,0.45)]"
      />

      <div
        v-for="(artist, index) in artists.slice(1, 25)"
        :key="artist.id"
        class="absolute top-1/2 left-1/2"
        :style="getOrbitStyle(index, artists.slice(1, 25).length)"
      >
        <div
          class="rounded-full bg-cover bg-center shadow-[0_0_12px_-5px_rgba(217,172,83,0.45)] ring-1 ring-[#D9AC53]/35"
          :class="getOrbitClass(index)"
          :style="{ backgroundImage: `url(${artist.image})` }"
        />
      </div>

      <div v-if="artists[0]">
        <div class="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <div
            class="absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(255,226,155,0.32),rgba(217,172,83,0.16)_40%,transparent_72%)] blur-lg"
          />
          <div
            class="absolute -inset-2 rounded-full bg-linear-to-tr from-[#8B641E] via-[#FFF1C9] to-[#D9AC53] opacity-90 blur-[2px]"
          />
          <div
            class="absolute -inset-1.5 rounded-full bg-linear-to-tr from-[#FFF1C9]/90 via-[#D9AC53]/55 to-[#174EA6]/50 blur-xs"
          />

          <div
            class="relative size-28 overflow-hidden rounded-full bg-cover bg-center shadow-[0_0_35px_-8px_rgba(217,172,83,0.65)] ring-2 ring-[#FFF1C9]/80"
            :style="{ backgroundImage: `url(${artists[0].image})` }"
          >
            <div
              class="absolute inset-0 rounded-full bg-linear-to-br from-[#FFF7E6]/25 via-transparent to-[#071426]/45"
            />
            <div
              class="absolute inset-x-0 top-0 h-1/3 rounded-t-full bg-linear-to-b from-white/15 to-transparent"
            />
          </div>
        </div>

        <div class="absolute top-1/2 left-1/2 z-10 mt-18 -translate-x-1/2 text-center">
          <h2 class="text-sm font-extrabold whitespace-nowrap text-[#FFF7E6]">
            {{ artists[0].name }}
          </h2>
          <p class="text-xs font-medium whitespace-nowrap text-[#E8C878]">
            {{ formatMilliseconds(artists[0].timePlayed) }}
          </p>
        </div>
      </div>
    </section>

    <section class="relative isolate flex h-1/3 gap-5 px-10">
      <div class="size-full place-content-center place-items-center">
        <div class="grid grid-cols-3 grid-rows-5 flex-col place-items-center gap-2">
          <div
            v-for="album in albums.slice(1, 16)"
            :key="album.id"
            class="relative flex aspect-square size-8 rounded-lg bg-[#101F35] p-2 shadow-[0_4px_12px_rgba(0,0,0,0.5)] ring-1 ring-[#D9AC53]/30"
          >
            <div
              class="absolute inset-0 rounded-lg bg-cover opacity-85"
              :style="{ backgroundImage: `url(${album.image})` }"
            />
            <div
              class="absolute inset-0 rounded-lg bg-linear-to-br from-[#FFF7E6]/10 via-transparent to-[#071426]/20"
            />
          </div>
        </div>
      </div>

      <div class="col-span-1 size-full place-content-center place-items-center">
        <div v-if="albums[0]" class="flex flex-col items-center justify-center">
          <div class="relative flex aspect-square w-38 rounded-lg p-2">
            <div class="absolute -inset-5 rounded-2xl bg-[#1457C5]/20 blur-2xl" />
            <div
              class="absolute inset-0 rounded-xl bg-linear-to-br from-[#FFF1C9]/80 via-[#D9AC53]/60 to-[#8B641E]/80 blur-[1px]"
            />

            <div
              class="relative size-full rounded-lg mask-radial-farthest-side bg-cover bg-center shadow-[0_0_35px_-12px_rgba(217,172,83,0.55)]"
              :style="{ backgroundImage: `url(${albums[0].image})` }"
            >
              <div
                class="absolute inset-0 rounded-lg bg-linear-to-br from-[#FFF7E6]/15 via-transparent to-[#071426]/30"
              />
            </div>
          </div>

          <div class="relative flex w-full flex-col justify-center text-center">
            <h2 class="text-lg leading-tight font-semibold text-[#FFF7E6]">
              {{ albums[0].name }}
            </h2>
            <h3 class="mt-0.5 text-sm text-[#E8C878]">
              {{ albums[0].artist }}
            </h3>
            <span class="text-sm text-[#E5D9C0]/80">
              {{ formatMilliseconds(albums[0].timePlayed) }}
            </span>
          </div>
        </div>
      </div>

      <div class="col-span-2 size-full place-content-center place-items-center">
        <div class="grid grid-cols-3 grid-rows-5 flex-col place-items-center gap-2">
          <div
            v-for="album in albums.slice(16, 31)"
            :key="album.id"
            class="relative flex aspect-square size-8 rounded-lg bg-[#101F35] p-2 shadow-[0_4px_12px_rgba(0,0,0,0.5)] ring-1 ring-[#D9AC53]/30"
          >
            <div
              class="absolute inset-0 rounded-lg bg-cover opacity-85"
              :style="{ backgroundImage: `url(${album.image})` }"
            />

            <div
              class="absolute inset-0 rounded-lg bg-linear-to-br from-[#FFF7E6]/10 via-transparent to-[#071426]/20"
            />
          </div>
        </div>
      </div>

      <ImperialBottomFrame class="absolute inset-0 -z-10 size-full p-6" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'

import GalaxyBackground from '@/components/wrapped/GalaxyBackground.vue'
import ImperialBottomFrame from '@/components/wrapped/ImperialBottomFrame.vue'
import ImperialTopFrame from '@/components/wrapped/ImperialTopFrame.vue'
import { useiTunesStore } from '@/stores/useiTunesStore'
import { formatMilliseconds } from '@/utils/itunes'

const store = useiTunesStore()

const { albumsLibrary, artistsLibrary, tracksLibrary } = storeToRefs(store)

const albums = computed(() => albumsLibrary.value.data)
const artists = computed(() => artistsLibrary.value.data)
const tracks = computed(() => tracksLibrary.value.data)

const getOrbitStyle = (index: number, total: number) => {
  const innerRadius = 110
  const outerRadius = 170
  const innerGap = Math.PI / 2

  const innerLength = innerRadius * (2 * Math.PI - innerGap)
  const outerLength = outerRadius * 2 * Math.PI

  const innerCount = Math.round(total * (innerLength / (innerLength + outerLength)))
  const outerCount = total - innerCount

  const orbit = index < innerCount ? 0 : 1
  const positionInOrbit = orbit === 0 ? index : index - innerCount
  const countInOrbit = orbit === 0 ? innerCount : outerCount
  const radius = orbit === 0 ? innerRadius : outerRadius

  let angle: number

  if (orbit === 0) {
    const availableAngle = 2 * Math.PI - innerGap
    const startAngle = Math.PI / 2 + innerGap / 2

    angle =
      startAngle + (countInOrbit > 1 ? positionInOrbit / (countInOrbit - 1) : 0.5) * availableAngle
  } else {
    angle = (positionInOrbit / countInOrbit) * 2 * Math.PI - Math.PI / 2
  }

  const x = Math.cos(angle) * radius * 1.2
  const y = Math.sin(angle) * radius

  return {
    opacity: orbit === 0 ? 0.8 : 0.55,
    transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
    zIndex: 5 - orbit,
  }
}

const getOrbitClass = (index: number) => {
  const orbit = index % 2

  return ['size-10 opacity-80 blur-none', 'size-8 opacity-50 blur-[1px]'][orbit]
}

onMounted(async () => {
  await Promise.all([
    store.toggleYearlyMode(),
    store.fetchArtists(),
    store.fetchAlbums(),
    store.fetchTracks(),
  ])
})
</script>
