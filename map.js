var mymap = L.map('mapid').setView([0,-16], 2.5);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.dark',
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
function choroplethizeEconomicFreedom2018(d) {
    return d > 150 ? '#0c2c84' :
    d > 122 ? '#225ea8' :
    d > 95 ? '#1d91c0' :
    d > 67 ? '#41b6c4' :
    d > 39 ? '#7fcdbb' :
    d > 13 ? '#c7e9b4' :
                    '#ffffcc';
}
function qualitativeColorsCategory2018(d) {
    return d === "Free" ? '#4575b4' :
    d === "Moderately Free" ? '#91bfdb' :
    d === "Mostly Free Economies" ? '#e0f3f8' :
    d === "Mostly Unfree" ? '#fee090' :
    d === "Not Ranked" ? '#fc8d59' :
    d === "Repressed" ? '#d73027' :
                    '#000000';
}
function choroplethizeCorruptionIndex2017(d) {
    return d > 153 ? '#b10026' :
    d > 122 ? '#e31a1c' :
    d > 96 ? '#fc4e2a' :
    d > 74 ? '#fd8d3c' :
    d > 48 ? '#feb24c' :
    d > 21 ? '#fed976' :
            '#ffffb2';
}
function choroplethizeGNIPerCapita2017(d) {
    return d > 61070 ? '#fee5d9' :
    d > 46310 ? '#fcbba1' :
    d > 31430 ? '#fc9272' :
    d > 20240 ? '#fb6a4a' :
    d > 10140 ? '#ef3b2c' :
    d > 3560 ? '#cb181d' :
            '#99000d';
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
function styleFreedom(feature) {
    return {
        weight: .75,
        opacity: 0.5,
        color: 'grey',
        dashArray: '0',
        fillOpacity: 0.9,
        fillColor: choroplethizeEconomicFreedom2018(feature.properties.Economic_Freedom_Rank_2018)
    }
}
function styleCategories(feature) {
    return {
        weight: .75,
        opacity: 0.5,
        color: 'grey',
        dashArray: '0',
        fillOpacity: 0.9,
        fillColor: qualitativeColorsCategory2018(feature.properties.Category)
    }
}
function styleCorruption(feature) {
    return {
        weight: .75,
        opacity: 0.5,
        color: 'grey',
        dashArray: '0',
        fillOpacity: 0.9,
        fillColor: choroplethizeCorruptionIndex2017(feature.properties.indices2018_Corruption_Index_2017)
    }
}
function styleGNIPerCapita(feature) {
    return {
        weight: .75,
        opacity: 0.5,
        color: 'grey',
        dashArray: '0',
        fillOpacity: 0.9,
        fillColor: choroplethizeGNIPerCapita2017(feature.properties.indices2018_GNI_Per_Capita2017)
    }
}
// CREAR CAJAS AL MOMENTO DE HACER CLIC
function geojsonPopupPopulation(feature, layer) {
    if (feature.properties.NAME_LONG) {
        return layer.bindPopup('Country:   ' + feature.properties.NAME_LONG + '<br>2017 Population: ' + numberWithCommas(feature.properties.POP_EST))
    }
}
function geojsonPopupFreedom(feature, layer) {
    if (feature.properties.NAME_LONG) {
        return layer.bindPopup('Country:   ' + feature.properties.NAME_LONG + '<br>2018 Economic Freedom Index: '
         + feature.properties.Economic_Freedom_Rank_2018
         + '<br>Category: ' + feature.properties.Category)
    }
}
function geojsonPopupCategory(feature, layer) {
    if (feature.properties.NAME_LONG) {
        return layer.bindPopup('Country:   ' + feature.properties.NAME_LONG + '<br>2018 Economic Freedom Index: '
         + feature.properties.Economic_Freedom_Rank_2018
         + '<br>Category: ' + feature.properties.Category)
    }
}
function geojsonPopupCorruption(feature, layer) {
    if (feature.properties.NAME_LONG) {
        return layer.bindPopup('Country:   ' + feature.properties.NAME_LONG + '<br>2017 Corruption Index: '
         + feature.properties.indices2018_Corruption_Index_2017
         + '<br>Category: ' + feature.properties.Category)
    }
}
function geojsonPopupGNIPerCapita(feature, layer) {
    if (feature.properties.NAME_LONG) {
        return layer.bindPopup('Country:   ' + feature.properties.NAME_LONG + '<br>2017 GNI Per Capita: '
         + feature.properties.indices2018_GNI_Per_Capita2017
         + '<br>GNI Per Capita Ranking: ' + feature.properties.indices2018_GNI_Per_Capita_Rank2017)
    }
}
// CREAR VARIABLES PARA LAS CAPAS
// DEL MISMO ARCHIVO JSON
var PopulationLayer = L.geoJSON(countries, {
    style: stylePopulation,
    onEachFeature: geojsonPopupPopulation,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng);
    }
});
var FreedomLayer = L.geoJSON(countries, {
    style: styleFreedom,
    onEachFeature: geojsonPopupFreedom,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng);
    }
});
var CategoryLayer = L.geoJSON(countries, {
    style: styleCategories,
    onEachFeature: geojsonPopupCategory,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng);
    }
});
var CorruptionLayer = L.geoJSON(countries, {
    style: styleCorruption,
    onEachFeature: geojsonPopupCorruption,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng);
    }
});
var GNIPerCapitaLayer = L.geoJSON(countries, {
    style: styleGNIPerCapita,
    onEachFeature: geojsonPopupGNIPerCapita,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng);
    }
});

