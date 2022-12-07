<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="jumbotron">
          <img alt="Vue logo" src="./assets/logo.png" />
          <HelloWorld
            msg="My Cheesy Vue Blog"
            byline="The blog that took (nearly) 30 minutes to create!"
          />
          <Articles :articles="items" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Articles from "./components/Articles.vue";
import HelloWorld from "./components/HelloWorld.vue";
import ArticleJSON from "./json/articles.json";
export default {
  name: "App",
  components: {
    HelloWorld,
    Articles,
  },
  data() {
    return {
      items: ArticleJSON,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
