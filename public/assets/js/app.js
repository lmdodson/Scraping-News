$(function(){
    //! main page functionality
    // scrape button function
    $(".scrape-new").click( function() {
        $.ajax({
            method: "GET",
            url: "/scrape",
        }).then(function(data) {
            console.log(data)
            window.location = "/"
        });
    }); 

    // clear button function
    $(".clear").click(function() {
        $.ajax({
            method: "POST",
            url: "/clear",
        }).then(function() {
            console.log("cleared")
            window.location = "/"
        });
    });

    // save button function
    $(".save").click(function() {
        var articleId = $(this).attr("data-id")
        console.log(articleId);
            $.ajax({
                type: "POST",
                url: "/save/" + articleId,
            }).then(function(response) {
                console.log(JSON.stringify(response));
                window.location = "/"
            });
    });

    // view saved button
    $(".saved-articles").click(function() {
        window.location = "/saved"
    });

    // return home button
    $(".home").click(function() {
        window.location = "/"
    });

    //! saved page functionality
    // delete from saved
    $(".delete").click(function() {
        var articleId = $(this).attr("data-id")
        console.log(articleId);
            $.ajax({
                type: "POST",
                url: "/delete/" + articleId,
            }).then(function(response) {
                console.log(JSON.stringify(response));
                window.location = "/saved"
            });
    });

});