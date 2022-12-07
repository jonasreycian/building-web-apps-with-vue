<template>
  <div class="container">
    <TodoList
      :TodoLists="TodoLists"
      :Delete="Delete"
    />
    <transition name="b" appear>
    <form @submit.prevent="Create()">
      <label>New item </label>
      <input
        type="text"
        v-model="msg"
        autocomplete="off"
      >
        <button>Add item</button>
    </form>
    </transition>
  </div>
</template>

<script>
import TodoList from './TodoList';
import { ref } from "@vue/runtime-core";

export default {
  components: {
    TodoList,
  },
  setup() {
    let exampleData = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ];
    return {
      TodoLists: ref(exampleData)
    };
  },
  methods: {
    Create() {
      let id = Math.floor(Math.random() * 100);
      const next = { id, name: this.msg };
      this.TodoLists.push(next);
    },
    Delete(idx) {
      this.TodoLists = this.TodoLists.filter((r) => r.id !== idx);
    }
  }
}

</script>

<style scoped> 
  .b-enter-from, .b-leave-to {
    opacity: 0;
    transform: translateX(10px);
  }
  /* .b-enter-to {
    opacity: 1;
    transform: translateX(0);
  } */
  .b-enter-active {
    transition: all 0.5s ease-in;
  }
  /* .b-leave-from {
    opacity: 1;
    transform: translateX(0);
  } */
  .b-leave-active {
    transition: all 0.5s ease-out;
  }
</style>