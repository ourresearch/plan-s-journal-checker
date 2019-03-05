<template>
  <div class="home">
      <div class="top-screen" :class="'page-mode-' + pageMode">

            <div class="content" :class="'page-mode-' + pageMode">

              <h2 class="hero" v-if="pageMode=='ready'">
                  Find journals that meet your
                  open-access funder mandate:
              </h2>

              <div class="searchbar">
                <div class="inputs">

                    <input-journal></input-journal>
                    <div class="sep"></div>
                    <input-institution></input-institution>
                    <div class="sep"></div>
                    <input-funder></input-funder>



                </div>
                <div id="search-button" @click="runSearch">

                  <i class="fas fa-search"></i>
                  <span>Find journals</span>
                </div>

              </div>
            </div>

            <div class="data" style="display:none;color:#fff; width:500px; background:#000;padding:20px;">
                <pre>
                    {{userInput}}
                </pre>

            </div>

      </div>

      <div class="bottom-screen-wrapper" :class="'page-mode-' + pageMode">

          <div class="bottom-screen loading "v-show="resultsLoading">
              <div class="loading">
                  Loading...
              </div>
          </div>

          <div class="bottom-screen loaded" v-show="!resultsLoading">
              <div class="results-list" v-if="pageMode=='results-list'">
                  <div class="journal-row"
                       v-for="journal in results">

                      <div class="icon">
                          <i class="fas fa-times" v-show="!journal.policy.compliant"></i>
                          <i class="fas fa-check" v-show="journal.policy.compliant"></i>
                      </div>
                      <div class="words">
                          <div class="row-1">
                              <span class="name">
                                {{journal.name}}
                              </span>
                          </div>
                          <div class="row-1">
                              {{ journal.metrics.num_articles_since_2018}} articles since 2018
                          </div>
                          <div class="row-3">
                              <div v-show="journal.policy.compliant">
                                  Plan S compliant
                              </div>
                          </div>

                      </div>
                  </div>

              </div>


              <div class="single-result" v-if="pageMode=='single-result'">
                  <h1>single result</h1>
                  <pre>{{singleResult}}</pre>
              </div>



          </div>



      </div>






  </div>
</template>

<script>
    import axios from 'axios'
    import InputJournal from '../components/InputJournal'
    import InputInstitution from '../components/InputInstitution'
    import InputFunder from '../components/InputFunder'
    import {store} from '../components/store.js'

    export default {
        name: 'Home',
        data: () => ({
            userInput: store.input,
            pageMode: "ready",
            resultsLoading: false,
            journalEndpoint: "https://rickscafe-api.herokuapp.com/journal/",
            results: [],
            singleResult: {}
        }),
        components: {
            axios,
            InputJournal,
            InputInstitution,
            InputFunder
        },
        metaInfo: {
            title: 'Home'
        },
        computed: {

        },
        methods: {
            blur(){
              console.log("blur")
            },
            focus(){
              console.log("focus")
            },
            runSearch(){
                if (store.getSearchType() == "journal") {
                    this.pageMode = "single-result"
                    store.search()
                        .then(response => {
                            console.log("got journals response", response)
                            this.singleResult = response.data
                            this.resultsLoading = false
                        });
                }
                else {
                    this.pageMode = "results-list"
                }
                this.resultsLoading = true

                let routeObj = {
                    path: "/",
                    query: store.getQueryObj()
                }
                this.$router.push(routeObj)


            },
            inputFocus(input){

            }
        },
        mounted() {
            // store.reset()
            console.log("mount up!")
            setTimeout(function(){document.getElementById("journal-input").focus()}, 1000)
        },
        watch: {
            "$route": function(to, from){
                // console.log("route change")
            }
        }
    }
</script>


<style lang="scss">

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


            &.page-mode-ready {
                height: 100vh;
            }



            .content {
                margin-top: 20vh;
                border-radius: 10px;

                &.page-mode-results-list, .page-mode-single-result {
                    margin-top: 60px;
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

                .searchbar {
                    display: flex;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px 5px rgba(0, 0, 0, .1);
                    .inputs {
                        display:flex;
                        flex: 1;
                        .autosuggest-container {
                            border: 1px solid #ddd;
                            border-top: none;
                            border:none;
                            background: #fff;
                            /*border: none;*/
                            padding-top: 5px;
                            padding-bottom: 20px;
                            width: 350px;
                            flex: 1;
                            &.input-journal {
                                border-radius: 10px 0 0 10px;
                                border-right: 1px solid #ddd;
                            }
                            &.input-funder {
                                border-left: 1px solid #ddd;
                            }

                            &.has-focus {
                                /*border-radius: 10px 10px 10px 0;*/
                                /*box-shadow: 0px 0 2px 0 rgba(0, 0, 0, .4);*/
                                /*border-radius: 5px;*/
                                /*border-bottom: none;*/
                                /*border: 1px solid #999;*/
                                transition: all 0.5s;
                                h2 {
                                    color: orangered;
                                }
                            }

                            h2 {
                                font-size: 12px;
                                text-transform: uppercase;
                                margin: 10px 15px 5px;
                                i {
                                    display: none;
                                }
                            }

                            input {
                                outline: none;
                                /*position: relative;*/
                                /*display: block;*/
                                width: 100%;
                                border: none;
                                /*border-bottom: 1px solid #ccc;*/
                                font-size: 18px;
                                /*padding: 0 0 15px 15px;*/
                                /*margin: 15px;*/
                                padding: 0 15px;
                                box-sizing: border-box;
                                -webkit-box-sizing: border-box;
                                -moz-box-sizing: border-box;

                                &.autosuggest__input-open {
                                    /*border: 1px solid #999;*/
                                    /*border-bottom: none;*/
                                }
                            }
                            .autosuggest__results {
                                position: absolute;
                                border: 1px solid #ddd;
                                border-top: none;
                                width: 352px;
                                margin-left: -1px;
                                margin-top: 23px;
                                z-index: 999;
                                background: #fff;
                                border-radius: 10px;
                                box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, .1);



                                ul {
                                    list-style: none;
                                    padding-left: 0;
                                    margin: 0;

                                    .autosuggest__results_item {
                                        cursor: pointer;
                                        padding: 10px 20px;
                                        font-size: 16px;
                                    }

                                    .autosuggest__results_title {
                                        display: none;
                                    }

                                    .autosuggest__results_item:active,
                                    .autosuggest__results_item:hover,
                                    .autosuggest__results_item:focus,
                                    .autosuggest__results_item.autosuggest__results_item-highlighted {
                                        background-color: #eee;
                                    }

                                }
                            }

                        }
                    }

                    #search-button {
                        background: orangered;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 0 10px 10px 0;
                        height: 82px;
                        color: #fff;
                        font-size: 36px;
                        text-transform: uppercase;
                        font-weight: bold;
                        cursor: pointer;
                        width: 100px;
                        i {
                            color: #fff;
                        }
                        span {
                            display:none;
                        }
                    }
                    .bottom {
                        display: flex;
                        justify-content: flex-end;

                    }

                }

            }
        }



        .bottom-screen-wrapper {
            background: #fff;
            min-height: 0;
            padding-top: 100px;
            min-height: 100vh;
            &.page-mode-ready {
                min-height: 0;
            }

            .bottom-screen {
                max-width: 1150px;
                margin: 0 auto;
                &.loading {
                    display:flex;
                    justify-content: center;
                }
                .results-list {

                    .journal-row {
                        display: flex;
                        margin-bottom: 20px;
                        .icon {

                        }
                        .name {
                            font-size: 20px;
                        }
                    }

                }

            }

        }


    }


</style>
