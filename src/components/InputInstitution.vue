<template>
    <div class="autosuggest-container input-institution">
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
        name: 'InputInstitution',
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
                institutionsUrl: "http://api.rickscafe.io/search/institutions/name/",
                inputProps: {
                    id: "institution-input",
                    onInputChange: this.fetchResults,
                    placeholder: "eg: Cambridge",
                    class: "form-control",
                },
                suggestions: [],
                onSelected: selected => {
                    this.selected = selected.item;
                    store.addInstitution(selected.item)
                }
            };
        },
        methods: {
            fetchResults(val, oldVal) {
                this.searchText = val;
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {

                    axios.get(this.institutionsUrl + val)
                        .then(response => {
                            this.suggestions = [];
                            this.selected = null;

                            const institutions = response.data.list.slice(0,5)

                            institutions.length &&
                                this.suggestions.push({data: institutions});

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





</style>
