

export const store = {
    state: {
        journal: null,
        topic: "",
        institution: null,
        funder: null

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
    getQueryString(){
      let str = "";

      if (this.state.journal) {
          str += ("?journal=" + this.state.journal.name)
      }

      if (this.state.institution) {
          str += ("?institution=" + this.state.institution.id)
      }
      if (this.state.funder) {
          str += ("?funder=" + this.state.funder.id)
      }

      return str


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

