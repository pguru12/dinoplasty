class App {
    constructor(formSelector){
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
    }

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
    }

    addDino(dino){
        const listItem = this.renderListItem(dino)
        const listItem2 = this.renderListItem(dino)
        const listItem3 = this.renderListItem(dino)
        if (dino.periodName==='Cretaceous'){
            this.list.insertBefore(listItem, this.list.firstChild)

            this.dinos.unshift(dino)
            this.save()

            if (dino.id>this.max){
                this.max=dino.id;
            }
        }
        else if (dino.periodName==='Jurassic'){
            this.list.insertBefore(listItem2, this.list.firstChild)

            this.dinos.unshift(dino)
            this.save()

            if (dino.id>this.max){
                this.max=dino.id;
            }
        }
        else{
            this.list.insertBefore(listItem3, this.list.firstChild)

            this.dinos.unshift(dino)
            this.save()

            if (dino.id>this.max){
                this.max=dino.id;
            }
        }
    }
    save(){
        localStorage.setItem('dinos',JSON.stringify(this.dinos))
    }
    // addDiet(diet){
    //     const listItem = this.renderListItem(diet)
    //     this.list.insertBefore(listItem, this.list.firstChild)

    //     this.dinos.unshift(diet)
    //     this.save()

    //     //++ this.max
    // },
    // save(){
    //     localStorage.setItem('dinos',JSON.stringify(this.dinos))
    // }
    addDinoFromForm(ev){
        console.log('submitted!')
        ev.preventDefault()
        const dinoName = ev.target.dinoName.value
        const dietName = ev.target.dietName.value
        const periodName = ev.target.periodName.value
        const dino = {
            id: this.max+1,
            name: ev.target.dinoName.value,
            diet: ev.target.dietName.value,
            period: ev.target.periodName.value,
        }
        console.log(dino.name, dino.id)
        ev.target.reset()
        this.addDino(dino)
    }

    renderListItem(dino){
        const item=this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id=dino.id
        item
        .querySelector('.dino-name')
        .textContent=`Name: ${dino.name}`
        item
        .addEventListener('keypress', this.saveOnEnter.bind(this))
        item
        .querySelector('.diet-name')
        .textContent=`Diet: ${dino.diet}`
        item
        .querySelector('.period-name')
        .textContent=`Period: ${dino.period}`
        console.log('submitted')
        item
            .querySelector('button.remove')
            .addEventListener('click', this.removeDino.bind(this))
        item
            .querySelector('button.fav')
            .addEventListener('click', this.favDino.bind(this, dino))
        item
            .querySelector('button.move-up')
            .addEventListener('click', this.moveUp.bind(this, dino))
        item
            .querySelector('button.move-down')
            .addEventListener('click', this.moveUp.bind(this, dino))
        item
            .querySelector('button.edit')
            .addEventListener('click', this.editDino.bind(this, dino))

        return item
        //item.textContent=dino.name
    }
    saveOnEnter(dino, ev){
        if (ev.key==='Enter'){
            this.editDino(dino, ev)
        }else {
            console.log('nope')
        }
    }

    editDino(dino, ev){
        //console.log(dino)
        const listItem = ev.target.closest('.dino')
        const nameField = listItem.querySelector('.dino-name')
        const dietField = listItem.querySelector('.dino-diet')
        const periodField = listItem.querySelector('.dino-period')
        
        console.log(ev.target)
        const btn = listItem.querySelector('.dino-name')
        const icon = btn.querySelector('i.fa')

        if (nameField.isContentEditable){
            nameField.contentEditable = false
            dietField.contentEditable = false
            periodField.contentEditable = false
            icon.classList.remove('fa-pencil')
            icon.classList.add('fa-check')
            icon.classList.remove('success')

            dino.name=nameField.textContent
            this.save()
        }
        else {
            nameField.contentEditable = true
            dietField.contentEditable = true
            periodField.contentEditable = true
            nameField.focus()
            icon.classList.remove('fa-pencil')
            icon.classList.add('fa-check')
            icon.classList.add('success')
        }
    }

    favDino(dino, ev){
       // console.log(arguments)
        //console.log('Fav')
        const listItem = ev.target.closest('.dino')
        dino.fav=!dino.fav

        if (dino.fav){
            listItem.classList.add('fav')
        } else {
            listItem.classList.remove('fav')
        }
        this.save()
    }

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
    }

    moveUp(dino, ev){
        const listItem = ev.target.closest('.dino')

        const index = this.dinos.findIndex((currentDino, i)=>{
            return currentDino.id === dino.id
        })
        if (index>0){
            this.list.insertBefore(listItem, listItem.previousSibling)

            const previousDino = this.dinos[index - 1]
            this.dinos[index - 1] = dino
            this.dinos[index] = previous
            this.save()
        }

    }
    moveDown(dino, ev){
        const listItem = ev.target.closest('.dino')

        const index = this.dinos.findIndex((currentDino, i)=>{
            return currentDino.id === dino.id
        })
        if (index<this.dinos.length-1){
            this.list.insertBefore(listItem.nextElementSibling, listItem)
            const nextDino=this.dinos[index+1]
            this.dinos[index+1]=dino
            this.dinos[index]=nextDino
            this.save()
        }
    }
}
new App({
    formSelector: '#dino-form',
    listSelector: '#dino-list',
    templateSelector: '.dino.template',
})