// dibujar al mapa
CategoryLayer.addTo(mymap);
var featureLayers = {
    "2017 Population": PopulationLayer,
    "2017 Corruption": CorruptionLayer,
    "2017 GNI Per Capita": GNIPerCapitaLayer,
    "2018 Economic Freedom Index": FreedomLayer,
    "2018 Category": CategoryLayer
};
var geojson = L.control.layers(featureLayers, null, {
    collapsed: false
}).addTo(mymap);

// LEGEND STARTS HERE
var Population2017Legend = L.control({ position: 'bottomright' });
var Corruption2017Legend = L.control({ position: 'bottomright' });
var GNIPerCapita2017Legend = L.control({ position: 'bottomright' });
var Freedom2018Legend = L.control({ position: 'bottomright' });
var Category2018Legend = L.control({ position: 'bottomright' });

Population2017Legend.onAdd = function (mymap) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 13026129, 35623680, 68414135, 105350020, 157826578, 326625791, 1379302771],
        labels = ['2017 Population'],
        fromLabel, from, toLabel, to;
    for (var i = 0; i < grades.length-1; i++) {
        from = grades[i];
        fromLabel = numberWithCommas(grades[i]);
        to = grades[i + 1];
        toLabel = numberWithCommas(grades[i + 1]);
        labels.push(
            '<i style="background:' + choroplethizePopulation2017(from + 1) + '"></i> ' +
            fromLabel + (toLabel ? ' - ' + toLabel : ' - 1,379,302,771'));
            // last value of 1 billion on line 76 not currently being used
            // kept as placemarker 
    }
    div.innerHTML = labels.join('<br>');
    return div;
};
Freedom2018Legend.onAdd = function (mymap) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 13, 39, 67, 95, 122, 150],
        labels = ['2018 Freedom Index'],
        from, to;
    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];
        labels.push(
            '<i style="background:' + choroplethizeEconomicFreedom2018(from + 1) + '"></i> ' +
            from + (to ? ' - ' + to : ' - 179'));
    }
    div.innerHTML = labels.join('<br>');
    return div;
};
Category2018Legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [1,2,3,4,5,6,7],
        gradeLabel = ['Free', 'Moderately Free', 'Mostly Free Economies',
    'Mostly Unfree', 'Not Ranked', 'Repressed'],
        labels = ['Category 2018'],
        num,code;
    for (var i = 1; i <= 7; i++) {
        num = grades[i];
        code = gradeLabel[i-1];
        labels.push(
            '<i style="background:' + qualitativeColorsCategory2018(code) + '"></i> ' +
            code);
    }
    div.innerHTML = labels.join('<br>');
    return div;
};
Corruption2017Legend.onAdd = function (mymap) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 21, 48, 74, 96, 122, 153],
        labels = ['2017 Corruption Index'],
        from, to;
    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];
        labels.push(
            '<i style="background:' + choroplethizeCorruptionIndex2017(from + 1) + '"></i> ' +
            from + (to ? ' - ' + to : ' - 180'));
    }
    div.innerHTML = labels.join('<br>');
    return div;
};
GNIPerCapita2017Legend.onAdd = function (mymap) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 3560, 10140, 20240, 31430, 46310, 61070],
        labels = ['2017 GNI Per Capita'],
        from, to;
    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];
        labels.push(
            '<i style="background:' + choroplethizeGNIPerCapita2017(from + 1) + '"></i> ' +
            from + (to ? ' - ' + to : ' - 80560'));
    }
    div.innerHTML = labels.join('<br>');
    return div;
};
Category2018Legend.addTo(mymap);
let currentLegend = Category2018Legend;

// LEGEND Box
mymap.on('baselayerchange', function (eventLayer) {
    if (eventLayer.name === '2017 Population') {
        mymap.removeControl(currentLegend);
        currentLegend = Population2017Legend;
        Population2017Legend.addTo(mymap);
    }
    else if (eventLayer.name === '2017 Corruption') {
        mymap.removeControl(currentLegend);
        currentLegend = Corruption2017Legend;
        Corruption2017Legend.addTo(mymap);
    }
    else if (eventLayer.name === '2017 GNI Per Capita') {
        mymap.removeControl(currentLegend);
        currentLegend = GNIPerCapita2017Legend;
        GNIPerCapita2017Legend.addTo(mymap);
    }
    else if (eventLayer.name === '2018 Economic Freedom Index') {
        mymap.removeControl(currentLegend);
        currentLegend = Freedom2018Legend;
        Freedom2018Legend.addTo(mymap);
    }
    else if (eventLayer.name === '2018 Category') {
        mymap.removeControl(currentLegend);
        currentLegend = Category2018Legend;
        Category2018Legend.addTo(mymap);
    }
});