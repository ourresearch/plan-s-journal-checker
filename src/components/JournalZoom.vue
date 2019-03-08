<template>
    <div class="journal-zoom">
        <div class="top">
            <div class="main-col">
                <h1>{{journal.name}}</h1>
            </div>
            <div class="tools-col">

            </div>
        </div>

        <div>
            <h2>similar journals</h2>
            <div class="similar" v-for="myJournal in journal.similar_journals">
                <journal-row :journal="myJournal"></journal-row>

            </div>

        </div>


        <pre>{{journal}}</pre>

    </div>
</template>

<script>
    import JournalRow from '../components/JournalRow'
    export default {
        name: 'JournalZoom',
        components: {
            JournalRow
        },
        props: ["journal"],
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
