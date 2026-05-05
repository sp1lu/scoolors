<script setup lang='ts'>
/* Dependencies */
import { ref } from 'vue';

/* Props */
const { values } = defineProps<{
    values: string[]
}>();

/* Emitters */
const emit = defineEmits<{
    (e: 'radio-changed', value: string): void
}>();

/* Refs */
const selectedValue = ref<number>(0);

/* Methods */
const onChange = (value: string) => {
    selectedValue.value = values.indexOf(value);
    emit('radio-changed', value);
}
</script>

<style>
.radio-group {
    position: relative;
    display: grid;
    height: 32px;
}

.radio-element,
.radio-element__label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.radio-element__label {
    cursor: pointer;
    text-transform: uppercase;
}

.radio-element__input:checked+.radio-element__label {
    font-weight: 500;
    color: var(--primary-500);
}

.radio-group__selected {
    position: absolute;
    height: 32px;
    border-radius: 8px;
    background-color: var(--primary-100);
    left: 0;
    z-index: -1;
    transition: .2s ease-in-out;
}
</style>

<template>
    <div class="radio-group" :style="{ gridTemplateColumns: `repeat(${values.length}, 1fr)` }">
        <label :for=value class="radio-element" v-for="value in values" :key="value">
            <input type="radio" name="radio" :id=value class="radio-element__input" hidden :value="value"
                :checked="selectedValue === values.indexOf(value)" @change="onChange(value)">
            <span class="radio-element__label">{{ value }}</span>
        </label>
        <span class="radio-group__selected"
            :style="{ width: `calc(100% / ${values.length})`, left: `calc(${selectedValue} * (100% / ${values.length}))` }"></span>
    </div>
</template>