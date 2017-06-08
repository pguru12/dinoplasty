const app = {
    max: 0,
    init(formSelector){
        this.dinos=[]
        this.max=0
        this.list = document.querySelector(formSelector.listSelector)
       this.template= document.querySelector(formSelector.templateSelector)
       document
        .querySelector(formSelector.formSelector)
        .addEventListener('submit', this.addDino.bind(this))

        document
        .querySelector(formSelector.formSelector)
        // document
        // .querySelector(formSelector.formSelector)
        // .addEventListener('button', this.addDino.bind(this))
        // document
        // .querySelector(formSelector.formSelector)
        // .addEventListener('reset', this.addDino.unbind(this))
        this.load()
    },

    load(){
        //load JSON from localStorage
        const dinoJSON=localStorage.getItem('dinos')

        //convert the JSON back into an array
        const dinoArray=JSON.parse(dinoJSON)

        //set this.dinos with the dinos from that array
        dinoArray
        .reverse()
        .map(this.addDino.bind(this))
    },

    addDino(){
        const listItem = this.renderListItem(dino)
        this.list.insertBefore(listItem, this.list.firstChild)

        this.dinos.unshift(dino)
        localStorage.setItem('dinos',this.dinos)

        ++ this.max
    },

    addDinoFromForm(ev){
        //console.log('submitted!')
        ev.preventDefault()
        const dinoName = ev.target.dinoName.value
        const dino = {
            id: this.max+1,
            name: ev.target.dinoName.value,
        }
      //  console.log(dino.name, dino.id)
        ev.target.reset()
    },

    renderListItem(dino){
        const item=this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id=dino.id
        item
        .querySelector('.dino-name')
        .textContent=dino.name

        item
            .querySelector('button.remove')
            .addEventListener('click', this.removeDino.bind(this))

        return item
        //item.textContent=dino.name
        // var promoteButton = document.createElement("button")
        // promoteButton.innerHTML=" Promote "
        // var deleteButton = document.createElement("button")
        // deleteButton.innerHTML=" Remove "
        // var upButton = document.createElement("button")
        // upButton.innerHTML=" Up "
        // var downButton = document.createElement("button")
        // downButton.innerHTML=" Down "
        // item.appendChild(promoteButton)
        // item.appendChild(deleteButton)
        // item.appendChild(upButton)
        // item.appendChild(downButton)
        // document.querySelector(addEventListener('button', this.addDino.bind(this)))
    },
    removeDino(ev){
        const listItem = ev.target.closest('.dino')
        listItem.remove()

        for (let i = 0; i<this.dinos.length; i++){
            const currentId = this.dinos[i].id.toString()
            if (listItem.dataset.id===currentId){
                this.dinos.splice(i, 1)
                break;
                //console.log('found it')
            }
            //console.log(this.dinos[i].id)
        }

        this.save()
        //this.dinos.splice(?, 1)
        //console.log('remove!')
    },
}

app.init({
    formSelector: '#dino-form',
    listSelector: '#dino-list',
    templateSelector: '.dino.template',
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