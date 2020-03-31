

const API_KEY = "PLACE YOUR API KEY HERE";

function fetchNews( searchTerm ){
    let url = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&q=${searchTerm}`;

    let settings = {
        method : 'GET'
    };
    console.log( url );
    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }

            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            displayResults( responseJSON );
        })
        .catch( err => {
            console.log( err );
        });
}

function displayResults( data ){
    let results = document.querySelector( '.results' );

    results.innerHTML = "";

    for( let i = 0; i < data.articles.length; i ++ ){
        results.innerHTML += `
            <div>
                <h2>
                    ${data.articles[i].title}
                </h2>
                <p>
                    ${data.articles[i].author}
                </p>
                <div>
                    <img src="${data.articles[i].urlToImage}" />
                </div>
                <p>
                    ${data.articles[i].description}
                </p>
            </div>
        `;
    }
}

function watchForm(){
    let submitButtton = document.querySelector( '.submitButtton' );

    submitButtton.addEventListener( 'click', ( event ) => {
        event.preventDefault();

        let searchTerm = document.querySelector( '#searchTerm' ).value;

        fetchNews( searchTerm );

    });
}

function init(){
    watchForm();
}

init();