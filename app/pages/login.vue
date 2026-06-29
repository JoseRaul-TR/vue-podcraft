<!-- app/pages/login.vue -->
<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();
const redirectTo = (route.query.redirect as string) || "/";
useHead({ title: t("login.title") });
</script>

<template>
  <div>
    <h1>{{ t("login.title") }}</h1>
    <p>
      {{ t("login.message") }} <strong>{{ redirectTo }}</strong>
    </p>
    <NuxtLink :to="redirectTo" style="margin-top: 1rem; display: inline-block">
      {{ t("login.back") }}
    </NuxtLink>
  </div>
</template>
