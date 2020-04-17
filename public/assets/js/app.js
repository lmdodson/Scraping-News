$(function(){
    //! main page functionality
    // scrape button function
    $(".scrape-new").click( function() {
        // ajax call to get articles
        $.ajax({
            method: "GET",
            url: "/scrape",
        }).then(function(data) {
            console.log(data)
            // redirect the user to the updated home page
            window.location = "/"
        });
    }); 

    // clear button function
    $(".clear").click(function() {
        // ajax call to clear the current selection of articles
        $.ajax({
            method: "POST",
            url: "/clear",
        }).then(function() {
            console.log("cleared")
            // redirect user to the updated home page
            window.location = "/"
        });
    });

    // save button function
    $(".save").click(function() {
        // set the articleId
        var articleId = $(this).attr("data-id")
        console.log(articleId);
            // ajax Post request to save the article info by id
            $.ajax({
                type: "POST",
                url: "/save/" + articleId,
            }).then(function(response) {
                console.log(JSON.stringify(response));
                // redirect the user to the updated home page
                window.location = "/"
            });
    });

    // view saved button
    $(".saved-articles").click(function() {
        // direct user the the saved page
        window.location = "/saved"
    });

    // return home button
    $(".home").click(function() {
        // direct user to the home page
        window.location = "/"
    });

    //! saved page functionality
    // delete from saved
    $(".delete").click(function() {
        // set the articleId
        var articleId = $(this).attr("data-id");
        console.log(articleId);
            // ajax call to remove article from saved
            $.ajax({
                type: "POST",
                url: "/delete/" + articleId
            }).then(function(response) {
                console.log(JSON.stringify(response));
                // direct user to the updated saved page
                window.location = "/saved"
            });
    });

    //! modal functionality

    // view comments
    $(".comments").click(function() {
        var thisArticle = $(this).attr("data-id")
        // ajax call to get article comment data
        $.ajax({
            method:"GET",
            url: "/articles/" + thisArticle 
        }).then(function(data) {
            console.log(data)
            // if there are no comments
            if (data.comment.length == 0){
                let noComment = ("<p>" + "No comments yet. Be the first to comment!" + "</p>")
                $(".comment-container").append(noComment);    
            } else {
                // if there are comments, display them in the modal
                let title = ("<h4>" + data.comment[0].title + "</h4>");
                    let body = ("<p>" + data.comment[0].body + "</p>");
                    let comment = $("<li class='comment-item'>" + title + body + "</li>");
                        $(".comment-container").append(comment);
                        $(".comment-container").append('<button class="btn btn-danger comment-delete">X</button>');
                };
        });
    });

    // remove comments
    $(".comment-delete").click(function() {

    })



    // save new comment
    $(".save-comment").click(function(){
    var commentId = $(this).attr("data-id");
    var commentTitle = $(".comment-title").val().trim();
    var commentBody = $(".comment-input").val().trim();
    // ajax Post to save the comment
        $.ajax({
         method: "POST",
            url: "/articles/" + commentId,
            data: {
                title: commentTitle,
                body: commentBody
        }
    }).then(function (data) {
        console.log("comment saved: " + data);
        // clear the input fields
        $(".comment-title").val("");
        $(".comment-input").val("");
    });
    });

});