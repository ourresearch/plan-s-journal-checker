<template>
    <div class="page wizard">



        <div class="wizard-step-wrapper" v-for="(myWizardStep, myWizardStepIndex) in wizardSteps">



            <!-- STEP 0, INTRODUCTION-->
            <div class="wizard-step wizard-step-0" v-if="myWizardStepIndex===0 && myWizardStep.isActive">
                <h1>Welcome to the journal selection wizard</h1>
                <div class="content">
                    This wizard will help you pick a journal for your paper that fits with your funder mandate. It takes one or two minutes to complete.
                </div>

            </div>


            <!-- STEP 1, CORRESPONDING AUTHOR-->
            <div class="wizard-step wizard-step-1" v-if="myWizardStepIndex===1 && myWizardStep.isActive">
                <h1>
                    Are you the corresponding author for this paper?
                </h1>
                <div class="content">

                </div>

            </div>


            <!-- STEP 2, INSTITUTIONS -->
            <div class="wizard-step wizard-step-2" v-if="myWizardStepIndex===2 && myWizardStep.isActive">
                <h1>
                    What's your institutional affiliation?
                </h1>
                <div class="content">

                </div>

            </div>

            <!-- STEP 3, FUNDER -->
            <div class="wizard-step wizard-step-3" v-if="myWizardStepIndex===3 && myWizardStep.isActive">
                <h1>
                    Who is funding this researchg?
                </h1>
                <div class="content">

                </div>

            </div>

            <!-- STEP 4, JOURNAL -->
            <div class="wizard-step wizard-step-3" v-if="myWizardStepIndex===4 && myWizardStep.isActive">
                <h1>
                    What journal do you want to publish in?
                </h1>
                <div class="content">
                    <div class="input">
                        <input type="text" id="querybox" v-model="query">
                    </div>

                    <div class="results">
                        <div class="result" v-for="result in results">
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

        <md-button @click="stepWizardBackward()">go back</md-button>
        <md-button @click="stepWizardForward()" class="md-raised md-primary">next</md-button>




    </div>


</template>

<script>
    import axios from 'axios'
    import _ from 'lodash'


    export default {
        name: "Wizard",
        data: () => ({
            query: null,
            loading: true,
            results: [],
            apiUrl: "http://api.rickscafe.io/search/journals/title/",
            wizardSteps: [
                {
                    isActive: true,
                    name: "intro",
                    displayName: "Intro",
                    displayStep: false,
                    index: 0
                },
                {
                    isActive: false,
                    name: "correspondingAuthor",
                    displayName: "Corresponding Author",
                    displayStep: 1,
                    userInput: {},
                    index: 1
                },
                {
                    isActive: false,
                    name: "institution",
                    displayName: "Institutional Affiliation",
                    displayStep: 2,
                    userInput: {},
                    index: 2
                },
                {
                    isActive: false,
                    name: "funder",
                    displayName: "Funder",
                    displayStep: 3,
                    userInput: {},
                    index: 3
                },
                {
                    isActive: false,
                    name: "journal",
                    displayName: "Journal",
                    displayStep: 4,
                    userInput: {},
                    index: 4
                }
            ]

        }),
        computed: {
            activeStep(){
                return this.wizardSteps.find(function(step){
                    return !!step.isActive
                })
            },
            activeStepIndex(){
                return this.wizardSteps.findIndex(function(step){
                    return !!step.isActive
                })
            },
            nextStep(){
                let nextStepIndex = this.activeStepIndex + 1
                if (nextStepIndex > this.wizardSteps.length) {
                    return undefined
                }
                else {
                    return this.wizardSteps[nextStepIndex]
                }
            },
            previousStep(){
                let prevStepIndex = this.activeStep - 1
                if (prevStepIndex < 0) {
                    return undefined
                }
                else {
                    return this.wizardSteps[prevStepIndex]
                }
            }
        },
        methods: {
            stepWizardForward(){
                let activeStep =  this.wizardSteps.find(function(step){
                    return !!step.isActive
                })
                let nextStepIndex = activeStep.index + 1
                if (nextStepIndex >= this.wizardSteps.length) {
                    console.log("we're done!")
                }
                else {
                    activeStep.isActive = false
                    this.wizardSteps[nextStepIndex].isActive = true
                }


            },
            stepWizardBackward(){
                console.log("backward!")
                if (this.previousStep) {
                    this.activeStep.isActive = false
                    this.previousStep.isActive = true
                }
                else {
                    console.log("nothing happening, we're already at the start!")
                }

            },

            getJournals(){
                let that = this

                let getJournalsFromApi = function(){
                    console.log("getting journals")
                    that.loading = true
                    axios.get(that.apiUrl + that.query)
                        .then(resp => {
                            that.results = resp.data.list
                            that.loading = false
                        })
                        .catch(e => {
                            console.log("error from server", e)
                            that.loading = false
                            that.results = []
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
            query: _.debounce(function(oldVal, newVal){
                console.log("query changed", oldVal, newVal)
                this.getJournals()
            }, 100)

            // "$route"(to, from){
            //     console.log("route change", to, from)
            //     this.doQuery()
            // }
        }
    }
</script>

<style scoped lang="scss">

    #querybox {
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
            .name {
                font-size: 24px;
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


</style>















