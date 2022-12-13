<template>
  <div class="container-fluid">
    <h2>About</h2>
    <p>Hello</p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt soluta
      inventore quia dignissimos non itaque? Accusantium iure minus itaque sit
      cum magnam voluptas, totam recusandae corrupti asperiores ratione,
      voluptatibus deserunt!
    </p>
    <pre v-if="pending">Loading</pre>
    <pre v-else>Server: {{ data }}</pre>
  </div>
</template>

<script setup>
const { pending, data: data } = await useFetch("/api/ninja?name=mario", {
  method: "post",
  body: { age: 30 },
});
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
  font-size: 36px;
}

p {
  margin: 20px 0;
}
</style>
