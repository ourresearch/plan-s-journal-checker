<template>
  <div class="page home">
    <div class="content">
      <h2>
          Find a journal that meets your
          Plan S funder mandate.
      </h2>
      <div class="more">


        <autocomplete-journal></autocomplete-journal>

        <autocomplete-institution></autocomplete-institution>


        <div class="buttons">
          <md-button class="md-raised md-button md-primary" @click="runSearch">
            Find journal
          </md-button>

        </div>

        <p>
          Many research funders have joined <a href="https://www.coalition-s.org/">Plan S,</a> an ambitious effort to make full and immediate open access to  research a reality. Plan S funders require publications they fund to be published in compliant Open Access journals or platforms.
        </p>
        <p>
          This website helps you verify that the journals you publish in meet your Plan S funder requirements. You can learn more about Plan S, and why it's so important, on
            <a href="https://www.coalition-s.org/why-plan-s/">this website.</a>
        </p>
      </div>
    </div>



  </div>
</template>

<script>
    import axios from 'axios'
    import AutocompleteJournal from '../components/AutocompleteJournal'
    import AutocompleteInstitution from '../components/AutocompleteInstitution'
    import {store} from '../components/store.js'

    export default {
        name: 'Home',
        data: () => ({
            storeState: store.state
        }),
        components: {
            axios,
            AutocompleteJournal,
            AutocompleteInstitution
        },
        metaInfo: {
            title: 'Home'
        },
        computed: {

        },
        methods: {
            runSearch(){
                console.log("running search!", store.state)
            }
        },
        mounted() {
        }
    }
</script>


<style scoped lang="scss">

  .page.home {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vm;
    .content {
      max-width: 600px;
        h2 {
            font-size: 40px;
        }
      .buttons {
        margin-bottom: 30px;
      }
      p {
        font-size: 18px;
      }
    }

  }




</style>
