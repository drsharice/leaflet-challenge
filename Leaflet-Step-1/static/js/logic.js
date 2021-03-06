// Creating map object
var myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 3
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "? <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> ? <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

// Store API query variables
var url  = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";




// Grab the data with d3
d3.json(url, function (response) {

    // Create a new marker cluster group
    var markers = L.markerClusterGroup();

    // Loop through data
    for (var i = 0; i < response.length; i++) {

        // Set the data location property to a variable
        var location = response[i].location;

        // Check for location property
        if (location) {

            // Add a new marker to the cluster group and bind a pop-up
            markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
                .bindPopup(response[i].descriptor));
        }

    }

    // Add our marker cluster layer to the map
    myMap.addLayer(markers);

});
