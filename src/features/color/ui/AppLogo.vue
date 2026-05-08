<script setup lang='ts'>
</script>

<template>
    <div class="logo">
        <ul class="pictogram">
            <li class="pictogram__stripe pictogram__first"></li>
            <li class="pictogram__stripe pictogram__mid"></li>
            <li class="pictogram__stripe pictogram__last"></li>
        </ul>
        <span class="logotype">scoolors</span>
    </div>
</template>

<style>
.logo {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--primary-500);
}

.pictogram {
    padding: 0;
    margin: 0;
    list-style: none;
}

.pictogram__stripe {
    height: 8px;
    width: 24px;
    background-color: var(--primary-500);
}

.pictogram__stripe:first-child {
    border-radius: 2px 2px 0 0;
    background-color: var(--primary-300);
}

.pictogram__stripe:last-child {
    border-radius: 0 0 2px 2px;
    background-color: var(--primary-700);
}

.logotype {
    font-size: 2rem;
    font-weight: 600;
}
</style>