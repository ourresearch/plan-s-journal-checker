<template>
    <div class="header-container">
        <div class="header-top-row">
            <div class="left">
                <h1>
                    <router-link to="/">
                    Publia
                    </router-link>
                </h1>
                <autocomplete-journal></autocomplete-journal>
            </div>
            <div class="spacer"></div>
            <div class="nav">
                <router-link to="./faq">FAQ</router-link>
            </div>
        </div>
        <div class="header-second-row">
            <div class="filter-container">
                <div class="filter-closed" @click="editInstitution">
                    <div class="filter-unset">
                        Institution
                    </div>
                </div>
            </div>
            <div class="filter-container">
                <div class="filter-closed" @click="editFunder">
                    <div class="filter-unset">
                        Funder
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
    import AutocompleteJournal from './AutocompleteJournal.vue'
    import {store} from './store.js'

    export default {
        name: 'MainHeader',
        components: {
            AutocompleteJournal
        },
        data: () => ({
            storeState: store.state
        }),
        computed: {
        },
        methods: {
            editInstitution(){
                console.log("edit institution")
            },
            editFunder(){
                console.log("edit funder")

            }
        }
    }
</script>

<style scoped lang="scss">

    .header-container {
        position: fixed;
        top:0;
        left:0;
        right:0;
        background: #fff;
        .header-top-row {
            display: flex;
            padding: 15px;
            align-items: center;
            border-bottom: 1px solid #ddd;
            .left {
                align-items: center;
                display:flex;
                h1 {
                    margin: 0 10px 0 0;
                    font-weight: 300;
                }

            }
            .spacer {
                flex:1
            }
            .nav {
                margin-right: 10px;
                display: flex;
                a {
                    font-size: 18px;
                    padding: 5px;
                    display: block;
                }
            }

        }

        .header-second-row {
            display: flex;
            padding: 10px 15px;
            border-bottom: 1px solid #ddd;
            .filter-container {
                position: relative;
                .filter-closed {
                    margin-right: 10px;
                    .filter-unset {
                        cursor: pointer;
                        border-radius: 3px;
                        padding: 5px 10px;
                        border: 1px solid #ddd;
                    }
                    .filter-set {
                        cursor: pointer;
                        padding: 5px 10px;
                        background: dodgerblue;
                        color: #fff;
                    }
                }


            }

        }

    }




</style>