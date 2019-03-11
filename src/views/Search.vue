<template>
    <div class="home">
        <div class="loading" v-show="isLoading">
            Loading...
        </div>


        <div class="top-screen" :class="{'landing-mode': showLandingMode}">

            <div class="content" :class="{'landing-mode': showLandingMode}">

                <h2 class="hero" v-if="showLandingMode">
                    Find journals that meet your
                    open-access funder mandate:
                </h2>
                <search-form @submit="formSubmitHandler"></search-form>
            </div>




        </div>


        <div class="bottom-screen" v-show="!showLandingMode" :class="{'landing-mode': showLandingMode}">
            <div class="results-wrapper">
                <div class="tools">
                    <div class="left">
                        <md-button>
                            <i class="far fa-envelope"></i>
                            Create alert
                        </md-button>

                    </div>
                    <div class="right">
                        <md-button :href="store.getSearchApiUrl()" target="_blank">
                            <i class="fas fa-cogs"></i>
                            View in API
                        </md-button>
                        <md-button>
                            <i class="fas fa-wrench"></i>
                            Report errors
                        </md-button>
                    </div>
                </div>

                <div class="results-list" v-if="!store.state.journal">
                    <div v-for="myJournal in store.server.journalList.list">
                        <journal-row :journal="myJournal"></journal-row>
                    </div>
                </div>



                <div class="single-result" v-if="store.state.journal">
                    <!--<div class="go-back-wrapper" v-if="storeState.server.journalList">-->
                        <!--<div class="go-back">-->
                            <!--<div class="back-button" @click="store.journal = null">-->
                                <!--<i class="fas fa-arrow-left"></i> back to results-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                    <journal-zoom></journal-zoom>

                </div>
            </div>









        </div>


    </div>
</template>

<script>
    import axios from 'axios'


    import {store} from '../store.js'
    import JournalRow from '../components/JournalRow'
    import SearchForm from '../components/SearchForm'
    import JournalZoom from '../components/JournalZoom'


    export default {
        name: 'Search',
        data: () => ({
            showLandingMode: true,
            storeState: store.state,
            store: store,
            isLoading: false


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
            store.setFromQueryObj(this.$route.query)
            this.isLoading = true
            store.fetchAll()
                .then(ret => {
                        this.isLoading = false
                    })
            if (this.$route.query){
                this.showLandingMode = false
            }
            setTimeout(function () {
                document.getElementById("journal-input").focus()
            }, 100)
        },
        watch: {
            "$route": function (to, from) {
                store.setFromQueryObj(to.query)
                this.isLoading = true
                store.fetchAll()
                    .then(ret => {
                        this.isLoading = false
                    })
            },
            "store.state": {
                handler: function(to){
                    this.$router.push({query: store.getAsQueryObj()})
                },
                deep: true
            }
        }
    }
</script>


<style lang="scss">
    @import '../assets/animate.css';

    .home {
        .loading {
            position: fixed;
            width: 150px;
            top: 0;
            left: 50%;
            padding: 5px;
            background: #fff;
            text-align: center;
            margin-left: -75px;
            border-radius: 0 0 5px 5px;
            color: #333;
            z-index: 999999999;
        }

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
            min-height: 80vh;
            &.landing-mode {
                min-height: 0;
            }
            .results-wrapper {
                max-width: 1150px;
                margin: 0 auto;
                .tools {
                    margin-left: -13px;
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 20px;
                }
                .results-list {
                    display: flex;
                    flex-wrap: wrap;

                    &.loaded {
                        padding-top: 50px;
                    }
                    .journal-row {
                        width: 350px;
                        min-height: 275px;

                    }


                }
                .single-result {
                }

            }





        }

    }


</style>
