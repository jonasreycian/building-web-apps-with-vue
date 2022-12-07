<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{ byline }}</p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
    byline: String,
  },
};
</script>