let map;
let directionsService;
let directionsRenderer;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 26.8467, lng: 80.9462 }, // Lucknow
    zoom: 12,
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);
}

function bookRide() {
  const pickup = document.getElementById("pickup").value;
  const drop = document.getElementById("drop").value;

  if (!pickup || !drop) {
    alert("Please enter both pickup and drop locations!");
    return;
  }

  const request = {
    origin: pickup,
    destination: drop,
    travelMode: "DRIVING",
  };

  directionsService.route(request, (result, status) => {
    if (status === "OK") {
      directionsRenderer.setDirections(result);
    } else {
      alert("Could not find route. Please try again.");
    }
  });
}
