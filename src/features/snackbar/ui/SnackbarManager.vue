<script setup lang='ts'>
import { AppSnackbar } from '.';
import { useSnackbars } from '../model';

const { snackbars } = useSnackbars();
</script>

<style>
.snackbar-manager {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
}
</style>

<template>
    <div class="snackbar-manager">
        <AppSnackbar v-for="{ id, text } in snackbars" :id="id" :text="text"></AppSnackbar>
    </div>
</template>