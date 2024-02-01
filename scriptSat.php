<?php

if (isset($_POST['nom'])) {
    $nomSatellite = $_POST['nom'];

    // Connexion à la base de données MySQL
    $serveur = "localhost";
    $utilisateur = "root";
    $motDePasse = "";
    $baseDeDonnees = "bdd_sat";

    $connexion = new mysqli($serveur, $utilisateur, $motDePasse, $baseDeDonnees);

    // Vérifier la connexion
    if ($connexion->connect_error) {
        die("La connexion à la base de données a échoué : " . $connexion->connect_error);
    }

    // Échapper les caractères spéciaux pour éviter les injections SQL
    $nomSatellite = $connexion->real_escape_string($nomSatellite);

    // Requête pour récupérer les informations du satellite en fonction du numéro
    $sql = "SELECT Num_Sat FROM nom WHERE Nom_Sat = '$nomSatellite'";
    $resultat = $connexion->query($sql);

    if ($resultat->num_rows > 0) {
        $row = $resultat->fetch_assoc();
        $numSatellite = $row['Num_Sat'];

        //----

        $api_url = 'http://tle.ivanstanojevic.me/api/tle';

        function getTLEData($searchQuery)
        {
            global $api_url;
            $query = urlencode($searchQuery);
            $request_url = "{$api_url}/{$query}";

            $response = file_get_contents($request_url);
            return json_decode($response, true);
        }

        $tles = getTLEData($numSatellite);

        if (!empty($tles) && isset($tles['line1']) && isset($tles['line2']) && isset($tles['name']) && isset($tles['satelliteId']) && isset($tles['date'])) {
            echo '<div class="tle-info">';
            echo '<h2>Informations TLE pour le satellite ' . $tles['name'] . '</h2>';
            echo '<p><strong>ID Satellite :</strong> ' . $tles['satelliteId'] . '</p>';
            echo '<p><strong>Date :</strong> ' . $tles['date'] . '</p>';
            echo '<p><strong>Ligne 1 :</strong> ' . $tles['line1'] . '</p>';
            echo '<p><strong>Ligne 2 :</strong> ' . $tles['line2'] . '</p>';
            echo '</div>';

        } else {
            echo '<p>Données TLE non disponibles pour ce satellite.</p>';
        }
    }

    // Fermer la connexion à la base de données
    $connexion->close();
}

?>