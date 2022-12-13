<template>
  <div>
    <header>
      <nav class="container mx-auto p-4 flex justify-between">
        <nuxt-link to="/" class="font-bold">Nasu Dojo</nuxt-link>
        <ul class="flex gap-4">
          <li><nuxt-link to="/">Home</nuxt-link></li>
          <li><nuxt-link to="/products">Products</nuxt-link></li>
          <li><nuxt-link to="/about" class="btn">About</nuxt-link></li>
        </ul>
      </nav>
    </header>

    <!-- Output the page content -->
    <div class="container p-4 mx-auto">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  color: #12b488;
}
</style>
