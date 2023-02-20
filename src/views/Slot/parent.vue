<template>
  <h1>Parent Page</h1>
  <child />
</template>

<script setup>
import { ref, shallowRef } from 'vue'
import child from './Children/child.vue'
</script>

<style scoped></style>
