<script setup lang='ts'>
import { SnackbarManager } from './features/snackbar'

</script>

<template>
  <router-view></router-view>
  <snackbar-manager></snackbar-manager>
</template>

<style>
.snackbar-manager {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
}
</style>