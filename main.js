



var arrayExample = ['Tesla', 'Space X', 'Coding', 'Programming', 'JavaScript', 'HTML', 'CSS', 'Boostrap', 'Firebase']
var addedWord

// Function to display array words as buttons
function displayButtons() {
    $("#buttons").empty();

    for (var i = 0; i < arrayExample.length; i++) {
        var btn = $("<button>");
        btn.text(arrayExample[i]);
        btn.attr("data-name", arrayExample[i]);
        btn.attr("class", "buttonclick")
        $("#buttons").append(btn);
        console.log('displayButtons');
        console.log(arrayExample);
    }
}

// Executes function
displayButtons()


// Creates the GIFs on the page
$("#buttons").on("click", "button.buttonclick", function() {
    console.log("click")
    var displayBtnWord = $(this).text()
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + displayBtnWord + "&api_key=B0xBBRNMe5llt0bAAEG3BWbaGe2URH3K&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

        var results = response.data

        for (var i = 0; i < results.length; i++) {

            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                var gifDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating + " ");
                var createImgTag = $("<img>");

                gifDiv.attr("class", "block")
                createImgTag.attr("src", results[i].images.fixed_height_still.url);
                createImgTag.attr("data-still", results[i].images.fixed_height_still.url);
                createImgTag.attr("data-animate", results[i].images.fixed_height.url);
                createImgTag.attr("data-state", "still")
                createImgTag.attr("alt", addedWord);
                createImgTag.attr("class", "gif");

                gifDiv.append(p);
                gifDiv.append(createImgTag);
                

                $(".gifsgohere").prepend(gifDiv);
            }
        }
    })
})

// Adds a word button to button searches
$(".addword").on("click", function(event) {
    event.preventDefault();

    var addedWord = $(".input").val().trim();

    if (addedWord == "") {
        return false
    }
    else {
        arrayExample.push(addedWord);
        displayButtons();
        $(".input").val("");
    }
}) 


// Click on image to animate/stop.
$("div").on("click", "img.gif", function() {
    console.log('animate/stop')
    var state = $(this).attr("data-state");
    
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } 
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});


