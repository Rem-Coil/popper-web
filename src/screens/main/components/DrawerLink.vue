<template>
    <router-link :to="path" v-slot="{ navigate, isActive, isExactActive }" custom>
        <div @click="navigate" :class="[isActive && 'active', isExactActive && 'exact', 'link']">
            <img alt="route-icon" :src="iconBuilder(isExactActive)">
            <div class="link-title">
                {{ props.label }}
            </div>
        </div>
    </router-link>
</template>

<script setup>

const props = defineProps({
    label: String,
    icon: String,
    path: String,
})

const iconBuilder = (isActive) => {
    const name = isActive ? `active_${props.icon}` : props.icon;
    return `/assets/icons/${name}`
}

</script>

<style>
.link {

    display: flex;
    width: 190px;
    height: 24px;
    border-radius: 16px;
    margin: 8px 0;
    padding: 8px 12px;

    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    color: #808285;

    cursor: pointer;
}

.link:hover {
    background: #E1E0E3;
}

.link.exact {
    background: #E6EFF7;
    color: #0A60AD;
}

.link-title {
    margin: 0 0 0 12px;
}
</style>