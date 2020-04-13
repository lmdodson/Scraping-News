$(function(){
// scrape button function
$(".scrape-new").click( function() {
    $.ajax({
        method: "GET",
        url: "/scrape",
    }).then(function(data) {
        console.log(data)
        window.location = "/"
    })
});

// clear button function
$(".clear").click(function() {
    $.ajax({
        method: "POST",
        url: "/clear",
    }).then(function() {
        console.log(cleared)
        window.location = "/"
    })
})






});