<template>
  <div class="home">
    <div class="content">

      <h2 class="hero">
          Find journals that meet your
          open-access funder mandate.
      </h2>

      <div class="searchbar">
        <div class="inputs">

            <input-journal :initial-value="storeState.journal"></input-journal>
            <input-institution></input-institution>
            <input-funder></input-funder>



        </div>
        <div id="search-button" @click="runSearch">

          <i class="fas fa-search"></i>
          <span>Find journals</span>
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
            storeState: store.state
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
            runSearch(){
                let routeObj = {
                    path: "search",
                    query: store.getQueryObj()
                }
                console.log("route obj", routeObj)
                this.$router.push(routeObj)
            },
            inputFocus(input){

            }
        },
        mounted() {
            // store.reset()
            setTimeout(function(){document.getElementById("journal-input").focus()}, 1000)
        },
        watch: {
            storeState: function(newState, oldState){
                console.log("change in store state", newState)
            }
        }
    }
</script>


<style lang="scss">

    .home {
        background: url("../assets/books.jpg") no-repeat;
        /*background: #fff;*/
        background-color: #fff;
        background-size: cover;
        background-position: 50% 50%;
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: left;
        .content {
            width: 1100px;
            margin-top: 10vh;
            padding: 40px 40px;
            border-radius: 10px;
            /*box-shadow: 0 12px 95px 25px rgba(0, 0, 0, .4);*/
            h2.hero {
                font-size: 40px;
                line-height: 1.3;
                margin-bottom: 0;
                padding: 0 0 20px;
                margin: 0;
            }

            .searchbar {
                display: flex;

                .inputs {
                    display:flex;
                    flex: 1;


                    .autosuggest-container {
                        border: 1px solid #ddd;
                        background: #fff;
                        /*border: none;*/
                        position: relative;
                        padding: 15px 0;

                        flex: 1;
                        &.input-journal {
                            border-radius: 5px 0 0 5px;
                        }
                        &.input-funder {
                            border-radius: 0 5px 5px 0;
                        }

                        &.has-focus {
                            /*border-radius: 10px 10px 10px 0;*/
                            /*box-shadow: 0px 0 2px 0 rgba(0, 0, 0, .4);*/
                            /*border-radius: 5px;*/
                            /*border-bottom: none;*/
                            border: 1px solid #999;
                            flex: 3;
                            h2 {
                                color: dodgerblue;
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
                            width: 80%;
                            border: none;
                            /*border-bottom: 1px solid #ccc;*/
                            font-size: 20px;
                            /*padding: 0 0 15px 15px;*/
                            /*margin: 15px;*/
                            padding: 0 15px;
                            margin-bottom: 15px;
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
                            border: 1px solid #999;
                            border-top: 1px solid #ddd;
                            width: 500px;
                            background: #fff;
                            margin-left: -1px;
                            z-index: 999;
                            background: #fafafa;
                            border-radius: 0 0 5px 5px;
                            box-shadow: 0px 2px 2px 0 rgba(0, 0, 0, .4);



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
                    background: dodgerblue;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 10px;
                    height: 80px;
                    color: #fff;
                    margin-left: 10px;
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


</style>
