document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('search-form');
    var input = document.getElementById('search-input');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var city = input.value.trim();
        if(city){
            window.location.href = 'resultPage.html?city='+encodeURIComponent(city);
        }else{
            alerty('something went wrong');
        }
})
});