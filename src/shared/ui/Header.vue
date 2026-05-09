<template>
    <div class="header">
        <div class="header__left">
            <slot name="left"></slot>
        </div>

        <div class="header__center">
            <slot name="center"></slot>
        </div>

        <div class="header__right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<style>
.header {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-bottom: 1px solid var(--neutral-300);
    height: 48px;
}

.header__left,
.header__center,
.header__right {
    display: flex;
    align-items: center;
}

.header__left {
    justify-content: start;
}

.header__center {
    justify-content: center;
}

.header__right {
    justify-content: end;
}

@media screen and (max-width: 992px) {
    .header {
        height: fit-content;
        padding: 16px 0;
    }
}
</style>