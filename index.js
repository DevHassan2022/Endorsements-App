// javascript
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, push, ref, onValue } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

const inputFieldEl = document.getElementById('input-field')
const publishBtnEl = document.getElementById('publish-button')
const endorsementsContainerEl = document.getElementById('endorsements-container')
const fromFieldEl = document.getElementById('from-field') 
const toFieldEl = document.getElementById('to-field')


const appSettings = {
    databaseURL : 'https://realtime-database-8acdf-default-rtdb.firebaseio.com/'
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, 'endorsements')

publishBtnEl.addEventListener('click', () => {
    let inputValue = inputFieldEl.value
    let toValue = toFieldEl.value 
    let fromValue = fromFieldEl.value
    if(inputValue && toValue && fromValue) {
    push(   endorsementsInDB, 
    
            {
                to: toValue,
                from: fromValue,
                endorsement: inputValue
                
            }
        )
    } 
        
    clearInputFieldsEl()
})

let clearInputFieldsEl = () => {
    toFieldEl.value = ''
    fromFieldEl.value = ''
    inputFieldEl.value = ''
}

onValue(endorsementsInDB, snapshot => {
    let endorsementsArray = Object.entries(snapshot.val())
    
    clearEndorsementsContainerEl()
    
    for(let i=0; i< endorsementsArray.length; i++) {
      let currentEndorsement = endorsementsArray[i]
      
      renderEndorsements(currentEndorsement)    
    }
})

let clearEndorsementsContainerEl =  () => {
    endorsementsContainerEl.innerHTML = ''
}


let renderEndorsements = endorsement => {
    let fromText = endorsement[1].from
    let toText = endorsement[1].to
    let endorsementText = endorsement[1].endorsement
    
   let endorsementsEl = document.createElement('div')
   endorsementsEl.classList.add('endorsement')
   endorsementsContainerEl.append(endorsementsEl) 
   
   let toTextEl = document.createElement('h4')
   toTextEl.textContent = `To ${toText}`
   endorsementsEl.append(toTextEl)
   
   let endorsementsTextEl = document.createElement('p')
   endorsementsTextEl.textContent = endorsementText
   endorsementsEl.append(endorsementsTextEl)
   
   let fromContainerEl = document.createElement('div')
   fromContainerEl.classList.add('space')
   
   let fromTextEl = document.createElement('h4')
   fromTextEl.innerHTML = `From ${fromText}`
   
   let counter = 0
   let isLiked =  true
   
   let heartEl = document.createElement('p')
   heartEl.textContent = `🖤 ${counter}`
   heartEl.classList.add('heart')
   
   heartEl.addEventListener('click', ()=> {
        isLiked = !isLiked
        
        if(isLiked && counter >= 0) {
           counter++
           heartEl.textContent = `🖤 ${counter}`
          
       } else if(!isLiked && counter > 0) {
           counter--
           heartEl.textContent = `🖤 ${counter}`
         
       }
   
   }
       )
  
   fromContainerEl.append(fromTextEl)
   fromContainerEl.append(heartEl)
   endorsementsEl.append(fromContainerEl)
   
}
