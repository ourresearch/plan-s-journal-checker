<template>
    <div class="home">
        <div class="top-screen" :class="{'landing-mode': showLandingMode}">

            <div class="content" :class="{'landing-mode': showLandingMode}">

                <h2 class="hero" v-if="showLandingMode">
                    Find journals that meet your
                    open-access funder mandate:
                </h2>
                <search-form @submit="formSubmitHandler"></search-form>
            </div>




        </div>


        <div class="bottom-screen" :class="{'landing-mode': showLandingMode}">
            <div class="loading-screen" v-show="store.isLoading">
                <div class="loading">
                    Loading...
                </div>
            </div>

            <div class="loaded-screen" v-show="!store.isLoading">
                <div class="results-list-wrapper" v-show="!store.showJournalZoom && store.server.journalList">

                    <div class="results-list">
                        <div v-for="myJournal in store.server.journalList.list">
                            <journal-row :journal="myJournal"></journal-row>
                        </div>
                    </div>
                </div>


                <div class="single-result-wrapper" v-if="store.showJournalZoom">
                    <!--<div class="go-back-wrapper" v-if="storeState.server.journalList">-->
                        <!--<div class="go-back">-->
                            <!--<div class="back-button" @click="store.setJournal(null)">-->
                                <!--<i class="fas fa-arrow-left"></i> back to results-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->

                    <div class="single-result">
                        <journal-zoom :journal="store.server.journalZoom"></journal-zoom>

                    </div>

                </div>

            </div>




        </div>


    </div>
</template>

<script>
    import axios from 'axios'

    import {store} from '../components/store.js'
    import JournalRow from '../components/JournalRow'
    import SearchForm from '../components/SearchForm'
    import JournalZoom from '../components/JournalZoom'


    export default {
        name: 'Search',
        data: () => ({
            showLandingMode: true,
            storeState: store.state,
            store: store,


        }),
        components: {
            axios,
            SearchForm,
            JournalRow,
            JournalZoom
        },
        metaInfo: {
            title: 'Search'
        },
        computed: {},
        methods: {
            formSubmitHandler(){
                this.showLandingMode = false
            },

        },
        mounted() {
            setTimeout(function () {
                document.getElementById("journal-input").focus()
            }, 100)
        },
        watch: {
            "$route": function (to, from) {
                // console.log("route change")
            },
            "store.state": {
                // handler: function(to){
                //     console.log("Search.watch(): store state changed", to)
                //     // this.doSearch()
                // },
                // deep: true
            }
        }
    }
</script>


<style lang="scss">
    @import '../assets/animate.css';

    .home {

        .top-screen {

            background: url("../assets/sky.jpg") no-repeat;
            background-color: dodgerblue;
            background-size: cover;
            background-position: 50% 50%;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 150px;
            transition: height 0.3s;

            &.landing-mode {
                height: 100vh;
            }

            .content {
                border-radius: 10px;
                margin-top: 60px;
                transition: margin-top 0.3s;
                width: 1150px;

                &.landing-mode {
                    margin-top: 20vh;
                }

                h2.hero {
                    font-size: 40px;
                    /*text-align: center;*/
                    line-height: 1.3;
                    margin-bottom: 0;
                    padding: 0 0 20px;
                    margin: 0;
                    color: #fff;
                    /*background: #fff;*/
                    padding: 20px;
                    /*text-shadow: 5px 5px 25px rgba(0, 0, 0, 1);*/
                    z-index: 9;
                    position: relative;
                    border-radius: 10px 10px 0 0;
                    margin-bottom: 20px;
                    font-weight: 100;
                }

            }
        }

        .bottom-screen {
            background: #fff;
            min-height: 100vh;
            position: relative;
            &.landing-mode {
                min-height: 0;
            }
            .loading-screen {
                padding: 20px;
                text-align: center;
            }

            .results-list-wrapper {
                width: 100%;
                .results-list {
                    max-width: 1150px;
                    margin: 0 auto;
                    &.loading {
                        display: flex;
                        justify-content: center;
                    }
                    &.loaded {
                        padding-top: 50px;

                    }

                }

            }

            .single-result-wrapper {
                /*position: absolute;*/
                /*top: 0;*/
                /*bottom: 0;*/
                /*width: 100%;*/
                /*background: #fff;*/
                /*box-shadow: 0 10px 5px 5px rgba(0,0,0,.5);*/
                /*border-left: 1px solid #333;*/
                /*z-index: 99;*/

                .go-back-wrapper {
                    background: #4DA1E7;
                    color: #fff;
                    padding: 10px;
                    .go-back {
                        max-width: 1150px;
                        margin: 0 auto;
                        .back-button {
                            font-size: 16px;
                            text-transform: uppercase;
                            font-weight: bold;
                            cursor: pointer;
                        }

                    }
                }

                .single-result {
                    max-width: 1150px;
                    margin: 0 auto;
                }

            }

        }

    }


</style>
