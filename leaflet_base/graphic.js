var pym = require("./lib/pym");
var ANALYTICS = require("./lib/analytics");
require("./lib/webfonts");
var { isMobile } = require("./lib/breakpoints");


var d3 = {
    ...require("d3-array/dist/d3-array.min"),
    ...require("d3-axis/dist/d3-axis.min"),
    ...require("d3-scale/dist/d3-scale.min"),
    ...require("d3-selection/dist/d3-selection.min")
  };

// Map colors & styles

var colors = {
    'brown': '#6b6256','tan': '#a5a585','ltgreen': '#70a99a','green': '#449970','dkgreen': '#31716e','ltblue': '#55b7d9','blue': '#358fb3','dkblue': '#006c8e','yellow': '#f1bb4f','orange': '#f6883e','tangerine': '#e8604d','red': '#cc203b','pink': '#c72068','maroon': '#8c1b52','purple': '#571751'
};

var map_styles = {
	'dark': 'stlpr/ckbco8znk10cn1jlz0d8kpr7n',
	'light': 'stlpr/ckbcob9ja0p2q1it4nwvvx9zs',
	'satellite': 'stlpr/ckbcolxk2040t1jmlxiwd503j'
}

// Map calibration

var northEast = L.latLng(38.778912, -90.151062),
    southWest = L.latLng(38.556959, -90.461426),
    bounds = L.latLngBounds(southWest, northEast);

var map = L.map('map', {scrollWheelZoom: false, attribution: ''}).setView([38.673945, -90.273416], 11).setMaxBounds(bounds);

var tiles = L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: map_styles.dark,
      accessToken:
        "pk.eyJ1Ijoic3RscHIiLCJhIjoicHNFVGhjUSJ9.WZtzslO6NLYL8Is7S-fdxg",
    }
  ).addTo(map);

var svg = d3.select(map.getPanes().overlayPane).append("svg"),
    g = svg.append("g").attr("class", "leaflet-zoom-hide");

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend')

    // Legend with strings
    div.innerHTML = '<i style="background:' + colors.pink + '"></i> Item 1 <br> <i style="background:' + colors.ltblue + '; margin-top: 4px"></i> Item 2';

    return div;
};

    legend.addTo(map);


pym.then(child => {
    child.sendHeight();

    // child.onMessage("on-screen", function(bucket) {
    //     ANALYTICS.trackEvent("on-screen", bucket);
    // });
    // child.onMessage("scroll-depth", function(data) {
    //     data = JSON.parse(data);
    //     ANALYTICS.trackEvent("scroll-depth", data.percent, data.seconds);
    // });
    
    window.addEventListener("resize", () => child.sendHeight());
});
