<script setup lang='ts'>
/* Props */
const props = defineProps<{
    label: string,
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

<style>
.select-group {
    display: flex;
    align-items: center;
    gap: 8px;
}

.select-group__input {
    font-size: 1rem;
    cursor: pointer;
    border: 1px solid var(--neutral-300);
    width: 120px;
    height: 32px;
    border-radius: 8px;
    padding: 0 4px;
}
</style>

<template>
    <div class="select-group">
        <span class="select-grup__label">{{ props.label }}</span>
        <select class="select-group__input" @change="onChange">
            <option v-for="value in props.values" :key="value" :value=value :selected="value === values[0]">{{ value.toUpperCase() }}
            </option>
        </select>
    </div>
</template>