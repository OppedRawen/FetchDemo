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
    }
});