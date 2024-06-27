// elementos

const notesContainer = document.querySelector("#notes-container");
const noteInput = document.querySelector("#note-content")
const addNoteBtn = document.querySelector(".add-note");

//funçoes

function showNotes(){
    cleanNotes();


    getNotes().forEach((note) => {
        const noteElemente = createNote(note.id, note.content, note.fixed);

        notesContainer.appendChild(noteElemente)
    });
}

function cleanNotes(){
    notesContainer.replaceChildren([])
}

function addNote(){
    const notes = getNotes();



    const noteObject = {
        id:gerarId(),
        content: noteInput.value,
        fixed: false,
    };

    

    const noteElemente = createNote(noteObject.id, noteObject.content);

    notesContainer.appendChild(noteElemente)

    notes.push(noteObject);


    saveNotes(notes);

    noteInput.value = "";
}



function gerarId(){
    return Math.floor(Math.random() * 5000);
}

function createNote(id, content, fixed){
    const element = document.createElement("div")

    element.classList.add("note")
    const textatea = document.createElement("textarea")
    textatea.value = content
    textatea.placeholder = "Adicione algum texto..."
    element.appendChild(textatea)

    const pinIcon = document.createElement("i")

    pinIcon.classList.add(...["bi", "bi-pin"])
    element.appendChild(pinIcon);

    const deleteIcon = document.createElement("i")

    deleteIcon.classList.add(...["bi", "bi-x-lg"])
    element.appendChild(deleteIcon);

    const duplicateIcon = document.createElement("i")

    duplicateIcon.classList.add(...["bi", "bi-file-earmark-plus"])
    element.appendChild(duplicateIcon);
    
    const checkIcon = document.createElement("i")

    checkIcon.classList.add(...["bi", "bi-check-square"])
    element.appendChild(checkIcon);

    if(fixed){
        element.classList.add("fixed")
    }

    element.querySelector(".bi-pin").addEventListener("click",()=>{
        toggleFixNote(id);
    });

    element.querySelector(".bi-x-lg").addEventListener("click", ()=>{
        deleteNote(id, element)
    });

    element.querySelector(".bi-file-earmark-plus").addEventListener("click", ()=>{
        copyNote(id)
        
    });

    element.querySelector(".bi-check-square").addEventListener("click", ()=>{

        
        checkNote(element)
        
    });

    

    return element
}

function toggleFixNote(id){

    const notes = getNotes()


    const targetNotes = notes.filter((note)=>
        note.id === id)[0];

    targetNotes.fixed = !targetNotes.fixed;

    saveNotes(notes)

    showNotes()

    
}

function deleteNote(id, element){
    const notes = getNotes().filter((note) => note.id !== id)
    saveNotes(notes);

    notesContainer.removeChild(element);
}

function copyNote(id) {
    const notes = getNotes()

    const targetNotes = notes.filter((note) => note.id === id)[0];

    const noteObject = {
        id: gerarId(),
        content: targetNotes.content,
        fixed:false,
    }

    const noteElement = createNote(
        noteObject.id,
        noteObject.content,
        noteObject.fixed
    );


    notesContainer.appendChild(noteElement);

    notes.push(noteObject);

    saveNotes(notes)


}

function checkNote (element){

    const currentColor = element.style.backgroundColor;

    if(currentColor === "rgb(65, 180, 65)"){
        element.style.backgroundColor = ""
    }else{
        element.style.backgroundColor = "#41b441"
    }
    
    
};


function getNotes(){
    const notes = JSON.parse(localStorage.getItem("notes")) || "[]";

    const orderNotes = notes.sort((a,b)=>(a.fixed > b.fixed ? -1 : 1));

    return orderNotes
};

function saveNotes (notes){
    localStorage.setItem("notes", JSON.stringify(notes))
}

//eventos
addNoteBtn.addEventListener("click",()=> addNote());

showNotes();