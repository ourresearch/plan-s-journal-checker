<template>
    <div class="header-container" :class="specialPageMode">
        <md-progress-bar
                v-show="store.isLoading"
                md-mode="indeterminate"
                class="md-accent"></md-progress-bar>
        <div class="header-top-row" :class="specialPageMode">
            <div class="left">
                <h1>
                    <a href="/search">
                        <i class="fas fa-unlock-alt"></i>
                        <span>Publish</span>Open
                    </a>
                </h1>

            </div>
            <div class="spacer"></div>
            <div class="nav">
                <router-link to="/transformative-agreements">Transformative Agreements</router-link>
                <div class="sep"></div>
                <router-link to="/faq">FAQ</router-link>
            </div>
        </div>
    </div>


</template>

<script>
    import InputJournal from './InputJournal.vue'
    import {store} from '../store.js'

    export default {
        name: 'SearchHeader',
        components: {
            InputJournal
        },
        data: () => ({
            specialPageMode: "landing",
            store: store
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
        background: dodgerblue;
        position: relative;
        .md-progress-bar {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            background: #fff;
        }


        &.search {
            background: none;
            margin-bottom: -60px;
        }

        .header-top-row {
            display: flex;
            padding: 15px;
            align-items: center;
            max-width: 1150px;
            margin: 0 auto;

            .left {
                align-items: center;
                display: flex;
                flex: 1;
                h1 {
                    margin: 0 10px 0 0;
                    span {
                        font-weight: normal;
                    }
                    i {margin-right: 3px;}
                    font-size: 20px;
                    a {
                        color: #fff;
                        &:hover {
                            text-decoration: none;
                        }
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
                    &:hover {
                        color: #fff;
                    }
                }
                .sep {
                    border-left: 1px solid #fff;
                    margin: 0 5px;
                }
            }

        }


    }


</style>