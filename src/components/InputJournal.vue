<template>
    <div class="autosuggest-container input-journal" :class="{'has-focus': hasFocus}">
        <h2><i class="fas fa-book"></i> <span>Journal or topic</span></h2>
        <vue-autosuggest
                class="hello"
                id="auto-1"
                ref="autosuggestJournal"
                :suggestions="suggestions"
                :inputProps="inputProps"
                :sectionConfigs="sectionConfigs"
                :getSuggestionValue="getSuggestionValue"
                @focus="focusHandler"
                @blur="blurHandler"
        >
            <template slot-scope="{ suggestion }">

                <div v-if="suggestion.name == 'journals'">
                    <i class="fas fa-book"></i>
                    {{ suggestion.item.name }}
                </div>
                <div v-else>
                    <i class="fas fa-tag"></i>
                    {{ suggestion.item.topic }}
                </div>
            </template>
        </vue-autosuggest>
    </div>
</template>

<script>
    import axios from 'axios'
    import _ from "lodash"
    import {VueAutosuggest} from "vue-autosuggest";
    // import {store} from './store.js'

    export default {
        name: 'InputJournal',
        components: {
            VueAutosuggest
        },
        props:['initialValue'],
        data() {
            return {
                results: [],
                timeout: null,
                hasFocus: false,
                selected: this.initialValue,
                searchText: "",
                debounceMilliseconds: 50,
                journalsUrl: "http://api.rickscafe.io/search/journals/title/",
                topicsUrl: "https://rickscafe-api.herokuapp.com/search/topics/",
                inputProps: {
                    id: "journal-input",
                    onInputChange: this.fetchResults,
                    placeholder: "eg: Nature, astronomy",
                    class: "form-control"
                },
                suggestions: [],
                sectionConfigs: {
                    topics: {
                        limit: 3,
                        label: "Topic",
                        onSelected: selected => {
                            console.log("selected topic:", selected)
                            this.selected = selected.item;
                            // store.setJournalSearch(selected.item)
                            this.$emit("selected", {
                                q: selected.item.topic,
                                type: "topic"
                            })
                        }
                    },
                    journals: {
                        limit: 3,
                        label: "Journal",
                        onSelected: selected => {
                            console.log("selected journal:", selected)
                            this.selected = selected.item;
                            this.$emit("selected", {
                                q: selected.item.id,
                                type: "journal"
                            })
                        }
                    }
                }
            };
        },
        methods: {
            fetchResults(val, oldVal) {
                this.searchText = val;
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    const journalsPromise = axios.get(this.journalsUrl + val);
                    const topicsPromise = axios.get(this.topicsUrl + val);

                    Promise.all([journalsPromise, topicsPromise]).then(values => {
                        this.suggestions = [];
                        this.selected = null;

                        const journals = values[0].data.list;
                        const topics = values[1].data.list
                        // const topics = this.filterResults(values[1].data, val, "name");

                        journals.length &&
                            this.suggestions.push({name: "journals", data: journals});

                        topics.length &&
                            this.suggestions.push({name: "topics", data: topics});

                    });
                }, this.debounceMilliseconds);
            },
            getSuggestionValue(suggestion) {
                let {name, item} = suggestion;
                if (item.name){ // it's a journal
                    return _.truncate(item.name, {length: 30})
                } else { // it's a topic
                    return _.truncate(item.topic, {length: 30})
                }
            },
            blurHandler(){
                let that = this
                setTimeout(function(){
                    that.suggestions = [];
                    if (!that.selected && that.searchText){
                        that.$emit("selected", {
                            q: that.searchText,
                            type: "text"
                        })
                    }

                }, 100)
            },
            focusHandler(){
                this.hasFocus = true
            }
        },
        watch: {
            suggestions(newSuggestions, oldSuggestions) {
                // console.log("new suggestions:", newSuggestions);
            },

        },
        mounted() {
            // if (store.input.journal){
            //     this.$refs.autosuggestJournal.searchInput = store.state.journal.name
            // }
        }
    }
</script>



<style lang="scss">

    .autosuggest-journal {
        // this is copy-pasted from the vue-autocomplete example page here
        // https://codesandbox.io/s/2olxlv9q9r

        .avatar {
            height: 25px;
            width: 25px;
            border-radius: 20px;
            margin-right: 10px;
        }

        #autosuggest__input {
            outline: none;
            position: relative;
            display: block;
            border: 1px solid #616161;
            font-size: 20px;
            padding: 10px;
            width: 100%;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
        }

        #autosuggest__input.autosuggest__input-open {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }

        .autosuggest__results-container {

        }

        .autosuggest__results {
            font-weight: 300;
            margin: 0;
            position: absolute;
            z-index: 10000001;
            width: 100%;
            border: 1px solid #e0e0e0;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            background: white;
            padding: 0px;
            /*max-height: 400px;*/
            overflow-y: scroll;
            /*max-width: 800px; // i think this has to be hardcoded because "position:absolute" on the div*/
        }

        .autosuggest__results ul {
            list-style: none;
            padding-left: 0;
            margin: 0;
        }

        .autosuggest__results .autosuggest__results_item {
            cursor: pointer;
            padding: 15px;
        }

        #autosuggest ul:nth-child(1) > .autosuggest__results_title {
            border-top: none;
        }

        .autosuggest__results .autosuggest__results_title {
            color: gray;
            font-size: 11px;
            margin-left: 0;
            padding: 15px 13px 5px;
            border-top: 1px solid lightgray;
        }

        .autosuggest__results .autosuggest__results_item:active,
        .autosuggest__results .autosuggest__results_item:hover,
        .autosuggest__results .autosuggest__results_item:focus,
        .autosuggest__results
        .autosuggest__results_item.autosuggest__results_item-highlighted {
            background-color: #f6f6f6;
        }

    }




</style>
