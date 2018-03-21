var animals = [
    "dog",
    "cat",
    "rabbit",
    "hamster",
    "goldfish",
    "bird",
    "ferret",
    "turtle",
    "sugar glider",
    "Chinchilla",
    "Hedgehog",
    "Hermit Crab",
    "Gerbil",
    "Pygmy Goat",
    "Chicken",
    "Capybara",
    "Teacup Pig",
    "Shark",
    "Salamander",
    "Frog",
    "Falcon"
];

function renderButtons() {

    $("#animalsView").empty();


    for (var i = 0; i < animals.length; i++) {


        var button = $("<button>" + animals[i] + "</button>");
        button.addClass("animal");
        button.attr("data-animal", animals[i]);
        $("#animalsView").append(button);




    }

}
renderButtons();

function addAnimal () {
    $("#addAnimal").on("click", function (event) {
        event.preventDefault();

        var add = $("#animal-input").val().trim();
        animals.push(add);

        renderButtons();
        clickEvent();

    });
}


function clickEvent () {


    $("button").on("click", function () {

        var animal = $(this).attr("data-animal");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=8SiJFznIRJb7dPaUfhjlnV6WeHfe66rt&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(queryURL);
                console.log(response);
                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    var animalDiv = $("<div>");
                    animalDiv.addClass("animalGif");

                    var p = $("<p>").text("Rating: " + results[i].rating);
                    animalDiv.append(p);

                    var animalImage = $("<img>");
                    animalImage.attr("src", results[i].images.fixed_height_still.url);
                    animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                    animalImage.attr("data-animate", results[i].images.fixed_height.url);
                    animalImage.attr("data-state", "still");

                    animalDiv.append(animalImage);

                    $("#gifs-appear-here").prepend(animalDiv);


                }



            })

    })


}


function movement() {

    console.log("clicked!");
    var state = $(this).find("img").attr("data-state");


    if (state === "still") {

        $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
        $(this).find("img").attr("data-state", "animate");
    }

    else {

        $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
        $(this).find("img").attr("data-state", "still")
    }
}



addAnimal();
clickEvent();
$(document).on("click", ".animalGif", movement);