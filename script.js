let currentPage = 1;

const submitBtn = document.getElementById('submit');
const paginatedList = document.getElementById('paginated-list');
let paginationNumbers = document.getElementById('pagination-numbers');
let paginationContainer = document.getElementById('pagination-container');
let firstNumbers = document.getElementById('firstNumbers');
let lastNumbers = document.getElementById('lastNumbers');
let otherNumbers = document.getElementById('otherNumbers');
let moviesList = '';
let totalPages = 1;
const itemsPerPage = 10;


submitBtn.addEventListener('click', searchMovies);
paginatedList.addEventListener('click', showDetails);

function searchMovies(event) {
    event.preventDefault();
    searchMovie()
}

function searchMovie() {
    const title = document.getElementById('name').value;
    const type = document.querySelector('input[name="movie-type"]:checked').value;
    const pageNumber = currentPage;


    const xhttp = new XMLHttpRequest();

    xhttp.onload = function () {
        displayMovies(xhttp.response)
    };
    xhttp.onerror = function () {
        paginatedList.innerHTML = 'Sorry, we could not find anything. Please, check out your request'
    }
    xhttp.open('GET', `https://www.omdbapi.com/?apikey=aebbecd2&s=${title}&type=${type}&page=${pageNumber}`);
    xhttp.send();



}

function displayMovies(response) {
    paginatedList.innerHTML = '';
    const parsedResponse = JSON.parse(response);
    const moviesResponse = parsedResponse.Search;

    moviesResponse.forEach((movie) => {
        paginatedList.innerHTML += `
    <li>
        <p>${movie.Title}</p>
        <button id="${movie.imdbID}">Details</button>
    </li>`
    })

    moviesList = moviesResponse;

    pagesNumber = Math.ceil(parseInt(parsedResponse.totalResults) / itemsPerPage);
    createPagination(pagesNumber);


}

function createPagination(pagesNumber) {
    paginationContainer.classList.remove('disabled');
    firstNumbers.innerHTML = '';
    lastNumbers.innerHTML = '';

    for (let i = currentPage; i <= pagesNumber; i++) {
        // if((i - pagesNumber) == 1){
        //     otherNumbers.classList.add('disabled')
        // }

        if (i < currentPage + 3) {
            let paginationBtn = document.createElement('button');
            paginationBtn.id = i;
            paginationBtn.innerHTML = i;
            firstNumbers.appendChild(paginationBtn)
        } else if (i > pagesNumber - 3) {
            let paginationBtn = document.createElement('button');
            paginationBtn.id = i;
            paginationBtn.innerHTML = i;
            lastNumbers.appendChild(paginationBtn)
        }
    }
}



document.getElementById('previous-btn').addEventListener('click', previous)
function previous() {
    --currentPage;
    searchMovie()
}

document.getElementById('next-btn').addEventListener('click', next)
function next() {
    ++currentPage;
    searchMovie()
}

document.getElementById('first-page').addEventListener('click', firstPage)
function firstPage() {
    currentPage = 1;
    searchMovie()
}

document.getElementById('last-page').addEventListener('click', lastPage)
function lastPage() {
    currentPage = pagesNumber;
    searchMovie()
}

document.getElementById('pagination-numbers').addEventListener('click', goToNumber)
function goToNumber(evt) {
    let btnId = parseInt(evt.target.id);
    currentPage = btnId;
    searchMovie()
    console.log(btnId)
}


function showDetails(evt) {
    if (evt.target.tagName == 'BUTTON') {
        let filmId = evt.target.id;
        let filmToShow = moviesList.find(film => film.imdbID == filmId)
        buildModal(filmToShow)
    }
}




const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

function buildModal () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}