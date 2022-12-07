<template>
<div class="row">
  <div class="col-md-12">
  </div>
</div>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-6">
      <li v-for="item in articles" :key="item.message">
        <h3>
          <a href="">{{ item.title }}</a>
        </h3>
        <p>
          <em>Posted: {{ item.date }}</em>
        </p>
        <img v-bind:src="item.image" width="500">
        <p>{{ item.body }}</p>
        <hr />
      </li>
    </div>
    <div class="col-md-9"></div>
  </div>
</template>

<script>
import VueCookies from 'vue-cookies'
export default {
  name: "Articles",
  props: {
    articles: Array,
  },
  methods: {
    gobeta: function(){
      alert("We are going beta!");
      VueCookies.set('nf_ab', "staging", "24h");
    }
  }
};
</script>