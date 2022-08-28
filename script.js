const submitBtn = document.getElementById('submit');
const responseDisplay = document.getElementById('paginated-list');
submitBtn.addEventListener('click', searchMovie);

const pageNumber = 1;


function searchMovie(event){
    const title = document.getElementById('name').value;
    const type = document.querySelector('input[name="movie-type"]:checked').value;


    event.preventDefault();
    const xhttp = new XMLHttpRequest();

    xhttp.onload = function () {
        displayMovies(xhttp.response)};
    xhttp.onerror = function(){
        responseDisplay.innerHTML = 'Onerror message'
    }
    xhttp.open('GET', `https://www.omdbapi.com/?apikey=aebbecd2&s=${title}&type=${type}&page=${pageNumber}`);
    xhttp.send()

}

function displayMovies(response){
    const moviesResponse = JSON.parse(response).Search;
    
    moviesResponse.forEach((movie) => {
        responseDisplay.innerHTML += `
    <li>
        <p>${movie.Title}</p>
        <button id="${movie.imdbID}">Details</button>
    </li>`
    })
    
    console.log(moviesResponse);



}
