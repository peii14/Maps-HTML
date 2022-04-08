let missionPath,map;
let marker = null;
const labels = [];
let labelIndex = 1;
let markers = [];
const danau = { lat: -7.286771, lng: 112.796047 };
const lyon = { lat: 45.758737,lng: 4.868144};
// 
let path = []
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: lyon, 
    mapTypeId: "satellite",
  });
  missionPath = new google.maps.Polyline({ 
    strokeColor: "#ff0000",
    editable:true,
    strokeOpacity: 1.0,
    strokeWeight: 3,
    zindex: 5
  });
  missionPath.setMap(map);
//   event listener
  map.addListener("click", addLatLng);
  google.maps.event.addListener(missionPath, 'rightclick', deleteNode);
  google.maps.event.addListener(missionPath.getPath(), "set_at", changedPath);

}
function setMapOnAll(map) {
    for (let i =0 ;i<markers.length;i++) {
      markers[i].setMap(null);
    }
  }
  
var deleteNode = function(mev) {
    if (mev.vertex != null) {
      missionPath.getPath().removeAt(mev.vertex);
      labels.pop();
      
    labelIndex -= 1;
    markers[mev.vertex].setMap(null)
    markers.splice(mev.vertex,1)
    for( let i = mev.vertex; i < markers.length;i++)
        markers[i].setLabel(String(i+1))
    }
}
var changedPath = function(e) {
    var path = missionPath.getPath();
    var len = path.getLength();
    
    setMapOnAll(null);
    markers = [];
    labelIndex = 0;
    
    for (var i = 0; i < len; i++) {
        marker = new google.maps.Marker({
            position: path.getAt(i),
            title: String(i+1),
            label: String(i+1),
            map: map,
            editable: true,
            draggable: true,
            zIndex:0
        });
        markers.push(marker); 
    }
    
    
}

function addLatLng(event) {
    path = missionPath.getPath();

    labels.push(labelIndex++);
    path.push(event.latLng);
    
    marker = new google.maps.Marker({
        position: event.latLng,
        title: String(labels[labels.length-1]),
        label: String(labels[labels.length-1]),
        map: map,
        editable: true,
        draggable: true,
        zIndex:0
    });
    markers.push(marker);
    
}
  

