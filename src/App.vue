<script setup lang='ts'>
import { SnackbarManager } from './features/snackbar'

</script>

<template>
  <router-view></router-view>
  <snackbar-manager></snackbar-manager>
</template>
