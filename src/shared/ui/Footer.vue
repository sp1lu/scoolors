<template>
    <div class="footer">
        <div class="footer__left">
            <slot name="left"></slot>
        </div>

        <div class="footer__center">
            <slot name="center"></slot>
        </div>

        <div class="footer__right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<style>
.footer {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: 48px;
}

.footer__left,
.footer__center,
.footer__right {
    display: flex;
    align-items: center;
}

.footer__left {
    justify-content: start;
}

.footer__center {
    justify-content: center;
}

.footer__right {
    justify-content: end;
}

@media screen and (max-width: 992px) {
    .footer {
        display: flex;
        flex-direction: column;
        height: fit-content;
        padding: 16px 0;
    }

    .footer>* {
        justify-content: center;
    }
}
</style>