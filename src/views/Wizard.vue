<template>
    <div class="page wizard">






        <!-- STEP 0, INTRODUCTION-->
        <div class="wizard-step wizard-step-0" v-if="currentStep===0">
            <h1>Welcome to the journal selection wizard</h1>
            <div class="content">
                This wizard will help you pick a journal for your paper that fits with your funder mandate. It takes one or two minutes to complete.
            </div>

        </div>


        <!-- STEP 1, CORRESPONDING AUTHOR-->
        <div class="wizard-step wizard-step-1" v-if="currentStep===1">
            <h1>
                Are you the corresponding author for this paper?
            </h1>
            <div class="content">

            </div>

        </div>


        <!-- STEP 2, INSTITUTIONS -->
        <div class="wizard-step wizard-step-2" v-if="currentStep===2">
            <h1>
                What's your institutional affiliation?
            </h1>
            <div class="content">

            </div>

        </div>

        <!-- STEP 3, FUNDER -->
        <div class="wizard-step wizard-step-3" v-if="currentStep===3">
            <h1>
                Who is funding this researchg?
            </h1>
            <div class="content">

            </div>

        </div>

        <!-- STEP 4, JOURNAL -->
        <div class="wizard-step wizard-step-3" v-if="currentStep===4">
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
            currentStep: 0,
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















