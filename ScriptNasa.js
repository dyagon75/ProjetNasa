// Chargement de l'image du jour
// Chargement de l'image du jour
// Au chargement de la page, afficher uniquement la section "Image of the Day"
document.addEventListener('DOMContentLoaded', function() {
    showSection('image-of-the-day');
  });
  

  // Ajout de la fonction pour mettre à jour les liens de partage
// Ajout de la fonction pour mettre à jour les liens de partage
function updateShareLinks(imageUrl) {
  var facebookShareButton = document.getElementById('facebook-share-button');
  var twitterShareButton = document.getElementById('twitter-share-button');
  var instagramShareButton = document.getElementById('instagram-share-button');
  
  // Mettre à jour les liens de partage avec l'URL de l'image
  facebookShareButton.href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(imageUrl);
  twitterShareButton.href = 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(imageUrl);
  instagramShareButton.href = 'https://www.instagram.com/?url=' + encodeURIComponent(imageUrl);
}

// Écouter les clics sur les liens de navigation
document.querySelectorAll('nav a').forEach(function(link) {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    var targetSection = this.getAttribute('href').substring(1);
    showSection(targetSection);
  });
});

  


  // Afficher la section cible et masquer les autres sections
  function showSection(sectionId) {
    document.querySelectorAll('section').forEach(function(section) {
      if (section.id === sectionId) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    });
  }

document.getElementById('date-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var imageDate = document.getElementById('image-date').value;
    loadImageOfTheDay(imageDate);
  });
  
  function loadImageOfTheDay(date) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'ScriptNasa.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        document.getElementById('nasa-image').src = response.image;
        document.getElementById('title').textContent = response.title;
        document.getElementById('date').textContent = response.date;
        document.getElementById('explanation').textContent = response.explanation;

        updateShareLinks(response.image);
      }
    };
    var params = 'image-date=' + encodeURIComponent(date);
    xhr.send(params);
  }
  
  // Chargement des photos du rover
  document.getElementById('rover-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var rover = document.getElementById('rover-select').value;
    var roverDate = document.getElementById('rover-date').value;
    loadRoverPhotos(rover, roverDate);
  });
  
  function loadRoverPhotos(rover, selectedDate) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'ScriptNasa.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        var photos = response.photos;
        if (photos.length > 0) {
          var photoHTML = '<img src="' + photos[0] + '" alt="Mars Rover Photo">';
          document.getElementById('rover-photos').innerHTML = photoHTML;
        } else {
          document.getElementById('rover-photos').innerHTML = 'No photo available for selected date';
        }
      }
    };
    var params = 'rover-select=' + encodeURIComponent(rover) + '&rover-date=' + encodeURIComponent(selectedDate);
    xhr.send(params);
  }
  // Chargement de l'image du jour au chargement de la page
// Chargement de l'image du jour au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
  var currentDate = new Date().toISOString().split('T')[0];
  loadImageOfTheDay(currentDate);
  loadEpicEarthImage(); // Charger automatiquement l'image de la Terre au chargement de la page
});

// Ajoutez cet événement pour charger l'image de la Terre lorsque le bouton est cliqué
document.getElementById('load-epic-earth').addEventListener('click', function(event) {
  event.preventDefault(); // Empêche le comportement par défaut du bouton
  loadEpicEarthImage(); // Appel de la fonction pour charger l'image de la Terre
});

function loadEpicEarthImage() {
 
}



  