<template>
  <select v-model="locale">
    <option
      v-for="locale in availableLocales"
      :key="`locale-${locale}`"
      :value="locale"
    >{{ locale }}</option>
  </select>
</template>

<script>
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const {
      locale,
      availableLocales
    } = useI18n();

    return {
      locale,
      availableLocales
    };
  }
};
</script>

<style scoped>
select {
  font-size: 18px;
  width: 90px;
}
</style>