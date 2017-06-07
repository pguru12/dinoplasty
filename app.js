const app = {
    init: function(formSelector){
        document
        .querySelector(formSelector)
        .addEventListener('submit', )
    },

    addDino(ev){
        //console.log('submitted!')
        ev.preventDefault()
        const dinoName=ev.target.dinoName.value
        console.log(dinoName)
    },
}

app.init('#dino-form')