<template>
    <h1>Qr Code with {{ route.params.id }}</h1>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute();
</script>