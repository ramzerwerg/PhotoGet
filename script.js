const API_KEY = '20199984-e2913538a0f45568cdb4e2fb8';

let adress = document.querySelector(".adress");

document.addEventListener("DOMContentLoaded", setEventListener);

function setEventListener(){
    document.querySelector(".choose .random_btn").addEventListener("click", chooseMethod);
    document.querySelector(".choose .filter_btn").addEventListener("click", chooseMethod);
    document.querySelector(".random-img .fa-arrow-left").addEventListener("click", chooseMethod);
    document.querySelector(".filter-img .fa-arrow-left").addEventListener("click", chooseMethod)
    document.querySelector(".random-img .btn").addEventListener("click", randomImage);
    document.querySelector(".search_filters").addEventListener("click", openFilters)
}

// Выбор рандомного изображения в режиме "СЛУЧАЙНАЯ КАРТИНКА"
function randomImage () {
    let URL = "https://pixabay.com/api/?key=" + API_KEY + "&safesearch=true";
    fetch(`${URL}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        data = data.hits;
        let imgNum = randomInteger(1,20),
        imgURL = data[imgNum].largeImageURL;

        document.querySelector(".random-img .btn__functional").style= "";
        document.querySelector(".random-img .btn__functional .functional__download").href = `${imgURL}`;
        document.querySelector(".random-img .btn__functional .functional__show").href = `${imgURL}`;
        document.querySelector(".wrapper").style= `background-image: url(${imgURL});`;
    });


}

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

// Выбор изображения в режиме "ПОИСК ПО ФИЛЬТРАМ"
function filterImage(){
    let URL = "https://pixabay.com/api/?key=" + API_KEY + "&safesearch=true";

    
    if(document.querySelector(".categories_list .category.selected")){
        let category = document.querySelector(".categories_list .category.selected").getAttribute("data-category");
        URL += "&category=" + category;
    }

    if(document.querySelector(".search_input").value) {
        let q = document.querySelector(".search_input").value;
        URL += "&q=" + q;
    }

    //поиск изображения
    fetch(`${URL}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        data = data.hits;
        let imgCount = document.querySelector(".filters_menu .count_img input").value;
        
        document.querySelector(".container_card").innerHTML = "";
        for(let i = 0; i < imgCount; i++){
            let imgURL = data[i].largeImageURL;
            
            let card = document.createElement('div');

            card.classList.add("card");
            
            card.setAttribute("onmouseover", "cardFunc(this, 1)");
            card.setAttribute("onmouseleave", "cardFunc(this, 0)");
            
            card.style = `background: url('${imgURL}'); background-size: 100%;`;

            card.insertAdjacentHTML('beforeEnd', `
            <div class="card_functions">
                <a href="${imgURL}" class="functional__download" download>Скачать</a>
                <a href="${imgURL}" class="functional__show" target="_blank">Посмотреть</a>
            </div>`);

            document.querySelector(".container_card").append(card);
        }
    });
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

function cardFunc(card, mode) {
    if(mode == 1){
        card.querySelector('.card_functions').style="display: flex";
    } else {
        card.querySelector('.card_functions').style="display: none";
    }
}

function openFilters(){
    let filtersMenu = document.querySelector(".filters_menu"),
    searchCaret = document.querySelector(".search_filters i");

    if(filtersMenu.getAttribute("data-closed") == "true"){
        filtersMenu.style.height =  "185px";
        filtersMenu.style.padding = "10px";
        filtersMenu.setAttribute("data-closed", "false");
        searchCaret.classList.toggle("fa-caret-down");
        searchCaret.classList.toggle("fa-caret-up");
    } else {
        filtersMenu.style.height =  "0px";
        filtersMenu.style.padding = "0px";
        filtersMenu.setAttribute("data-closed", "true");
        searchCaret.classList.toggle("fa-caret-down");
        searchCaret.classList.toggle("fa-caret-up");
    }
}

document.querySelectorAll(".categories_list .category").forEach(item => {
    item.addEventListener("click", selectCategory);
});

function selectCategory(e) {
    document.querySelectorAll(".category").forEach(cat => {cat.classList.remove("selected")})
    e.target.classList.toggle("selected");
}