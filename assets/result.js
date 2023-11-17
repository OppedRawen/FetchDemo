document.addEventListener('DOMContentLoaded', function() {



    function getQuery(param){
        var queryString = window.location.search.substring(1);
        var params = queryString.split('&');
        for(var i=0; i<params.length; i++){
            var pair = params[i].split('=');
            if(pair[0] === param){
                return decodeURIComponent(pair[1]);
            }
        }
        return null;
    }

    var city = getQuery('city');
    if(city){
        document.getElementById('city-name').textContent = city;
        fetchRestaurants(city);

    }else{
        document.getElementById('city-name').textContent = 'No city found';
    }

    // function to fetch restaurants data

function fetchRestaurants(cityName) {
    // Yelp Fusion API endpoint for business search
    var url = 'https://api.yelp.com/v3/businesses/search';

    var proxyUrl = 'https://afternoon-badlands-11870.herokuapp.com/'; // Use a proxy to avoid CORS errors
    // Use a placeholder for the API key
    var apiKey ='NKox_GY98ntD7Hu5CCjMS8VQevvrNWZf69qUTAZhXNKLAgrVQPM9M7se2ktuWnZMrU0OPOUdUc1X2Gjp6kzEVPW632s2UUHTr0sRi8h3aVxZ9F752QYGW5blZxpXZXYx';

    // Making a fetch request directly to Yelp's Business Search endpoint
    fetch(proxyUrl+url+`?location=${encodeURIComponent(cityName)}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        displayRestaurants(data.businesses);
        console.log(data.businesses);
    })
    .catch(error => {
        console.error('Fetch error:', error);
        // Optionally handle the error on the UI, e.g., show an error message
    });
}
function displayRestaurants(data) {
    var grid = document.getElementById('results-grid');
    // Clear any existing content
    grid.innerHTML = '';

    // Loop through restaurant data and create elements for each
    var restaurantElements = data.map(function(restaurant) {
        var restaurantElement = document.createElement('div');
        restaurantElement.className = 'restaurant';

        // Populate restaurantElement with restaurant details
        var alias = document.createElement('h2');
        alias.textContent = restaurant.alias;
        restaurantElement.appendChild(alias);

        var image = document.createElement('img');
        image.src = restaurant.image_url;
        image.alt = restaurant.name;
        restaurantElement.appendChild(image);

        var description = document.createElement('p');
        description.textContent = `Rating: ${restaurant.rating}, Price: ${restaurant.price}`;
        restaurantElement.appendChild(description);

        return restaurantElement;
    });
    restaurantElements.forEach(elements=>grid.appendChild(elements));
}

});