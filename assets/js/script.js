var containerEL = document.querySelector('.results-container');
var inputEl = document.querySelector('#inputDefault');
var formEl = document.querySelector('#form');

// DEFINING FUNCTIONS
var handleSubmission = function (event) {
  event.preventDefault();
  // removes HTML from results container
  var search = inputEl.value.trim();
  search=search.replace(" ","%20");
  // Translates city name to coordinates
  console.log(search);
  
  // NEED TO CHANGE TO SECOND HTML PAGE
  // location.replace('search-results.html');
  // document.querySelector('#searchContainer').innerHTML = '';
  fetchTrackID(search);
};

// SEARCH FOR RESULTS
var fetchTrackID = function (searchTerms) {
  // Element container to attach results
  var resultContainerEl = document.querySelector('.result-container');

  // Search track URL template
  var apiTrackID = `http://api.musixmatch.com/ws/1.1/track.search?apikey=fe0a8c874884f61f197aa259a3450876&q${searchTerms}&page_size=20`;

  // var apiTrackID = `https://api.musixmatch.com/ws/1.1/track.search?apikey=fe0a8c874884f61f197aa259a3450876&q_artist=Ariana%20Grande&q_track=God%20is%20a%20woman&page_size=2`;

  
  // Fetching data from Musicmatch for search results; returning trackID
  fetch (apiTrackID)
    .then(function (response) {
      if (response.ok) {
      response.json()
      .then(function (data) {
        console.log(data.length);
        for (var i = 0; i < data.length; i++) {
          // Creating elements on loop
          var resultEl = document.createElement('div');
          var resultHeaderEl = document.createElement('h2');
          var resultTextEl = document.createElement('p');
          // Adding classes
          resultEl.classList.add('result');
          resultHeaderEl.classList.add('result-header');
          resultTextEl.classList.add('.result-text')
          // Adding text content - replace with data from API pull
          resultHeaderEl.textContent = 'Toxic - Britney Spears'; 
          resultTextEl.textContent = 'Lorem ipsisjw iwfwjjrwijjijvjrij ivjijis djivjijvisje ijwiejgfisih sdcfaehfhsfi sifhhfisdhfi  shfhifosh hosdhgo';
          // Appending elements
          resultEl.append(resultHeaderEl, resultTextEl);
          resultContainerEl.append(resultEl)
        };
      });
    }});
};

var fetchLyrics = function (trackID) {
  // Element container to attach track information
  var trackContainerEl = document.querySelector('.track-container');

  // Search for lyrics URL template
  var apiLyrics = `http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackID}&apikey=fe0a8c874884f61f197aa259a3450876`;
  
  // Fetching data from Musixmatch for search results
  fetch (apiLyrics)
    .then(function (response) {
      if (response.ok) {
      response.json()
      .then(function (data) {
        console.log(data.length);
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
    }});
};

var fetchVideo = function (variable) {
  // Element container to attach track information
  var trackContainerEl = document.querySelector('.track-container');

  // Need variable to pass into Youtube search function

  // Search for lyrics URL template
  var apiVideo = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerms}key=AIzaSyBjmcNPYyG9kBMKxEBBj5x6rjJ4yvMj18g`;
  
  // Fetching data from Musixmatch for search results
  fetch (apiVideo)
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
    }});
};

formEl.addEventListener('submit', handleSubmission);