const submitBtn = document.getElementById('submit');
const responseDiv = document.getElementById('response');
submitBtn.addEventListener('click', searchMovie);

const title = 'rembo';

function searchMovie(event){
    event.preventDefault();
    const xhttp = new XMLHttpRequest();

    xhttp.onload = function () {
        responseDiv.innerHTML = xhttp.response};
    xhttp.onerror = function(){
        responseDiv.innerHTML = 'Onerror message'
    }
    xhttp.open('GET', `http://www.omdbapi.com/?apikey=aebbecd2&t=${title}&y=2300&plot=full`);
    xhttp.send()

}


