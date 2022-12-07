<template>
  <ul>
    <li
      v-for="(todolist, index) in TodoLists" :key="index"
    >
      <span class="name">{{todolist.name}}</span>
      <button @click="Delete(todolist.id)">X</button>
    </li>
  </ul>
</template>

<script>

export default {
  props: {
    TodoLists: Array,
    Delete: Function
  },
}
</script>

<style scope>
</style>