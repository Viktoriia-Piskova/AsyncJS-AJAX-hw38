let currentPage = 1;

const submitBtn = document.getElementById('submit');
const responseDisplay = document.getElementById('paginated-list');
submitBtn.addEventListener('click', searchMovies);
let paginationContainer = document.getElementById('pagination-numbers');

const itemsPerPage = 10;


function searchMovies(event){
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
        responseDisplay.innerHTML = 'Sorry, we could not find anything. Please, check out your request'
    }
    xhttp.open('GET', `https://www.omdbapi.com/?apikey=aebbecd2&s=${title}&type=${type}&page=${pageNumber}`);
    xhttp.send();

}

function displayMovies(response) {
    responseDisplay.innerHTML = '';
    const parsedResponse = JSON.parse(response);
    const moviesResponse = parsedResponse.Search;

    moviesResponse.forEach((movie) => {
        responseDisplay.innerHTML += `
    <li>
        <p>${movie.Title}</p>
        <button id="${movie.imdbID}">Details</button>
    </li>`
    })
    pagesNumber = Math.ceil(parseInt(parsedResponse.totalResults) / itemsPerPage);
    createPagination(pagesNumber)

}

function createPagination(pagesNumber) {
    paginationContainer.innerHTML = '';
    for (let i = currentPage; i <= pagesNumber; i++) {
        if ((i < currentPage + 3) || (i > pagesNumber - 3)) {
            let paginationBtn = document.createElement('button');
            paginationBtn.id = i;
            paginationBtn.innerHTML = i;
            paginationContainer.appendChild(paginationBtn)
        }
    }

}

document.getElementById('next-btn').addEventListener('click', next)

function next() {
    ++currentPage;
    searchMovie()
}
document.getElementById('previous-btn').addEventListener('click', previous)

function previous() {
    --currentPage;
    searchMovie()
}


