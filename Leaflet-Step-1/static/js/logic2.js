// Creating map object
var myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 3
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

// Use this link to get the geojson data.
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

// Grabbing our GeoJSON data..
d3.json(link, function (data) {
    // Creating a GeoJSON layer with the retrieved data
    function color(depth) {
        if (depth > 90) {
            return "#03fc28";
        }
        else if (depth > 50) {
            return "#03fcf0";
        }
        else if (depth > 30) {
            return "#f0fc03";
        }
        else {
            return "#fc0349";
        }
    }

    function distance(maginutude) {
        if (maginutude == 0) {
            return 1; 
        }
        else {
            return maginutude * 3;
        }
    }
       
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng)
        },

        style: function (feature) { return { fillColor: color(feature.geometry.coordinates[2]), radius: distance(feature.properties.mag) } }

        //onEachFeature: 
    }).addTo(myMap);
    console.log(data);
 
});
