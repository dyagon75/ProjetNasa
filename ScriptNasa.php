<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (isset($_POST['image-date'])) {
    $imageDate = $_POST['image-date'];
    loadImageOfTheDay($imageDate);
  } elseif (isset($_POST['rover-select']) && isset($_POST['rover-date'])) {
    $rover = $_POST['rover-select'];
    $roverDate = $_POST['rover-date'];
    loadRoverPhotos($rover, $roverDate);
  } elseif (isset($_POST['epic-earth'])) {
    loadEpicEarthImage();
  }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  if (!isset($_POST['image-date'])) {
    $currentDate = date('Y-m-d');
    loadImageOfTheDay($currentDate);
  }
}
function loadImageOfTheDay($date)
{
  $apiKey = 'WGjk63nW5f9iLGuAp5c1lUQWvCYMGH31EHwlWphS';
  $apiUrl = "https://api.nasa.gov/planetary/apod?api_key={$apiKey}&date={$date}";

  $response = file_get_contents($apiUrl);
  $data = json_decode($response, true);

  $image = $data['url'];
  $title = $data['title'];
  $formattedDate = "Date: {$data['date']}";
  $explanation = $data['explanation'];

  $responseData = array(
    'image' => $image,
    'title' => $title,
    'date' => $formattedDate,
    'explanation' => $explanation
  );

  header('Content-Type: application/json');
  echo json_encode($responseData);
}


function loadRoverPhotos($rover, $selectedDate)
{
  $apiKey = 'WGjk63nW5f9iLGuAp5c1lUQWvCYMGH31EHwlWphS';
  $apiUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/{$rover}/photos?api_key={$apiKey}&earth_date={$selectedDate}";

  $response = file_get_contents($apiUrl);
  $data = json_decode($response, true);

  $photos = array();
  foreach ($data['photos'] as $photo) {
    $photos[] = $photo['img_src'];
  }

  $responseData = array(
    'photos' => array_slice($photos, 0, 1)
  );
  header('Content-Type: application/json');
  echo json_encode($responseData);
}

function loadEpicEarthImage()
{
}



