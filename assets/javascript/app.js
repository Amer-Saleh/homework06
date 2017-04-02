window.onload = function() {

	var topics = ["Dog", "Cat", "Rabbit", "Hamster", "Whale", "Goldfish","Bird", "Turtle", "Lion", "Horse", "Fox", "Tiger", "Squirrel", "Bear", "Gray Wolf", "Puppy", "Deer"];

	for (var i = 0; i < topics.length; i++) {
		var btn = $("<button>");
		btn.text(topics[i]);
		btn.attr("id", "animalBtn");
		btn.attr("data-animal", topics[i]);
		$("#topics").append(btn);
	}//end for loop


	// Add a new animal or topic to the list
    $("#addTopic").on("click", function(event) {

          	event.preventDefault();
          	var topic = $("#userInput").val().trim();
         	topics.push(topic);
         	var newTopicIndex = (topics.length) - 1;

            btn = $("<button>");
			btn.text(topics[newTopicIndex]);
			btn.attr("id", "animalBtn");
			btn.attr("data-animal", topics[newTopicIndex]);
			$("#topics").append(btn);

      });// end on click that adds a new topic.


	// Adding click event listen listener to all buttons
    function dispalyAnimalesImg() {

   			$("#images").empty();

      		// Grabbing and storing the data-animal property value from the button
     		var animal = $(this).attr("data-animal");

     		// Constructing a queryURL using the animal name
      		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
       		animal + "&api_key=dc6zaTOxFJmzC&limit=10";

      		// Performing an AJAX request with the queryURL
     		$.ajax({
         		 url: queryURL,
         		 method: "GET"
        	})//end ajax

        	// After data comes back from the request do the following 
        	.done(function(response) {

         	//1- storing the data from the AJAX request in the results variable
          	var results = response.data;

            //2- Looping through each result item
            for (var i = 0; i < results.length; i++) {

            	//3- Creating and storing a div tag
            	var animalDiv = $("<div>");
             	animalDiv.attr("id", "rateImg");
            	//4- Creating a paragraph tag with the result item's rating
            	var p = $("<p>").text("Rating: " + results[i].rating);

            	//5- Creating and storing an image tag
            	var animalImage = $("<img>");

            	//6- Setting the src attribute of the image to a property pulled off the result item
            	animalImage.attr("src", results[i].images.fixed_height_still.url);
            	animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            	animalImage.attr("data-animate", results[i].images.fixed_height.url);
            	animalImage.attr("data-state", "still");
            	animalImage.attr("id", "me");


            	//7- Appending the paragraph and image tag to the animalDiv
            	animalDiv.append(p);
            	animalDiv.append(animalImage);
            	$("#images").append(animalDiv);
      		}// end for

        	// 8- interchange between still state and animate state whenever the user cilck on an image.
         	$("img").on("click", function() { 
           
	           	var state = $(this).attr("data-state");

	           	if (state === "still") { 
	           		$(this).attr("src", $(this).attr("data-animate"));
	           		$(this).attr("data-state","animate");
	           	}// end if

	           	else {  
	           		$(this).attr("src", $(this).attr("data-still"));
	           		$(this).attr("data-state","still");	
	           	}//end else

   	        });//end on-click for images  
   	
            }) // end done
    }; // end on-click
             
    // Adding a click event listener to all elements with an Id of "animalBtn"
   	$(document).on("click", "#animalBtn",dispalyAnimalesImg);
   	   
}// end onload function