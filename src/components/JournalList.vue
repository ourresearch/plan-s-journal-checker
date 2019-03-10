<template>
    <div class="journal-search">
        <div class="top">
            <div class="main-col">
                <h1>{{journalData.name}}</h1>
            </div>
            <div class="tools-col">

            </div>
        </div>

        <div>
            <h2>similar journals</h2>
            <div class="similar" v-for="myJournal in journal.similar_journals">
                <journal-row :journal="myJournal" @zoom="zoomOnJournal"></journal-row>

            </div>

        </div>


        <pre>{{journal}}</pre>

    </div>
</template>

<script>
    import axios from 'axios'
    import {store} from '../store.js'

    export default {
        name: 'JournalList',
        props: ["journals"],
        components: {
            store
        },
        data() {
            return {
            };
        },
        methods: {
        },
        watch: {}
    }
</script>


<style lang="scss">

</style>
