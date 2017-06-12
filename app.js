const app = {
    max: 0,
    init(formSelector){
        this.dinos=[]
        this.max=0
        this.list = document.querySelector(formSelector.listSelector)
       this.template= document.querySelector(formSelector.templateSelector)
       document
        .querySelector(formSelector.formSelector)
        .addEventListener('submit', this.addDinoFromForm.bind(this))
    //    .addEventListener('button', this.addDinoFromForm.bind(this))

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
        console.log(dinoJSON)
        //convert the JSON back into an array
        const dinoArray=JSON.parse(dinoJSON)

        //set this.dinos with the dinos from that array
        if (dinoArray){
            dinoArray
            .reverse()
            .map(this.addDino.bind(this))
        }
    },

    addDino(dino){
        const listItem = this.renderListItem(dino)
        this.list.insertBefore(listItem, this.list.firstChild)

        this.dinos.unshift(dino)
        this.save()

        ++ this.max
    },
    save(){
        localStorage.setItem('dinos',JSON.stringify(this.dinos))
    },
    addDiet(diet){
        const listItem = this.renderListItem(diet)
        this.list.insertBefore(listItem, this.list.firstChild)

        this.dinos.unshift(diet)
        this.save()

        //++ this.max
    },
    save(){
        localStorage.setItem('dinos',JSON.stringify(this.dinos))
    },

    addDinoFromForm(ev){
        console.log('submitted!')
        ev.preventDefault()
        const dinoName = ev.target.dinoName.value
        const dietName = ev.target.dietName.value
        const dino = {
            id: this.max+1,
            name: ev.target.dinoName.value,
            diet: ev.target.dietName.value,
        }
        console.log(dino.name, dino.id)
        ev.target.reset()
        this.addDino(dino)
    },

    renderListItem(dino){
        const item=this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id=dino.id
        item
        .querySelector('.dino-name')
        .textContent=dino.name
        item
        .querySelector('.diet-name')
        .textContent=`(${dino.diet})`
        console.log('submitted')
        item
            .querySelector('button.remove')
            .addEventListener('click', this.removeDino.bind(this))

        return item
        //item.textContent=dino.name
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
            console.log(this.dinos[i].id)
        }

        this.save()
        //this.dinos.splice(?, 1)
        console.log('remove!')
    },
}

app.init({
    formSelector: '#dino-form',
    listSelector: '#dino-list',
    templateSelector: '.dino.template',
})