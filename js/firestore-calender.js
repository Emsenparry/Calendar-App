import { db, getData } from "./firestore.config.js";
import { collection, addDoc, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js'

const data = await getData('addCalender')

const calenderContainer = document.querySelector('section')

calenderContainer.addEventListener('click', async evt => {
    evt.preventDefault()

    await addDoc(collection(db, 'addCalender'),
    {
        title: calenderContainer.title.value
    }
    
    ).catch(err => console.log({err}))
})