let poly;
let map;
const labels = [];
let labelIndex = 1;
const markers = [];
const danau = { lat: -7.286771, lng: 112.796047 };
path = []
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 19,
    center: danau, 
    mapTypeId: "satellite",
  });
  poly = new google.maps.Polyline({ 
    strokeColor: "#ff0000",
    editable: true,
    strokeOpacity: 1.0,
    strokeWeight: 3,
  });
  poly.setMap(map);
  map.addListener("click", addLatLng);
  poly.addListener("dblclick",removeLatLng)
}

function addLatLng(event) {
    path = poly.getPath();

    labels.push(labelIndex++);
    path.push(event.latLng);

    const marker = new google.maps.Marker({
    position: event.latLng,
    title: String(labels[labels.length-1]),
    label: String(labels[labels.length-1]),
    map: map,
    });
    markers.push(marker);
}
function removeItem(array, position){
    var index = array.indexOf(position);
    if (index !== -1) 
        array.splice(index, 1);
}

function removeLatLng(event){
    path = poly.getPath();

    labels.push(labelIndex--);
    console.log(path)
    removeItem(markers,event.latLng)
    
}

function setMapOnAll(map) {
    for (let i of markers.length) {
      markers[i].setMap(map);
    }
  }
  

