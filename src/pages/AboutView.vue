<script setup lang='ts'>
/* Components */
import { AppLogo } from '../features/color'
import { Header } from '../shared/ui'
</script>

<template>
    <div class="view about-view">
        <Header>
            <template #left>
                <AppLogo />
            </template>
            <template #right>
                <RouterLink to="/">Scale</RouterLink>
            </template>
        </Header>

        <div class="about-view__content">
            <section class="about-section">
                <h1>About</h1>
                <p>
                    Welcome to <strong>Scoolors</strong> — a lightweight tool built for
                    frontend developers and web designers who want to create scalable,
                    consistent, and production-ready color systems in seconds.
                </p>
                <p>
                    The name <strong><em>Scoolors</em></strong> comes from the fusion of
                    <strong>scale</strong>, <strong>colors</strong>, and
                    <strong>cool</strong> — reflecting the app’s goal of generating
                    beautiful color scales from a single starting point.
                </p>
            </section>

            <section class="about-section">
                <h2>Why Scoolors exists</h2>
                <p>
                    Building color scales manually can be slow, repetitive, and difficult
                    to balance consistently.
                </p>
                <p>
                    <strong>Scoolors</strong> was created to simplify that process and provide a fast,
                    minimal, and practical workflow for generating accessible and visually
                    coherent palettes for web interfaces.
                </p>
            </section>

            <section class="about-section">
                <h2>Feedback & Suggestions</h2>
                <p> <strong>Scoolors</strong> is an evolving project. </p>
                <p>
                    If you have ideas for new features, improvements, export formats,
                    accessibility tools, or workflow enhancements, feel free to reach out
                    and share your suggestions. Feedback from developers and designers is
                    always welcome and helps shape future updates.
                </p>
            </section>

            <section class="about-section">
                <h2>About the developer</h2>
                <p>
                    <strong>Scoolors</strong> was created by <strong><a href="https://daviderivolta.com/"
                            target="_blank">Davide
                            Rivolta</a></strong>, with a focus
                    on modern frontend development, design systems, and developer-friendly
                    tooling for the web.
                </p>
            </section>
        </div>
    </div>
</template>

<style>
.about-view__content {
    max-width: 600px;
    margin: 0 auto;
}

.about-section {
    margin: 0 0 40px 0;
}
</style>