<template>
  <h1>grandSon</h1>

  <p>{{ name }}</p>
</template>

<script setup>
import { inject } from 'vue'
import { INJECTKEY } from '@/config/injectKey.js'

let name = inject(INJECTKEY, '使用默认值')
</script>

<style scoped></style>
