<template>
    <div class="autosuggest-container input-institution" :class="{'has-focus': hasFocus}">
        <h2><i class="fas fa-university"></i> Your institution</h2>
        <vue-autosuggest
                class="hello"
                id="auto-2"
                ref="inputInstitution"
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
        <div class="close" @click="clear" v-show="searchText">
            &times;
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {VueAutosuggest} from "vue-autosuggest";
    import {store} from '../store.js'

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
                store: store,
                hasFocus: false,
                debounceMilliseconds: 50,
                institutionsUrl: "https://api.rickscafe.io/autocomplete/institutions/name/",
                inputProps: {
                    id: "institution-input",
                    onInputChange: this.fetchResults,
                    placeholder: "eg: Cambridge",
                    class: "form-control",
                },
                suggestions: [],
                onSelected: selected => {
                    this.selected = selected.item;
                    this.$emit("selected", selected.item.id)
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
            },
            clear(event){
                console.log("clear", event)
                this.suggestions = []
                this.selected = null
                this.searchText = ""
                this.$refs.inputInstitution.searchInput = ""
                this.$emit("clear")
                this.store.setInstitution(null)
                document.getElementById("institution-input").focus()

            }
        },
        watch: {
            "store.server.institution": {
                handler: function(to){
                    console.log("SETTTING INSTI", store.server.institution.name)
                    this.$refs.inputInstitution.searchInput = store.server.institution.name
                },
                deep: true
            }
        }
    }
</script>



<style lang="scss">





</style>
