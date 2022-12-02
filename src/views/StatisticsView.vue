<template>
  <main>
    <div
      class="overflow-x-auto my-16"
      style="margin-left: auto; margin-right: auto"
      v-if="topLinkCreators"
    >
      <h1 class="text-xl text-center mb-8">En Çok Link Oluşturanlar</h1>

      <table class="table w-full">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th>Kullanıcı</th>
            <th>Oluşturduğu Link Sayısı</th>
          </tr>
        </thead>
        <tbody v-for="user in topLinkCreators" :key="user._id">
          <tr class="hover">
            <th></th>
            <th>{{ user._id }}</th>
            <th>{{ user.count }}</th>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="divider"></div>

    <div
      class="overflow-x-auto my-16"
      style="margin-left: auto; margin-right: auto"
      v-if="mostClickedLinks"
    >
      <h1 class="text-xl text-center mb-8">En Çok Tıklanan Linkler</h1>

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
        <tbody v-for="link in mostClickedLinks" :key="link._id">
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
                target="_self"
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
            <th>{{ link.expiresAt ? new Date(link.expiresAt).toLocaleString() : "Yok" }}</th>
            <th>{{ link.clickCount }}</th>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const topLinkCreators = ref(null);
const mostClickedLinks = ref(null);
async function getTopLinkCreators() {
  try {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/shortlinks/top-link-creators`
    );

    console.log(result);

    topLinkCreators.value = result.data.topLinkCreators;

    console.log(topLinkCreators.value);
  } catch (error) {
    console.log(error);
  }
}

async function getMostClickedLinks() {
  try {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/shortlinks/most-clicked-links`
    );

    console.log(result);

    mostClickedLinks.value = result.data.mostClickedLinks;

    console.log(mostClickedLinks.value);
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getTopLinkCreators();
  getMostClickedLinks();
});
</script>

<style></style>
