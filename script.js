/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
const counter = {
    "blep": 0,
    "burger": 0,
    "cart": 0,
    "dopey": 0,
    "happy": 0,
    "nerd": 0,
    "shy": 0,
    "sleeping": 0,
    "sleepy": 0};

let occupato = {};    


function seleziona(event){
    event.stopPropagation();
    const blocco = event.currentTarget;
    const blocchi = blocco.parentNode.querySelectorAll(".choice-grid div");
    for(const div of blocchi){
        if(div !== blocco){
            uncheck(div);
        } else{
            check(div);
        }
    }

    occupato[blocco.dataset.questionId] = blocco.dataset.choiceId;
    console.log(occupato);
    if(end()){
        displayFinale();
    }
    
}

function check(div){
    div.classList.add("checkedbackground");
    div.classList.remove("uncheckedbackground");
    const checked = div.querySelector(".checkbox");
    checked.src = "images/checked.png";
}

function uncheck(div){
    div.classList.remove("checkedbackground");
    div.classList.add("uncheckedbackground");
    const unchecked = div.querySelector(".checkbox");
    unchecked.src = "images/unchecked.png";
}


function displayFinale(){
    const blocchi = document.querySelectorAll("section div");
    for(const blocco of blocchi){
        blocco.removeEventListener("click", seleziona);
    }
    const risultato = document.querySelector("#risultato");
    risultato.classList.remove("hidden");
    const winner = getWinner();
    console.log(winner);
    const titolo = document.querySelector("#risultato h1");
    titolo.textContent = RESULTS_MAP[winner].title;
    const testo = document.querySelector("#risultato p");
    testo.textContent = RESULTS_MAP[winner].contents;
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}

function getWinner(){
    for(const key in occupato){
        if(Object.hasOwnProperty.call(occupato, key)){
            const scelta = occupato[key];
            counter[scelta] = counter[scelta] + 1;
        }
    }

    let maxvalue = -1;
    let maxkey = null;

    for(const key in counter){
        if(counter[key] > maxvalue){
            maxvalue = counter[key];
            maxkey = key;
        }
    }

    if(maxvalue === 1) return occupato["one"];
    else return maxkey;
}

function end(){
    return Object.keys(occupato).length === 3;
}

function restart(event){
    event.stopPropagation();
    occupato = {};
    for (const key in counter){
        if(Object.hasOwnProperty.call(counter, key)){
            counter[key] = 0;
        }
    }

    const blocchi = document.querySelectorAll("section div");
    for (const blocco of blocchi){
        blocco.addEventListener("click", seleziona);
        blocco.classList.remove("checkedbackground");
        blocco.classList.remove("uncheckedbackground");
    }

    const unchecked = document.querySelectorAll(".checkbox");
    for (const checkbox of unchecked){
        checkbox.src = "images/unchecked.png";
    }

    const risultato = event.currentTarget.parentNode;
    risultato.classList.add("hidden");

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


const blocchi = document.querySelectorAll("section div");
for(const blocco of blocchi){
    blocco.addEventListener("click", seleziona);
}


const riparti = document.querySelector("#risultato button");
riparti.addEventListener("click", restart);