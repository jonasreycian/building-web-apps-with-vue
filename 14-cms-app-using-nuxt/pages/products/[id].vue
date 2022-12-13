<template>
  <div>
    <p>Products details for {{ id }}</p>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, labore
      veniam quas neque ipsam voluptate quae! In quod temporibus sapiente minus.
      Dolore corporis voluptatibus fugiat quisquam nostrum nobis inventore quis.
    </p>
  </div>
</template>

<script setup>
const { id } = useRoute().params;

definePageMeta({
  layout: "products",
});
</script>

<style scoped></style>
