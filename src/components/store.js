

export const store = {
    state: {
        journal: {},
        topic: "",
        institution: {},
        funder: {}

        // institutions: [],
        // funders: []

    },
    setJournal(journalObj) {
        this.state.journal = journalObj
    },
    setInstitution(institution) {
        this.state.institution = institution
    },
    setFunder(funder) {
        this.state.setFunder = funder
    },
    getQueryObj(){
        let ret = {}

        if (this.state.journal){
            ret.journal = this.state.journal.id
        }
        else if (this.state.topic) {
            ret.topic = this.state.topic
        }

        // if (this.state.institutions.length){
        //     ret.institutions = this.state.institutions.map(x => {
        //         return x.id
        //     }).join(",")
        // }
        //
        // if (this.state.funders.length){
        //     ret.funders = this.state.funders.map(x => {
        //         return x.id
        //     }).join(",")
        // }

        return ret

    },
    addInstitution(institutionObj){
        this.state.institutions.push(institutionObj)
    },
    addFunder(funderObj){
        this.state.funders.push(funderObj)
    },
    setFocus(focus){
        this.state.focus = focus
    },
    reset(){
        this.state.journal = {}
        this.state.topic = ""
        this.state.institutions = []
        this.state.funders = []
        this.focus = null
    }
};

