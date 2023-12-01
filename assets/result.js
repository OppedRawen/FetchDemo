document.addEventListener('DOMContentLoaded', function() {



    function getQuery(param){
       const params = new URLSearchParams(window.location.search);
         return params.get(param);
    }
  
    var city = getQuery('city');
    console.log(city);
    if(city){
        document.getElementById('city-name').textContent = city;
        fetchRestaurants(city);

    }else{
        document.getElementById('city-name').textContent = 'No city found';
    }

function fetchRestaurants(cityName) {
    var url = 'https://api.yelp.com/v3/businesses/search';

    var proxyUrl = 'https://afternoon-badlands-11870.herokuapp.com/'; // Use a proxy to avoid CORS errors
    var apiKey ='NKox_GY98ntD7Hu5CCjMS8VQevvrNWZf69qUTAZhXNKLAgrVQPM9M7se2ktuWnZMrU0OPOUdUc1X2Gjp6kzEVPW632s2UUHTr0sRi8h3aVxZ9F752QYGW5blZxpXZXYx';

    fetch(proxyUrl+url+`?location=${cityName}`, {
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
        // parses response to json if successful
        // not the actual data we need yet
        console.log(response, 'response');
        return response.json();
    })
    .then(data => {
        displayRestaurants(data.businesses);
       console.log(data, 'data')
    })
    .catch(error => {
        console.error('Fetch error:', error);

    });
}
function displayRestaurants(data) {
    var grid = document.getElementById('results-grid');

    grid.innerHTML = '';

  
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