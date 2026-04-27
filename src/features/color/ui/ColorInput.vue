<script setup lang='ts'>
/* Props */
const props = defineProps<{
    values: string[]
}>();

/* Output */
const emit = defineEmits<{
    (e: 'value-changed', value: string): void
}>();

/* Methods */
const onChange = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    emit('value-changed', value);
}
</script>

<template>
    <select :value="props.values[0]" @change="onChange">
        <option v-for="value in props.values" :key="value" :value=value>{{ value }}</option>
    </select>
</template>