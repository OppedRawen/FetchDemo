document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('search-form');
    var input = document.getElementById('city-input');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var city = input.ariaValueMax.trim();
        if(city){
            window.location.href = 'resultPage.html?city='+encodeURIComponent(city);
        }else{
            alerty('something went wrong');
        }
})
});