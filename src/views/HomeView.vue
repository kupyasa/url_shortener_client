<script setup>
import { ref } from "vue";
import axios from "axios";
const errorAlert = ref(null);
const createdShortLink = ref(null);
const searchedLinks = ref(null);
const originalUrl = ref(null);
const createdBy = ref(null);
const specialName = ref(null);
const expiresAt = ref(null);
const searchQuery = ref(null);

function hello() {
  console.log(originalUrl.value);
}

async function shortenURL() {
  try {
    if (originalUrl != null && createdBy != null) {
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/shortlinks`,
        {
          originalUrl: originalUrl.value,
          createdBy: createdBy.value,
          specialName: specialName.value,
          expiresAt: expiresAt.value,
        }
      );

      console.log(result);

      createdShortLink.value = result.data;
      if (createdShortLink.value != null) {
        originalUrl.value = null;
        createdBy.value = null;
        specialName.value = null;
        expiresAt.value = null;
      }

      console.log(createdShortLink.value);
    }
  } catch (error) {
    errorAlert.value = "URL kısaltılamadı.";
  }
}

async function getURLs() {
  try {
    if (searchQuery.value !== "") {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/shortlinks/search?searchQuery=${
          searchQuery.value
        }`
      );

      console.log(result);

      searchedLinks.value = result.data.shortLinks;

      console.log(searchedLinks.value);
    }
  } catch (error) {
    errorAlert.value = "URL bulunamadı.";
  }
}
</script>

<template>
  <main>
    <div class="alert alert-error shadow-lg my-8" v-if="errorAlert">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{{ errorAlert }}</span>
      </div>
      <div class="flex-none">
        <button class="btn btn-sm btn-ghost" @click="errorAlert = null">
          Kapat
        </button>
      </div>
    </div>

    <div
      class="card card-bordered card-side bg-base-100 shadow-xl my-16"
      style="margin-left: auto; margin-right: auto"
    >
      <div class="card-body items-center text-center">
        <h2 class="card-title py-4">URL Kısaltıcı</h2>
        <div class="card-actions justify-end py-4">
          <form @submit.prevent="shortenURL">
            <label class="input-group mb-8">
              <span>Kısaltılacak URL</span>
              <input
                type="url"
                placeholder="https://www.ornek.com"
                class="input input-bordered w-full"
                required
                v-model="originalUrl"
              />
            </label>
            <label class="input-group mb-8">
              <span>Kullanıcı</span>
              <input
                type="text"
                placeholder="Kullanıcı"
                class="input input-bordered w-full"
                required
                v-model="createdBy"
              />
            </label>
            <label class="input-group mb-8">
              <span>URL Özel Ad (Opsiyonel)</span>
              <input
                type="text"
                placeholder="URL'ye ait özel ad"
                class="input input-bordered w-full"
                maxlength="10"
                v-model="specialName"
              />
            </label>
            <label class="input-group mb-8">
              <span>URL Son Geçerlilik Tarihi (Opsiyonel)</span>
              <input
                type="datetime-local"
                class="input input-bordered w-full"
                v-model="expiresAt"
              />
            </label>
            <button class="btn btn-primary">Kısalt</button>
          </form>
        </div>
      </div>
    </div>

    <div
      class="card bg-base-100 shadow-xl"
      style="margin-left: auto; margin-right: auto"
      v-if="createdShortLink"
    >
      <div class="card-body">
        <h2 class="card-title self-center">Yeni URL Oluşturuldu</h2>
        <p>
          Orijinal URL :
          <a
            target="_blank"
            :href="createdShortLink.originalUrl"
            class="link link-primary"
            >{{ createdShortLink.originalUrl }}</a
          >
        </p>
        <p>
          Kısaltılmış URL :
          <a
            target="_blank"
            :href="createdShortLink.shortenedUrl"
            class="link link-primary"
            >{{ createdShortLink.shortenedUrl }}</a
          >
        </p>
        <p>Oluşturan : {{ createdShortLink.createdBy }}</p>
        <p>Özel Ad : {{ createdShortLink.specialName }}</p>
        <p>
          Oluşturulduğu Tarih :
          {{ new Date(createdShortLink.createdAt).toLocaleString() }}
        </p>
        <p>
          Son Geçerlilik Tarih :
          {{
            createdShortLink.expiresAt
              ? new Date(createdShortLink.expiresAt).toLocaleString()
              : "Yok"
          }}
        </p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary" @click="createdShortLink = null">
            Kapat
          </button>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <div
      class="card card-bordered card-side bg-base-100 shadow-xl my-16"
      style="margin-left: auto; margin-right: auto"
    >
      <div class="card-body items-center text-center">
        <h2 class="card-title py-4">Kısaltılmış URL Bul</h2>
        <div class="card-actions justify-end py-4">
          <form @submit.prevent="hello">
            <label class="input-group mb-8">
              <span>Orijinal URL veya URL Özel Adı</span>
              <input
                type="search"
                placeholder="URL veya URL Özel Adı"
                class="input input-bordered w-full"
                required
                v-model="searchQuery"
              />
              <button @click="getURLs" class="btn btn-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </label>
          </form>
        </div>
      </div>
    </div>

    <div
      class="overflow-x-auto my-16"
      style="margin-left: auto; margin-right: auto"
      v-if="searchedLinks"
    >
      <table class="table table-compact w-full">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th>Orijinal URL</th>
            <th>Kısaltımış URL</th>
            <th>Oluşturan</th>
            <th>Özel Ad</th>
            <th>Oluşturulma Tarihi</th>
            <th>Son Geçerlilik Süresi</th>
            <th>Tıklanma Sayısı</th>
          </tr>
        </thead>
        <tbody v-for="link in searchedLinks" :key="link._id">
          <tr class="hover">
            <th></th>
            <th>
              <a
                target="_blank"
                :href="link.originalUrl"
                class="link link-primary"
                >{{ link.originalUrl }}</a
              >
            </th>
            <th>
              <a
                target="_blank"
                :href="link.shortenedUrl"
                class="link link-primary"
                >{{ link.shortenedUrl }}</a
              >
            </th>
            <th>{{ link.createdBy }}</th>
            <th>{{ link.specialName }}</th>
            <th>
              {{
                link.createdAt
                  ? new Date(link.createdAt).toLocaleString()
                  : "Yok"
              }}
            </th>
            <th>
              {{
                link.expiresAt
                  ? new Date(link.expiresAt).toLocaleString()
                  : "Yok"
              }}
            </th>
            <th>{{ link.clickCount }}</th>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<style></style>
