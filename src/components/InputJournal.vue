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
        <div class="close" @click="clear" v-show="searchText">
            &times;
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {store} from "../store"
    import {VueAutosuggest} from "vue-autosuggest";

    export default {
        name: 'InputJournal',
        components: {
            VueAutosuggest,
            store
        },
        props:['displayValue'],
        data() {
            return {
                results: [],
                timeout: null,
                hasFocus: false,
                store: store,
                selected: {},
                selectedToReport: {},  // handles string selections
                searchText: "",
                debounceMilliseconds: 50,
                journalsUrl: "https://api.rickscafe.io/autocomplete/journals/name/",
                topicsUrl: "https://rickscafe-api.herokuapp.com/autocomplete/topics/name/",
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
                            this.update("topic", selected.item.topic)
                        }
                    },
                    journals: {
                        limit: 3,
                        label: "Journal",
                        onSelected: selected => {
                            this.selected = selected.item;
                            this.update("journal", selected.item.id)
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
                    return item.name
                } else { // it's a topic
                    return item.topic
                }
            },
            blurHandler(){

                // wait to make sure that this blur isn't being cause by
                // the user clicking to make a selection
                let that = this
                setTimeout(function(){
                    that.hasFocus = false
                    if (!that.selected && that.searchText){
                        that.update("text", that.searchText)


                        // when the user tabs out of the the input, the
                        // library doesn't close the suggestions
                        let that = this
                        setTimeout(function(){
                            that.suggestions = [];
                        }, 100)

                    }
                }, 100)




            },
            focusHandler(){
                this.hasFocus = true
            },
            clear(event){
                console.log("clear", event)
                this.suggestions = []
                this.searchText = ""
                this.selected = null
                this.$refs.autosuggestJournal.searchInput = ""

                this.store.setJournal(null)
                this.store.setTopic(null)
                this.store.setText(null)

                this.$emit("clear")
            },
            update(field, val){
                this.selectedToReport = {
                    field: field,
                    val: val
                }
                this.$emit("selected", this.selectedToReport)
            }
        },
        watch: {
            "store.server.journalInputContent": {
                handler: function(to){
                    console.log("InputJournal watch: store state changed", to)
                    this.$refs.autosuggestJournal.searchInput = store.server.journalInputContent
                }
            }


        },
        mounted() {
            this.$refs.autosuggestJournal.searchInput = store.server.journalInputContent
        },
    }
</script>



<style lang="scss">




</style>
