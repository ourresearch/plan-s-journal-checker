<template>
    <div class="autosuggest-container input-funder">
        <vue-autosuggest
                class="hello"
                id="auto-2"
                ref="autosuggest"
                :suggestions="suggestions"
                :inputProps="inputProps"
                :getSuggestionValue="getSuggestionValue"
                @selected="onSelected"
        >
            <template slot-scope="{ suggestion }">
                <span class="my-suggestion-item">{{suggestion.item.name}}</span>
            </template>
        </vue-autosuggest>
    </div>
</template>

<script>
    import axios from 'axios'
    import {VueAutosuggest} from "vue-autosuggest";
    import {store} from './store.js'

    export default {
        name: 'InputFunder',
        components: {
            VueAutosuggest
        },
        data() {
            return {
                results: [],
                timeout: null,
                selected: null,
                searchText: "",
                debounceMilliseconds: 50,
                fundersUrl: "http://api.rickscafe.io/search/funders/name/",
                inputProps: {
                    id: "funder-input",
                    onInputChange: this.fetchResults,
                    placeholder: "eg: Wellcome Trust",
                    class: "form-control"
                },
                suggestions: [],
                onSelected: selected => {
                    this.selected = selected.item;
                    store.addFunder(selected.item)
                }
            };
        },
        methods: {
            fetchResults(val, oldVal) {
                this.searchText = val;
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {

                    axios.get(this.fundersUrl + val)
                        .then(response => {
                            this.suggestions = [];
                            this.selected = null;

                            const funders = response.data.list.slice(0, 5)

                            funders.length &&
                                this.suggestions.push({data: funders});

                        });

                }, this.debounceMilliseconds);
            },
            getSuggestionValue(suggestion) {
                let {name, item} = suggestion;
                return item.name
            }
        },
        watch: {
            suggestions(newSuggestions, oldSuggestions) {
                // console.log("new suggestions:", newSuggestions);
            }
        }
    }
</script>



<style lang="scss">

    .autosuggest-funder {
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
            max-width: 800px; // i think this has to be hardcoded because "position:absolute" on the div
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
