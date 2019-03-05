<template>
    <div class="autosuggest-container input-institution" :class="{'has-focus': hasFocus}">
        <h2><i class="fas fa-university"></i> Your institution</h2>
        <vue-autosuggest
                class="hello"
                id="auto-2"
                ref="autosuggest"
                :suggestions="suggestions"
                :inputProps="inputProps"
                :getSuggestionValue="getSuggestionValue"
                @selected="onSelected"
                @focus="hasFocus=true"
                @blur="hasFocus=false"
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

    export default {
        name: 'InputInstitution',
        components: {
            VueAutosuggest
        },
        props:['initialValue'],
        data() {
            return {
                results: [],
                timeout: null,
                selected: this.initialValue,
                searchText: "",
                hasFocus: false,
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
                    this.$emit("selected", selected.item)
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
                return _.truncate(item.name, {length: 30})
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
