const app = {
    max: 0,
    init: function(formSelector){
        this.max=0
        document
        .querySelector(formSelector)
        .addEventListener('submit', this.addDino.bind)
    },

    addDino(ev){
        //console.log('submitted!')
        ev.preventDefault()

        const dino = {
            id: this.max+1,
            name: ev.target.dinoName.value,
        }
        console.log(dino.name, dino.id)
        ++ this.max
    },
}

app.init('#dino-form')