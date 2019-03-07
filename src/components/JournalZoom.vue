<template>
    <div class="journal-zoom">
        <div class="top">
            <h1>{{journalData.name}}</h1>
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
    // import axios from 'axios'

    export default {
        name: 'JournalZoom',
        components: {},
        props: ['journal'],
        data() {
            return {
            };
        },
        methods: {},
        watch: {}
    }
</script>


<style lang="scss">

</style>
