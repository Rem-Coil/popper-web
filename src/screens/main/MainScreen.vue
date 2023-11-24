<template>
    <n-layout has-sider class="main">
        <!-- Drawer -->
        <n-layout-sider class="drawer">
            <div class="drawer-body">
                <img alt="logo" src="/assets/images/logo.svg" id="logo" width="214">
                <div class="drawer-label">Разделы</div>
                <div class="nav-item">
                    <drawer-link path="/" label="Наборы" icon="kits_icon.svg"></drawer-link>
                    <drawer-link path="/tasks" label="Тех. задания" icon="tasks_icon.svg"></drawer-link>
                    <drawer-link path="/workers" label="Сотрудники" icon="peoples_icon.svg"></drawer-link>
                </div>
            </div>
        </n-layout-sider>

        <!-- Body -->
        <n-layout class="main-body">
            <router-view></router-view>
        </n-layout>
    </n-layout>
</template>

<script setup>
import DrawerLink from "./components/DrawerLink.vue";

</script>

<style>
.main {
    height: 100%;
}

.drawer {
    background: #F9F8FB;
    width: 246;
}

.n-layout {
    background-color: white;
}

.drawer-body {
    width: 214px;
    margin: 0 auto;
    margin-top: 48px;
}

.drawer-label {
    margin-top: 24px;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: rgba(128, 130, 133, 0.8);
}

.main-body {
    height: 100vh;
    padding: 32px 20px 24px 20px;
}
</style>
