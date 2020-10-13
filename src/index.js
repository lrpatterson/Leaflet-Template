const L = require("leaflet");
var esri = require("esri-leaflet");
var gcs = require("esri-leaflet-geocoder");

var map = L.map("mapid").setView([35.349907, -80.54998], 9);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// GEOCODING SEARCH
var geocoder = gcs.geocodeServiceProvider({
  url:
    "https://location.cabarruscounty.us/arcgisservices/rest/services/Website/NewComposite_1/GeocodeServer",
  maxResults: 500,

  useCors: true
});
var results = L.layerGroup().addTo(map);
var searchControl = gcs
  .geosearch({
    position: `topleft`,
    allowMultipleResults: true,
    useMapBounds: false,

    placeholder: "Search PIN, Owner, or Address...",
    providers: [geocoder]
  })
  .addTo(map);

searchControl.on(`results`, function (data) {
  results.clearLayers();
  for (var i = data.results.length - 1; i >= 0; i--) {
    results.addLayer(L.marker(data.results[i].latlng));
  }
});

searchControl.on(`requestend`, function (data) {
  console.log(data);
});
