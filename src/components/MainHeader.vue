<template>
    <md-toolbar class="main-header">
        <div class="brand">
            <h1>
                <router-link to="/">
                Plan S Journal Checker demo
                </router-link>

            </h1>

        </div>
        <div class="nav">
            <router-link to="./wizard">Wizard</router-link>
            <router-link to="./faq">FAQ</router-link>
        </div>
    </md-toolbar>


</template>

<script>

    export default {
        name: 'MainHeader'
    }
</script>

<style scoped lang="scss">
    .brand {
        flex: 1;
        display: flex;
        padding: 15px;
        align-items: center;
        h1 {
            margin: 0;
            font-weight: 300;
        }
    }
    .nav {
        margin-right: 10px;
        display: flex;
        a {
            font-size: 18px;
            padding: 5px;
            display: block;
        }
    }


</style>