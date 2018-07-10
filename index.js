'use strict';

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search?';

let resultNumber = 0;

function getDataFromApi(inputText, callback) {
	// Take the value passed from handleSubmit and use 
	// it to find the data for the videos related to 
	// the value
	const paramsObject = {
		url: YOUTUBE_SEARCH_URL,
		data: { 
			part: 'snippet',
			q: inputText,
		    maxResults: 4,
			key: 'AIzaSyAw1hPcxvy1hwfZ8fTP-zOHaPzxVuqKFDI',
			type: 'video'
		},
		// type: 'GET',
		// dataType: 'json',
		success: callback,
		error: function(error) {
			console.log(error);
		}
	};

	$.getJSON(paramsObject);
}	

function renderSearchResults(item) {
	// Return the template string with
	// all thumbnails and captions ready to 
	// inject into the results page div
	console.log(`'renderSearchResults' ran`);
	incrementResultNumber();
	return`
		<h2>Search result ${resultNumber}</h2> 
		<a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank"><img src=${item.snippet.thumbnails.default.url} alt="screenshot from ${item.snippet.title}">Small Image</a>
		<h2>Search result ${resultNumber}</h2>
		<a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank"><img src=${item.snippet.thumbnails.medium.url} alt="screenshot from ${item.snippet.title}">Medium Image</a>
		<h2>Search result ${resultNumber}</h2>
		<a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank"><img src=${item.snippet.thumbnails.high.url} alt="screenshot from ${item.snippet.title}">Large Image</a>
		`; 
}

function incrementResultNumber() {
	resultNumber++;
}

function displayResultsPage(data) {
	// Inject the HTML into the results page to 
	// display in the DOM
	const listOfScreenshots = data.items.map((item, index) => renderSearchResults(item));
	console.log(listOfScreenshots);
	console.log(`'displayResultsPage' ran`);
	$('.js-results-page').prop('hidden', false);		
	$('.js-results-page').html(listOfScreenshots);
}

function handleSubmit() {
	// Look for and store the value for the search term
	// then pass the value to getDataFromApi function
	$('.js-search-page').submit(event => {
		event.preventDefault();
		const searchValue = $('#video-search').val();
		// const searchObject = $(event.currentTarget).find('#video-search');
		// const searchValue = $searchObject.val();
		$('#video-search').val('');
		console.log(searchValue);
		getDataFromApi(searchValue, displayResultsPage);
	});
}


$(handleSubmit);
