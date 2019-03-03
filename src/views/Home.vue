<template>
  <div class="home">
    <div class="content">

      <h2 class="hero">
          Find a journal that meets your
          Plan S funder mandate.
      </h2>

      <div class="searchbar">
        <div class="inputs">
          <div class="journal input-column">
            <h2>Journal or topic</h2>
            <input-journal></input-journal>
          </div>

          <div class="sep"></div>

          <div class="institution input-column">
            <h2>Your institution</h2>
            <input-institution></input-institution>
          </div>

          <div class="sep"></div>

          <div class="funder input-column">
            <h2>Your funder</h2>
            <input-funder></input-funder>
          </div>

        </div>
        <div id="search-button" @click="runSearch">

          <i class="fas fa-search"></i>
          <span>Find journals</span>
        </div>

      </div>
    </div>



  </div>
</template>

<script>
    import axios from 'axios'
    import InputJournal from '../components/InputJournal'
    import InputInstitution from '../components/InputInstitution'
    import InputFunder from '../components/InputFunder'
    import {store} from '../components/store.js'

    export default {
        name: 'Home',
        data: () => ({
            storeState: store.state
        }),
        components: {
            axios,
            InputJournal,
            InputInstitution,
            InputFunder
        },
        metaInfo: {
            title: 'Home'
        },
        computed: {

        },
        methods: {
            runSearch(){
                let routeObj = {
                    path: "search",
                    query: store.getQueryObj()
                }
                this.$router.push(routeObj)
            },
            inputFocus(input){

            }
        },
        mounted() {
            store.reset()
            store.setFocus("journal")
            setTimeout(function(){document.getElementById("journal-input").focus()}, 1000)
        },
        watch: {
            storeState: function(newState, oldState){
                console.log("change in store state", newState)
            }
        }
    }
</script>


<style lang="scss">

  .home {
    background: url("../assets/books.jpg") no-repeat;
    background-color: #fff;
    background-size: cover;
    background-position: 50% 50%;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
    .content {
      width: 781px;
      margin-top: 10vh;
        background: #fff;
        padding: 40px 40px;
        border-radius: 10px;
        box-shadow: 0 12px 95px 25px rgba(0, 0, 0, .4);
      h2.hero {
        font-size: 40px;
        line-height: 1.3;
        margin-bottom: 0;
        background: #fff;
          padding: 0 0 20px;
          margin: 0;
      }

      .searchbar {
        /*display: flex;*/
        /*.sep {*/
          /*width: 100%;*/
          /*border-bottom: 1px solid #ddd;*/
        /*}*/

        .inputs {
          /*border-radius: 5px;*/
          background: #fff;

          .input-column {
              border: 1px solid #ddd;

            h2 {
              font-size: 14px;
              text-transform: uppercase;
              margin: 15px 15px 10px;
            }
            .autosuggest-container {
              position: relative;

              input {
                outline: none;
                /*position: relative;*/
                /*display: block;*/
                width: 100%;
                border: 1px solid #fefefe;
                font-size: 22px;
                /*padding: 0 0 15px 15px;*/
                /*margin: 15px;*/
                padding: 0 15px;
                margin-bottom: 15px;
                box-sizing: border-box;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;

                &.autosuggest__input-open {
                  /*border: 1px solid #999;*/
                  /*border-bottom: none;*/
                }
              }
              .autosuggest__results {
                position: absolute;
                border: 1px solid #ddd;
                width: 700px;
                background: #fff;
                z-index: 999;
                border-radius: 0 0 10px 10px;
                box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, .2);

                ul {
                  list-style: none;
                  padding-left: 0;
                  margin: 0;

                  .autosuggest__results_item {
                    cursor: pointer;
                    padding: 20px;
                    font-size: 18px;
                  }

                  .autosuggest__results_title {
                    display: none;
                  }

                  .autosuggest__results_item:active,
                  .autosuggest__results_item:hover,
                  .autosuggest__results_item:focus,
                  .autosuggest__results_item.autosuggest__results_item-highlighted {
                      background-color: #eee;
                  }

                }
              }

            }

          }
        }


        #search-button {
          background: dodgerblue;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          margin-top: 20px;
          height: 50px;
          color: #fff;
          font-size: 16px;
          text-transform: uppercase;
          font-weight: bold;
          cursor: pointer;
          i {
            color: #fff;
            margin-right: 15px;
          }
        }
      }



    }

  }




</style>
