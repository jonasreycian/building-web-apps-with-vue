<template>
  <div class="container">
      <!--<transition name="n" appear>
        <w-notification
          v-show="showNotification"
          warning
          bottom="true"
          round
          shadow
          transition="bounce">
          Please enter a value.
        </w-notification>
      </transition>-->
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
      <TodoList
        :TodoLists="TodoLists"
        :Delete="Delete"
      />
      <w-transition-slide-fade right>
        <w-card v-if="showNotification"
          class="secondary--bg red">
          <p>Please enter a value</p>
        </w-card>
      </w-transition-slide-fade>
  </div>
</template>

<script>
import TodoList from './TodoList';
import { ref } from "@vue/runtime-core";

export default {
  components: {
    TodoList,
  },
  data: () => ({
    msg: "",
    showNotification: false,
    timeout: 2000
  }),
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
      setTimeout(() => 
        { this.showNotification = false; }, this.timeout
      );

      if (this.msg.length) {
        let id = Math.floor(Math.random() * 100);
        const next = { id, name: this.msg };
        this.TodoLists.push(next);
      }
      else {
        this.showNotification = true;
      }
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
  .n-enter-active {
    animation: shake 0.25s ease;
  }
  @keyframes shake {
    0% { transform: translateY(-50px); opacity: 0; }
    25% { transform: translateY(0); opacity: 1; }
    50% { transform: translateX(15px); }
    75% { transform: translateX(-15px); }
    100% { transform: translateY(0); }
  }
</style>