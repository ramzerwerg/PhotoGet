const API_KEY = '20199984-e2913538a0f45568cdb4e2fb8';
let URL, q;

let adress = document.querySelector(".adress");

document.addEventListener("DOMContentLoaded", setEventListener);

function setEventListener(){
    document.querySelector(".choose .random_btn").addEventListener("click", chooseMethod);
    document.querySelector(".choose .filter_btn").addEventListener("click", chooseMethod);
    document.querySelector(".random-img .fa-arrow-left").addEventListener("click", chooseMethod);
    document.querySelector(".filter-img .fa-arrow-left").addEventListener("click", chooseMethod)
    document.querySelector(".random-img .btn").addEventListener("click", randomImage);
}

// Выбор рандомного изображения в режиме "СЛУЧАЙНАЯ КАРТИНКА"
function randomImage () {
    URL = "https://pixabay.com/api/?key="+API_KEY;
    fetch(`${URL}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        data = data.hits;
        let imgNum = randomInteger(1,20),
        imgURL = data[imgNum].largeImageURL;

        document.querySelector(".wrapper").style= `background-image: url(${imgURL});`;
    });


}

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

// TODO: Выбор изображения в режиме "ПОИСК ПО ФИЛЬТРАМ"
function filterImage(){

}

// Переход между методами
function chooseMethod(e) {
    let choose = document.querySelector(".choose"),
    filter = document.querySelector(".filter-img"),
    random = document.querySelector(".random-img");

    switch(e.target.classList[1]){
        case "random_btn": animationSection("СЛУЧАЙНАЯ КАРТИНКА", random)
        break;
        
        case "filter_btn": animationSection("ПОИСК ПО ФИЛЬТРАМ", filter)
        break;

        case "fa-arrow-left": backToMenu()
        break;
    }

    function animationSection(name, nextSection) {
        adress.classList.remove("visible");
        choose.classList.remove("visible");
        
        
        setTimeout(() => { 
            nextSection.removeAttribute("style");
            setTimeout(() => { 
                adress.classList.add("visible");
                nextSection.classList.add("visible");

                choose.style = "display: none";

                adress.innerHTML = name;
            },100);
         }, 800);

    }

    function backToMenu(){
        adress.classList.remove("visible");
        random.classList.remove("visible");
        filter.classList.remove("visible");
        
        
        setTimeout(() => { 
            choose.removeAttribute("style");
            setTimeout(() => { 
                adress.classList.add("visible");
                choose.classList.add("visible");

                random.style = "display: none";
                filter.style = "display: none";
                
                adress.innerHTML = "PHOTOGET";
            },100);
         }, 800);
    }
}