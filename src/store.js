import axios from 'axios'

export const store = {


    baseEndpoint: "https://rickscafe-api.herokuapp.com/",
    endpoints: {
        topic: "topic/",
        text: "search/journals/",
        journal: "journal/",
        institution: "institution/",
        funder: "funder/",
    },

    state: {
        institution: null,
        funder: null,
        topic: null,
        text: null,
        journal: null,
    },

    showJournalZoom: false,
    server: {
        institution: {},
        funder: {},
        journalList: {},
        journalZoom: {},
        journalInputContent: ""

    },


    getAsQueryObj(){
        let query = {}
        Object.entries(this.state)
            .forEach(x => {
                let k = x[0]
                let v = x[1]

                if (v){
                    query[k] = v
                }
            })

        return query
    },


    getHasQuery(){
        return (this.state.topic || this.state.journal)
    },



    // setters
    // **************************************
    // **************************************


    setJournal(id){
      this.setState("journal", id)
    },
    setTopic(id){
      this.setState("topic", id)
    },
    setText(id){
      this.setState("text", id)
    },
    setFunder(id){
      this.setState("funder", id)
    },
    setInstitution(id){
      this.setState("institution", id)
    },

    setState(k, v){
        // setting a topic or text search effects other stuff too
        if (v && k === "topic") {
            this.state.text = null
            this.state.journal = null
            this.server.journalInputContent = v
        }
        else if (v && k === "text") {
            this.state.topic = null
            this.state.journal = null
            this.server.journalInputContent = v
        }

        this.state[k] = v
        this.setJournalInputContent()
    },

    setFromQueryObj(obj){
        console.log("setting from query", obj)
        let that = this // dunno if this is needed, no time to test
        Object.entries(this.state).forEach(x => {
            let k = x[0]
            let newVal = obj[k]
            if (typeof newVal === "undefined") {
                newVal = null
            }
            that.state[k] = newVal
            that.setState(k, newVal)
        })
    },

    setJournalInputContent(){
        if (this.state.topic){
            this.server.journalInputContent = this.state.topic
        }
        else if (this.state.text){
            this.server.journalInputContent = this.state.text
        }
        else if (this.server.journalZoom){
            this.server.journalInputContent = this.server.journalZoom.name
        }
    },









    // fetchers
    // **************************************
    // **************************************

    fetchAll(){
        return Promise.all([
            this.fetchInstitution(),
            this.fetchFunder(),
            this.fetchJournalList(),
            this.fetchJournalZoom()
        ])
    },


    fetchInstitution() {
        if (!this.state.institution){
            this.server.institution = {}
            return Promise.resolve(true)
        }
        let url = this.baseEndpoint + this.endpoints.institution + this.state.institution

        let request = axios.get(url)
            .then(response => {
                this.server.institution = response.data
            })
            .catch(e => {
                this.server.institution = {}
            })

        return request
    },
    fetchFunder() {
        if (!this.state.funder){
            this.server.funder = {}
            return Promise.resolve(true)
        }
        let url = this.baseEndpoint + this.endpoints.funder  + this.state.funder
        let request = axios.get(url)
            .then(response => {
                this.server.funder = response.data
            })
            .catch(e => {
                this.server.funder = {}
            })
        return request
    },

    fetchJournalList(){
        let url = this.getSearchApiUrl()

        console.log("store.getJournalList() getting this url", url)
        let request = axios.get(url)
            .then(response => {
                console.log("store.getJournalList() got response: ", response.data)
                this.server.journalList = response.data
            })
            .catch(e => {
                this.server.journalList = {}
            })
        return request
    },

    getSearchApiUrl(){
        let url = this.baseEndpoint
        if (this.state.journal){
            url += this.endpoints["journal"] + this.state.journal
        }
        else if (this.state.topic) {
            url += this.endpoints.topic + this.state.topic
        }
        else if (this.state.text) {
            url += this.endpoints.text + this.state.text
        }

        url += "?institution=" + this.state.institution
        url += "&funder=" + this.state.funder

        return url
    },

    fetchJournalZoom() {
        if (!this.state.journal){
            this.server.journalZoom = {}
            this.setJournalInputContent()
            return Promise.resolve(true)
        }

        let url = this.getSearchApiUrl()

        let request = axios.get(url)
            .then(response => {
                console.log("store.getJournalZoom() got response: ", response.data)
                this.server.journalZoom = response.data
                this.setJournalInputContent()
            })
            .catch(e => {
                console.log("store.getJournalZoom() had an error", e)
                this.server.journalZoom = {}
            })
        return request
    },


    // utility functions
    // **************************************
    // **************************************

    stringToColour(str) {
        if (!str){
            return "#666666"
        }

        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        var colour = '#';
        for (var i = 0; i < 3; i++) {
            var value = (hash >> (i * 8)) & 0xFF;
            colour += ('00' + value.toString(16)).substr(-2);
        }
        return colour;
    }



};

