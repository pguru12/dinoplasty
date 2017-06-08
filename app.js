const app = {
    max: 0,
    init(formSelector){
        this.dinos=[]
        this.max=0
        this.list = document.querySelector(formSelector.listSelector)
        document
        .querySelector(formSelector.formSelector)
        .addEventListener('submit', this.addDino.bind(this))
        document
        .querySelector(formSelector.formSelector)
        .addEventListener('button', this.addDino.bind(this))
        document
        .querySelector(formSelector.formSelector)
        .addEventListener('reset', this.addDino.unbind(this))
    },

    addDino(ev){
        //console.log('submitted!')
        ev.preventDefault()
        const dinoName = ev.target.dinoName.value
        const dino = {
            id: this.max+1,
            name: ev.target.dinoName.value,
        }
      //  console.log(dino.name, dino.id)
      const listItem = this.renderListItem(dino)
      this.list.appendChild(listItem)
    //   var button = document.createElement("button")
    //   button.innerHTML="Promote"
    //   var button = document.createElement("button")
    //   button.innerHTML="Remove"

      // todo: Add dino to this.dinos
      this.dinos.push(listItem)

        ++ this.max
    },

    renderListItem(dino){
        const item=document.createElement('li')
        item.textContent=dino.name
        return item
    }
}

app.init({
    formSelector: '#dino-form',
    listSelector: '#dino-list',
})

// function submitHander(ev){
//     ev.preventDefault()
//     const f = 
//     const details=document.querySelector('#lister')
//     const dino = f.dinoName.value

//     // const boldName = document.createElement('strong')
//     // boldName.textContent = name
//    const nameItem = document.createElement('li')
//    nameItem.textContent = `${dino}`

// //    const list = document.createElement('ul')
// //    list.appendChild(nameItem)

//    lists.appendChild(nameItem)
//   // lists.insertBefore(list, nameItem)
//   console.log('I got here')
// }

//dinoName.addEventListener('submit', submitHander)