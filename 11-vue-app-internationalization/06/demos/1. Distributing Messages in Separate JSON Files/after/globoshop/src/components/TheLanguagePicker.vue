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
import { watch } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { locale, availableLocales } = useI18n();
    const router = useRouter();

    watch(locale, (newLocale) => {
      router.replace({ params: { locale: newLocale } }).catch(() => {
        router.push("/");
      });
      localStorage.setItem("locale", newLocale);
    });

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