const app = {
    init: function(formSelector){
        document
        .querySelector(formSelector)
        .addEventListener('submit', )
    },

    addDino(ev){
        //console.log('submitted!')
        ev.preventDefault()
        const dino = {
            name: ev.target.dinoName.value,
        }
        console.log(dino.name)
    },
}

app.init('#dino-form')