var animals = ["Dog","Cat","Rabbit","Hamster","Skunk","Goldfish","Bird","Fish","Ferret","Turtle","Zebra","Alligator","Bearded Dragon"];

displayButtons();

function displayButtons() {

  $("#animalButtons").empty();

  for (var i = 0; i < animals.length; i++) {

    var button = $("<button>");
    button.addClass("animal");
    button.attr("data-name", animals[i]);
    button.text(animals[i]);
    $("#animalButtons").append(button);
  }
}

$("#add-animal").on("click", function(event){
  event.preventDefault();

  var animalName = $("#animal-input").val();

  animals.push(animalName);

  displayButtons();
})

$(document).on("click", ".animal", function() {
	//clear the players div
	$('#animals').empty();
	//var to hold value of data-name of the button clicked
	var animal = $(this).attr("data-name");
	console.log(this);
	//replace space with _ so the queryURL will be valid
	var noSpace = animal.replace(" ", "_");
	//build queryURL
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + noSpace + "&limit=10&api_key=dc6zaTOxFJmzC";
	console.log(animal);
	console.log(noSpace);
	console.log(queryURL);
	//make the call
	$.ajax({
		url: queryURL,
		method: "GET"
	})
	.done(function(response) {
		//make ten <img>'s with src, data-name, data-still/animate and size
		for (var i = 0; i < 10; i++) {
			//store the rating for each gif
			var rating = response.data[i].rating;
			var img = $("<img>");
				//add multiple attributes to the newly created <img> at one time
				img.attr({
					'src': response.data[i].images.fixed_height_still.url,
					'data-name': 'still',
					'data-still': response.data[i].images.fixed_height_still.url,
					'data-animate': response.data[i].images.fixed_height.url,
					'width': 300,
					'height': 300
				});
		//add gifs to the #players div
		$('#animals').append(img);
		$('#animals').append("<br>Rated: " + rating + "<br><br>");
		}
	});
});

$(document).on("click", 'img', function(){
	//if the gif is still, change to animate
	if($(this).attr('data-name') === 'still') {
		$(this).attr('src', $(this).attr('data-animate'));
		$(this).attr('data-name', 'animate');
	}
	//if the gif is animated, change to still
	else {
		$(this).attr('src', $(this).attr('data-still'));
		$(this).attr('data-name', 'still');
	}
});
