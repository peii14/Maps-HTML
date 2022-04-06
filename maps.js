let poly;
let map;
const labels = [];
let labelIndex = 1;

const danau = { lat: -7.286771, lng: 112.796047 }; 
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
}

function addLatLng(event) {
  const path = poly.getPath();

    labels.push(labelIndex++);
    let latest = labels.length-1;

    console.log(labels)

    path.push(event.latLng);

    new google.maps.Marker({
    position: event.latLng,
    title: "#" + path.getLength(),
    label: String(labels[latest]),
    map: map,
  });
}
