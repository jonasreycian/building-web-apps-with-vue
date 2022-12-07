<template>
  <transition name="swap" mode="out-in">
    <div v-if="TodoLists.length > 0">
      <transition-group tag="ul" name="todo"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave"
      >
        <li
          v-for="(todolist, index) in TodoLists" :key="index"
        >
          <span class="name">{{todolist.name}}</span>
          <button @click="Delete(todolist.id)">X</button>
        </li>
      </transition-group>
    </div>
    <div v-else>
      <p>No items to show!</p>
    </div>
  </transition>
</template>

<script>

export default {
  props: {
    TodoLists: Array,
    Delete: Function
  },
  setup () {
    const beforeEnter = () => {
      console.log('Before Entering Group Transition');
    }

    const enter = () => {
      console.log('Entering Group Transition');
    }

    const afterEnter = () => {
      console.log('After Entering Group Transition');
    }

    const leave = () => {
      console.log('Leaving Group Transition');
    }

    return { beforeEnter, enter, afterEnter, leave }
  }
}
</script>

<style scope>
  .todo-enter-from {
    opacity: 0;
    transform: scale(0.25);
  }
  .todo-enter-to {
    opacity: 1;
    transform: scale(1);
  }
  .todo-enter-active {
    transition: all 0.5s ease;
  }
  .todo-leave-from {
    opacity: 1;
    transform: scale(1);
  }
  .todo-leave-to {
    opacity: 0;
    transform: scale(0.25);
  }
  .todo-leave-active {
    transition: all 0.5s ease;
  }
  .swap-enter-from,
  .swap-leave-to {
    opacity: 0;
    transform: translateX(40px);
  }
  .swap-enter-to,
  .swap-leave-from {
    opacity: 1;
    transform: translateX(0);
  }
  .swap-leave-active,
  .swap-enter-active {
    transition: all 0.5s ease;
  }
</style>