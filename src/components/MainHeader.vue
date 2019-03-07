<template>
    <div class="header-container" :class="specialPageMode">
        <div class="header-top-row" :class="specialPageMode">
            <div class="left">
                <h1>
                    <router-link to="/">
                    PublishOpen
                    </router-link>
                </h1>

            </div>
            <div class="spacer"></div>
            <div class="nav">
                <router-link to="./faq">FAQ</router-link>
            </div>
        </div>
    </div>


</template>

<script>
    import InputJournal from './InputJournal.vue'

    export default {
        name: 'SearchHeader',
        components: {
            InputJournal
        },
        data: () => ({
            specialPageMode: "landing"
        }),
        computed: {
        },
        methods: {
            setSpecialPageMode(){
                let path = window.location.pathname

                if (path == "/"){
                    this.specialPageMode = "landing"
                }
                else if (path == "/search") {
                    this.specialPageMode = "search"
                }
                else {
                    this.specialPageMode = null
                }
            }
        },
        watch: {
            "$route": function(to, from){
                this.setSpecialPageMode()
            }
        },
        mounted(){
            this.setSpecialPageMode()
        }
    }
</script>

<style  lang="scss">

    .header-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #fff;
        &.search {
            background: none;
            height: 50px;
            position: static;
            margin-bottom: -50px;
        }
        .header-top-row {
            display: flex;
            padding: 15px;
            align-items: center;
            border-bottom: 1px solid #ddd;
            &.landing {
                border-bottom: none;
            }

            .left {
                align-items: center;
                display: flex;
                flex: 1;
                h1 {
                    margin: 0 10px 0 0;
                    font-weight: 300;
                    a {
                        color: #fff;
                    }
                }


            }
            .nav {
                margin-right: 10px;
                display: flex;
                a {
                    font-size: 18px;
                    padding: 5px;
                    display: block;
                    color: #fff;
                }
            }

        }


    }


</style>