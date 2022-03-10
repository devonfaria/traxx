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
    search = search.replaceAll(" ", "%20");
  } else {
    // If unique search, stores to localStorage
    previousSearches.unshift(search);
    var storage = JSON.stringify(previousSearches);
    localStorage.setItem('trackSearches', storage);
    search = search.replaceAll(" ", "%20")
  }
  fetchTrackID(search);
}

var handleSubmission = function (event) {
  event.preventDefault();
  // removes HTML from results container
  var search = inputEl.value.trim();
  // Checks if search is original
  if (previousSearches.includes(search)) {
    search = search.replaceAll(" ", "%20");
  } else {
    // If unique search, stores to localStorage
    previousSearches.unshift(search);
    var storage = JSON.stringify(previousSearches);
    localStorage.setItem('trackSearches', storage);
    search = search.replaceAll(" ", "%20")
  }
  fetchTrackID(search);
};

// SEARCH FOR RESULTS
var fetchTrackID = function (searchTerm) {
  // Element container to attach results
  var resultContainerEl = document.querySelector('#searchContainer');
  // Search track URL template
  var apiTrackID = `https://devon-and-david-20220309.herokuapp.com/track.search?q_track=${searchTerm}&page_size=20`;

  // Fetching data from Musicmatch for search results; returning trackID
  fetch(apiTrackID)
    .then(function (response) {
      if (response.ok) {
        response.json()
          .then(function (data) {
            for (var i = 0; i < data.length; i++) {
              // Creating elements on loop
              console.log(data);
              var lyrics = fetchLyrics(data[i].track.track_id);
              console.log(lyrics);
              var resultEl = document.createElement('div');
              var resultHeaderEl = document.createElement('h2');
              var resultTextEl = document.createElement('p');
              // Adding classes
              resultEl.classList.add('result');
              resultHeaderEl.classList.add('result-header');
              resultTextEl.classList.add('.result-text')
              // Adding text content - replace with data from API pull
              resultHeaderEl.textContent = `${data[i].track.track_name} - ${data[i].track.artist_name}`;
              resultTextEl.textContent = `${lyrics}`;
              // Appending elements
              resultEl.append(resultHeaderEl, resultTextEl);
              resultContainerEl.append(resultEl)
            };
            fetchLyrics(data[0].track.track_id)
          });
      }
    });
};

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
              trackLyricsEl.classList.add('.track-text');
              // Adding text content - replace with data from API pull
              trackHeaderEl.textContent = 'Toxic';
              trackArtistEl.textContent = 'Britney Spears';
              trackLyricsEl.textContent = 'Lorem ipsisjw iwfwjjrwijjijvjrij ivjijis djivjijvisje ijwiejgfisih sdcfaehfhsfi sifhhfisdhfi  shfhifosh hosdhgo';
              // Appending elements
              trackEl.append(trackHeaderEl, trackArtistEl, trackLyricsEl);
              trackContainerEl.append(trackEl);
            };
          });
      }
    });
};

var fetchVideo = function (variable) {
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

if (formEl !== null) {
  formEl.addEventListener('submit', handleSubmissionOne);
}
if (formOneEl !== null) {
  formOneEl.addEventListener('submit', handleSubmission);
}

