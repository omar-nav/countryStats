var mymap = L.map('mapid').setView([0,-16], 2);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoib21hci1uYXZhcnJvIiwiYSI6ImNpanN2ZWZxZzBoa291eWx4ZWdsajl1OGIifQ.SH4OG9811nirTGJ3rE4DHw'
}).addTo(mymap);

// funcion global para agregar comas
const numberWithCommas = (from) => {
    return from.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

// COLORES
function choroplethizePopulation2017(d) {
    return d > 326625791 ? '#91003f' :
    d > 157826578 ? '#ce1256' :
    d > 105350020 ? '#e7298a' :
    d > 68414135 ? '#df65b0' :
            d > 35623680 ? '#c994c7' :
                d > 13026129 ? '#d4b9da' :
                    '#f1eef6';
}

// PINTAR LAS FIGURAS CON LOS COLORES
function stylePopulation(feature) {
    return {
        weight: .75,
        opacity: 0.5,
        color: 'grey',
        dashArray: '0',
        fillOpacity: 0.9,
        fillColor: choroplethizePopulation2017(feature.properties.POP_EST)
    }
}
// CREAR CAJAS AL MOMENTO DE HACER CLIC
function geojsonPopupPopulation(feature, layer) {
    if (feature.properties.NAME_LONG) {
        return layer.bindPopup('Country:   ' + feature.properties.NAME_LONG + '<br>Population in 2017:   ' + numberWithCommas(feature.properties.POP_EST))
    }
}

// CREAR VARIABLES PARA LAS CAPAS
var PopulationLayer = L.geoJSON(countries, {
    style: stylePopulation,
    onEachFeature: geojsonPopupPopulation,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng);
    }
});

// dibujar al mapa
PopulationLayer.addTo(mymap);
var featureLayers = {
    "Population 2017": PopulationLayer
};
var geojson = L.control.layers(featureLayers, null, {
    collapsed: false
}).addTo(mymap);

// LEGEND STARTS HERE
var Population2017Legend = L.control({ position: 'bottomright' });
Population2017Legend.onAdd = function (mymap) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 13026129, 35623680, 68414135, 105350020, 157826578, 326625791],
        labels = ['Country Population in 2017'],
        fromLabel, from, to;
    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        fromLabel = numberWithCommas(grades[i]);
        to = grades[i + 1];
        labels.push(
            '<i style="background:' + choroplethizePopulation2017(from + 1) + '"></i> ' +
            fromLabel + (to ? ' - ' + to : ' - 1379302771'));
    }
    div.innerHTML = labels.join('<br>');
    return div;
};

Population2017Legend.addTo(mymap);
let currentLegend = Population2017Legend;

// LEGEND Box
mymap.on('baselayerchange', function (eventLayer) {
    if (eventLayer.name === 'Population 2017') {
        mymap.removeControl(currentLegend);
        currentLegend = Population2017Legend;
        Population2017Legend.addTo(mymap);
    }
    // else if (eventLayer.name === 'Homicidios 2016') {
    //     mymap.removeControl(currentLegend);
    //     currentLegend = Homicidios2016Legend;
    //     Homicidios2016Legend.addTo(mymap);
    // }
});