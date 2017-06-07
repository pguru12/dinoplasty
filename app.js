const app = {
    max: 0,
    init: function(formSelector){
        this.max=0
        this.list = document.querySelector(selectors.listSelector)
        document
        .querySelector(selectors.formSelector)
        .addEventListener('submit', this.addDino.bind)
    },

    addDino(ev){
        //console.log('submitted!')
        ev.preventDefault()

        const dino = {
            id: this.max+1,
            name: ev.target.dinoName.value,
        }
      //  console.log(dino.name, dino.id)
      console.log(this.renderListItem(dino))

        ++ this.max
    },

    renderListItem(dino){
        const item=document.createElement('li')
        item.textContent=dino.name
        return item
    }
}

app.init({
    formSelector: '#dino-form'
})