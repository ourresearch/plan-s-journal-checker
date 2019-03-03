

export const store = {
    state: {
        journal: {},
        topic: "",
        institutions: [],
        funders: []

    },
    setJournal(journalObj) {
        this.state.journal = journalObj
    },
    addInstitution(institutionObj){
        this.state.institutions.push(institutionObj)
    },
    addFunder(funderObj){
        this.state.funders.push(funderObj)
    },
    getQueryObj(){
        let ret = {}

        if (this.state.journal){
            ret.journal = this.state.journal.id
        }
        else if (this.state.topic) {
            ret.topic = this.state.topic
        }

        if (this.state.institutions.length){
            ret.institutions = this.state.institutions.map(x => {
                return x.id
            }).join(",")
        }

        if (this.state.funders.length){
            ret.funders = this.state.funders.map(x => {
                return x.id
            }).join(",")
        }

        return ret

    },
    reset(){
        this.state.journal = {}
        this.state.topic = ""
        this.state.institutions = []
        this.state.funders = []
    }
};

