<template>
    <div class="page wizard">


        <div class="overview">
            <table>
                <tr v-if="input.correspondingAuthor.selected">
                    <td class="step-name">1. Corresponding author:</td>
                    <td class="step-val">{{input.correspondingAuthor.selected}}</td>
                </tr>
            </table>
        </div>

        <!-- STEP 0, INTRODUCTION-->
        <div class="wizard-step wizard-step-0" v-if="currentStep===0">
            <h1>Welcome to the journal selection wizard</h1>
            <div class="content">
                This wizard will help you pick a journal for your paper that fits with your funder mandate. It takes one or two minutes to complete.
            </div>
            <div class="step-controls">
                <md-button @click="stepWizardForward()" class="md-raised md-primary">let's get started!</md-button>
            </div>
        </div>


        <!-- STEP 1, CORRESPONDING AUTHOR-->
        <div class="wizard-step wizard-step-1" v-if="currentStep===1">
            <h1>
                Are you the corresponding author for this paper?
            </h1>
            <div class="content">
                <!--<md-button class="md-raised" @click="setCorrespondingAuthor('yes')">Yes</md-button>-->
                <!--<md-button class="md-raised" @click="setCorrespondingAuthor('no')">No</md-button>-->
                <!--<md-button class="md-raised" @click="setCorrespondingAuthor('not sure')">I'm not sure</md-button>-->


                <md-radio v-model="input.correspondingAuthor.selected" :value="true">Yes</md-radio>
                <md-radio v-model="input.correspondingAuthor.selected" :value="false" class="md-primary">No</md-radio>
                <md-radio v-model="input.correspondingAuthor.selected" :value="null" class="md-primary">I'm not sure</md-radio>


            </div>

            <div class="step-controls" v-if="input.correspondingAuthor.selected">
                <md-button @click="stepWizardForward()" class="md-raised md-primary">next</md-button>
            </div>


        </div>


        <!-- STEP 2, INSTITUTIONS -->
        <div class="wizard-step wizard-step-2" v-if="currentStep===2">
            <h1>
                2. What's your institutional affiliation?
            </h1>
            <div class="content">
                <div class="input">
                    <input type="text" class="wizard-input" id="institution-input" v-model="input.institution.query">
                </div>

                <div class="results">
                    <div class="result" v-for="result in input.institution.results" :click="selectInstitution(result)">
                        <div class="name">
                            {{result.name}}
                        </div>
                    </div>

                </div>
            </div>

            <div class="step-controls" v-if="input.institution.selected">
                <md-button @click="stepWizardForward()" class="md-raised">Add another affiliation</md-button>
                <md-button @click="stepWizardForward()" class="md-raised md-primary">next</md-button>
            </div>


        </div>

        <!-- STEP 3, FUNDER -->
        <div class="wizard-step wizard-step-3" v-if="currentStep===3">
            <h1>
                Who is funding this researchg?
            </h1>
            <div class="content">
                <h2>(Currently Wellcome Trust is the only supported funder)</h2>
            </div>

            <div class="step-controls" v-if="input.institution.selected">
                <md-button @click="stepWizardForward()" class="md-raised md-primary">next</md-button>
            </div>

        </div>

        <!-- STEP 4, JOURNAL -->
        <div class="wizard-step wizard-step-3" v-if="currentStep===4">
            <h1>
                Where are you thinking of publishing your work?
            </h1>
            <div class="content">
                <div class="input">
                    <input type="text" class="wizard-input" id="journal-input" v-model="input.journal.query">
                </div>

                <div class="results">
                    <div class="result" v-for="result in input.journal.results">
                        <div class="name">
                            {{result.name}}
                        </div>
                        <div class="tags">
                            <div class="tag cc-by" v-if="result.prop_cc_by_since_2018 > 0.95">
                                Fully CC-BY
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>



    </div>







</template>

<script>
    import axios from 'axios'
    import _ from 'lodash'


    export default {
        name: "Wizard",
        data: () => ({
            query: null,
            loading: false,

            currentStep: 0,
            input:{
                correspondingAuthor: {
                    selected: undefined
                },
                institution: {
                    query: "",
                    apiUrl: "http://api.rickscafe.io/search/institutions/name/",
                    results: [],
                    selected: ""
                },
                funder: {
                    query: "",
                    results: [],
                    selected: ""
                },
                journal: {
                    query: "",
                    apiUrl: "http://api.rickscafe.io/search/journals/title/",
                    results: [],
                    selected: ""
                }

            }
        }),
        computed: {
        },
        methods: {
            stepWizardForward(){
                if (this.currentStep >= 4){
                    console.log("we're done!")
                }
                else {
                    this.currentStep += 1
                }
            },
            stepWizardBackward(){
                if (this.currentStep <= 0){
                    console.log("we're at the beginning!")
                }
                else {
                    this.currentStep -= 1
                }

            },
            setCorrespondingAuthor(val){
                this.stepWizardForward()
                this.input.correspondingAuthor.selected = val
            },
            setInstitution(id){
                this.stepWizardForward()
                this.input.institution.selected = id
            },
            setJournal(id){
                this.stepWizardForward()
                this.input.journal.selected = id
            },

            getInstitutions(){
                let that = this
                that.loading = true
                axios.get(that.input.institution.apiUrl + that.input.institution.query)
                    .then(resp => {
                        that.input.institution.results = resp.data.list
                        that.loading = false
                    })
                    .catch(e => {
                        console.log("error from server", e)
                        that.loading = false
                        that.input.institution.results = []
                    })
            },


            getJournals(){
                let that = this

                let getJournalsFromApi = function(){
                    that.loading = true
                    axios.get(that.journalApiUrl + that.input.journalQuery)
                        .then(resp => {
                            that.input.journal.results = resp.data.list
                            that.loading = false
                        })
                        .catch(e => {
                            console.log("error from server", e)
                            that.loading = false
                            that.input.journal.results = []
                        })
                }

                getJournalsFromApi()

            },
        },
        mounted() {
            // this.doQuery()
        },
        // destroyed () {
        //   document.removeEventListener("keyup", this.nextItem)
        // },
        watch: {
            'input.institution.query': _.debounce(function(oldVal, newVal){
                console.log("query changed", oldVal, newVal)
                this.getInstitutions()
            }, 100),

            'input.journal.query': _.debounce(function(oldVal, newVal){
                console.log("query changed", oldVal, newVal)
                this.getJOurnals()
            }, 100),



            // "$route"(to, from){
            //     console.log("route change", to, from)
            //     this.doQuery()
            // }
        }
    }
</script>

<style scoped lang="scss">


    .wizard-step {
        .md-radio {
            display: flex;
            font-size: 30px;
            margin-top: 30px;
            margin-bottom: 30px;
        }
    }

    .wizard-input {
        font-size: 30px;
        padding: 10px;
        border-radius: 5px;
        border: 3px solid #ccc;
        width: 100%;
    }

    .results {
        .result {
            padding: 20px 10px;
            cursor: pointer;
            &:hover {
                background: #eee;
            }
            .focused {
                background: #eee;
            }
            .name {
                font-size: 18px;
            }
            .tags {
                margin: 10px 0;
                .tag {
                    padding: 10px 20px;
                    margin-right: 10px;
                    background: darkgoldenrod;
                    color: white;
                    border-radius: 5px;
                }
            }
        }

    }

    .step-controls {
        margin-top: 30px;
        padding-top: 30px;
        border-top: 1px solid #ddd;
    }


</style>















