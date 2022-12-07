<template>
  <select @change="changeLocale">
    <option
      v-for="supportedLocale in SUPPORTED_LOCALES"
      :key="`locale-${supportedLocale}`"
      :value="supportedLocale"
      :selected="locale === supportedLocale"
    >{{ supportedLocale }}</option>
  </select>
</template>

<script>
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { SUPPORTED_LOCALES, loadLocaleMessages } from "@/i18n";

export default {
  setup() {
    const i18n = useI18n();
    const { locale } = i18n;
    const router = useRouter();
    const changeLocale = (event) => {
      const newLocale = event.target.value;
      loadLocaleMessages(i18n, newLocale).then(() => {
        locale.value = newLocale;
        router
          .replace({ params: { locale: newLocale } })
          .catch(() => {
            router.push("/");
          });
        localStorage.setItem("locale", newLocale);
      });
    };

    return {
      changeLocale,
      SUPPORTED_LOCALES,
      locale
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