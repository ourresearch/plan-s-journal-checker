<template>
    <div class="search-form">
        <div class="inputs">

            <input-journal @selected="updateJournal"></input-journal>
            <input-funder @selected="updateFunder"></input-funder>
            <input-institution @selected="updateInstitution"></input-institution>


        </div>
        <div id="search-button" @click="submit" v-if="">

            <i class="fas fa-search"></i>
            <span>Find journals</span>
        </div>

    </div>
</template>

<script>
    import {store} from '../store.js'
    import InputJournal from '../components/InputJournal'
    import InputInstitution from '../components/InputInstitution'
    import InputFunder from '../components/InputFunder'

    export default {
        name: 'SearchForm',
        components: {
            InputJournal,
            InputInstitution,
            InputFunder,
            store
        },
        props: [], // it'll need these later, to load from URL. or maybe get from URL?
        data() {
            return {
                store: store,
                hasBeenSubmitted: false
            };
        },
        methods: {
            submit(){
                console.log("SearchForm.submit()", store.state)
                this.hasBeenSubmitted = true
                this.$emit("submit")
            },
            updateFunder(id) {
                store.setFunder(id)
                document.getElementById("institution-input").focus()
            },
            updateInstitution(id) {
                store.setInstitution(id)
            },
            updateJournal(input) {
                console.log("updating journal search field", input)
                store.setState(input.field, input.val)

                // // if the user enters a journal in the form, they
                // // want a first-class search on journal
                // if (input.field === "journal") {
                //     store.setJournal(input.val)
                // }
                // else if (input.field === "topic") {
                //     store.setTopic(input.val)
                // }
                // else if (input.field === "text") {
                //     store.setText(input.val)
                // }
                document.getElementById("funder-input").focus()
            },
        },
        watch: {
            "store.isLoading": {
                handler: function(to){
                },
                deep: true
            }
        }
    }
</script>


<style lang="scss">
    .search-form {
        display: flex;
        border-radius: 5px;
        box-shadow: 0 2px 10px 5px rgba(0, 0, 0, .3);
        width: 100%;
        .inputs {
            display: flex;
            width: 100%;
            /*overflow: hidden;*/
            .autosuggest-container {
                position: relative; // needed to position close button
                background: #fff;
                padding-top: 5px;
                padding-bottom: 20px;
                flex: 1;
                flex-direction: column;
                // see https://codepen.io/thomas-eilermann/pen/grjEjE
                transition: flex-basis 300ms ease-in-out;
                &.input-journal {
                    border-radius: 5px 0 0 5px;
                    .autosuggest__results {
                        width: 502px;
                    }
                    flex-basis: 400px;
                }
                &.input-funder {
                    border-left: 1px solid #ddd;
                    border-right: 1px solid #ddd;
                    flex-basis: 250px;
                }
                &.input-institution {
                    flex-basis: 250px;
                }

                &.has-focus {
                    flex-basis: 400px;
                    h2 {
                        color: green;
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
                    padding: 0 50px 0 15px;
                    box-sizing: border-box;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    text-overflow: ellipsis;

                    &.autosuggest__input-open {
                        /*border: 1px solid #999;*/
                        /*border-bottom: none;*/
                    }

                }
                .close {
                    position: absolute;
                    right: 0;
                    margin-top: -33px;
                    font-size: 30px;
                    padding: 10px 9px;
                    background: #fff;
                    &:hover {
                        cursor: pointer;
                    }
                    opacity: .5;

                }

                .autosuggest__results {
                    position: absolute;
                    border: 1px solid #ddd;
                    border-top: none;
                    width: 303px;
                    margin-left: -1px;
                    margin-top: 23px;
                    z-index: 999;
                    background: #fff;
                    border-radius: 5px;
                    box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, .1);

                    ul {
                        list-style: none;
                        padding-left: 0;
                        margin: 0;

                        .autosuggest__results_item {
                            cursor: pointer;
                            padding: 10px 20px;
                            font-size: 16px;
                            div {
                                display: flex;
                                i {
                                    margin-right: 5px;
                                    margin-top: 1px;
                                }

                            }

                        }
                        .autosuggest__results_title {
                            padding: 20px 20px 0;
                            border-bottom: 1px solid #eee;
                            color: orangered;
                        }

                        /*.autosuggest__results_title_topics:before,*/
                        /*.autosuggest__results_title_journals:before*/
                        /*{*/
                        /*font-family: "Font Awesome 5 Free";*/
                        /*display: inline-block;*/
                        /*padding-right: 6px;*/
                        /*vertical-align: middle;*/
                        /*opacity: .9;*/
                        /*}*/

                        /*.autosuggest__results_title_topics:before {*/
                        /*content: "\f02b";*/
                        /*}*/

                        /*.autosuggest__results_title_journals:before {*/
                        /*content: "\f02d";*/
                        /*}*/

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
            background: lightgreen;
            display: flex;

            align-items: center;
            justify-content: center;
            border-radius: 5px;
            margin-left: 5px;
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
                display: none;
            }
        }
        .bottom {
            display: flex;
            justify-content: flex-end;

        }

    }
</style>
