// ShareButtons.js

// ShareButtons.js

// Fonction pour ouvrir une fenêtre de partage
function openShareWindow(url) {
    window.open(url, '_blank', 'width=600,height=400');
  }
  
// Écouter les clics sur les boutons de partage
document.getElementById('facebook-share-button').addEventListener('click', function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien
    var shareUrl = this.href;
    openShareWindow(shareUrl);
  });
  
  document.getElementById('twitter-share-button').addEventListener('click', function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien
    var shareUrl = this.href;
    openShareWindow(shareUrl);
  });
  
  document.getElementById('instagram-share-button').addEventListener('click', function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien
    var shareUrl = this.href;
    openShareWindow(shareUrl);
  });