var inputEl = document.querySelector('#inputDefault');
var formEl = document.querySelector('#form');
var formOneEl = document.querySelector('#formOne');
var previousSearches = JSON.parse(localStorage.getItem('trackSearches')) || [];

// DEFINING FUNCTIONS
var handleSubmissionOne = function (event) {
  event.preventDefault();
  location.replace('search-results.html')
  // removes HTML from results container
  var search = inputEl.value.trim();
  // Checks if search is original
  if (previousSearches.includes(search)) {
  } else {
    // If unique search, stores to localStorage
    previousSearches.unshift(search);
    var storage = JSON.stringify(previousSearches);
    localStorage.setItem('trackSearches', storage);
    search = search.replaceAll(" ", "%20");
  }
  fetchTrackID(search);
}

var handleSubmission = function (event) {
  event.preventDefault();
  // removes HTML from results container
  var search = inputEl.value.trim();
  // Checks if search is original
  var resultsContainerEl = document.querySelector('#searchContainer');
  resultsContainerEl.innerHTML = '';
  if (previousSearches.includes(search)) {
    search = search.replaceAll(" ", "%20");
  } else {
    // If unique search, stores to localStorage
    previousSearches.unshift(search);
    var storage = JSON.stringify(previousSearches);
    localStorage.setItem('trackSearches', storage);
    search = search.replaceAll(" ", "%20")
  }
  inputEl.value = '';
  createButtons()
  fetchTrackID(search);
};

// SEARCH FOR RESULTS
var fetchTrackID = function (searchTerm) {
  console.log('fetchTrackID called');
  // Element container to attach results
  var resultContainerEl = document.querySelector('#searchContainer');
  // Search track URL template
  var apiTrackID = `https://devon-and-david-20220309.herokuapp.com/track.search?q_track=${searchTerm}&page_size=10`;
  // Fetching data from Musicmatch for search results; returning trackID
  fetch(apiTrackID)
    .then(function (response) {
      if (response.ok) {
        response.json()
          .then(function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
              // Creating elements on loop
              var resultEl = document.createElement('div');
              var resultHeaderEl = document.createElement('h2');
              var resultBodyEl = document.createElement('div');
              var btnDivEl = document.createElement('div');
              var resultButtonEl = document.createElement('button');
              // Adding classes
              resultEl.classList.add('card', 'border-primary', 'my-3');
              resultHeaderEl.classList.add('card-header', 'cardHead', 'text-center');
              resultBodyEl.classList.add('card-body');
              btnDivEl.classList.add('d-flex', 'justify-content-center')
              resultButtonEl.classList.add('btn', 'btn-outline-primary', 'seeMore')
              // Adding text content - replace with data from API pull
              resultHeaderEl.textContent = `${data[i].track.track_name} - ${data[i].track.artist_name}`;
              resultButtonEl.textContent = 'SEE MORE';
              // Appending elements
              btnDivEl.append(resultButtonEl);
              resultBodyEl.append(btnDivEl);
              resultEl.append(resultHeaderEl, resultBodyEl);
              resultContainerEl.append(resultEl)
            };
            // fetchLyrics(data[0].track.track_id)
          });
      }
    });
};

// Searches Musixmatch API for lyric content associated with the trackID
var fetchLyrics = function (trackID) {
  console.log('Fetch Lyrics called');
  // Element container to attach track information
  var trackContainerEl = document.querySelector('.track-container');

  // Search for lyrics URL template
  var apiLyrics = `https://devon-and-david-20220309.herokuapp.com/track.lyrics.get?track_id=${trackID}`;

  // Fetching data from Musixmatch for search results
  fetch(apiLyrics)
    .then(function (response) {
      if (response.ok) {
        response.json()
          .then(function (data) {
            console.log(data);
            if (data.length != 0) {
              for (var i = 0; i < data.length; i++) {
                // Creating elements on loop
                var trackEl = document.createElement('div');
                var trackHeaderEl = document.createElement('h2');
                var trackArtistEl = document.createElement('p');
                var trackLyricsEl = document.createElement('p');
                // Adding classes
                trackEl.classList.add('track');
                trackHeaderEl.classList.add('track-header');
                trackArtistEl.classList.add('tract-artist');
                trackLyricsEl.classList.add('track-text');
                // Adding text content - replace with data from API pull
                trackHeaderEl.textContent = 'Toxic';
                trackArtistEl.textContent = 'Britney Spears';
                trackLyricsEl.textContent = 'Lorem ipsisjw iwfwjjrwijjijvjrij ivjijis djivjijvisje ijwiejgfisih sdcfaehfhsfi sifhhfisdhfi  shfhifosh hosdhgo';
                // Appending elements
                trackEl.append(trackHeaderEl, trackArtistEl, trackLyricsEl);
                trackContainerEl.append(trackEl);
              }
            }
          }.catch(function (err) {
            console.log(err);
          }))
      };
    });
}


var fetchVideo = function (searchTerms) {
  console.log('Fetch Video called');
  // Element container to attach track information
  var trackContainerEl = document.querySelector('.track-container');

  // Need variable to pass into Youtube search function

  // Search for lyrics URL template
  var apiVideo = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerms}key=AIzaSyBjmcNPYyG9kBMKxEBBj5x6rjJ4yvMj18g`;

  // Fetching data from Musixmatch for search results
  fetch(apiVideo)
    .then(function (response) {
      if (response.ok) {
        response.json()
          .then(function (data) {
            console.log(data.length);
            // Creating video element
            var videoEl = document.createElement('iframe')
            // Adding attributes
            videoEl.classList.add('.video');
            videoEl.src = 'https://www.youtube.com/watch?v=EDQVDCsrFAE';
            // Appending elements
            trackContainerEl.append(videoEl)

          });
      }
    });
};

// STARTING PAGE CONDITIONS
var createButtons = function () {
  var buttonContainerEl = document.querySelector('.button-container');
  buttonContainerEl.innerHTML = '';
  for (var i = 0; i < previousSearches.length; i++) {
    var buttonEl = document.createElement('button');
    buttonEl.textContent = previousSearches[i];
    buttonEl.classList.add('prevSearch', 'btn', 'btn-outline-light', 'text', 'rounded')
    buttonContainerEl.append(buttonEl);
  }
};

// Function for prev. searched buttons
var searchAgain = function (event) {
  var search = $(this).text();
  var searchTerm = search.replaceAll(' ', '%20');
  fetchTrackID(searchTerm);
}

// Conditional to check if we are on the search results page, if so convert the search into URL format for fetchTrackID function
if (location.pathname.includes('search-results.html')) {
  var searchTerm = previousSearches[0].replaceAll(' ', '%20');
  createButtons();
  fetchTrackID(searchTerm);
};

// BUTTON FUNCTIONALITY
if (formOneEl !== null) {
  formOneEl.addEventListener('submit', handleSubmission);
}

if (formEl !== null) {
  formEl.addEventListener('submit', handleSubmissionOne);
}
// Prev. search buttons
$(document).on('click', '.prevSearch', searchAgain);
// See More Buttons
$(document).on('click', '.seeMore', function () {
  console.log('See more clicked!')
  fetchLyrics();
  fetchVideo();
});
