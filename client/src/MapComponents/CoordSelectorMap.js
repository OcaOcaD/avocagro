import React, { useState } from "react";
import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  Polygon,
  Circle
} from "google-maps-react";

export const MapContainer = (props) => {
  console.log("map props:", props);
  console.log("map props:", props);

  const polygonCoords = [
    { lat: 19.715039451649513, lng: -103.47234885114328 },
    { lat: 19.70092922238785, lng: -103.46857230104875 },
    { lat: 19.70143426280472, lng: -103.46118013346573 },
    { lat: 19.706625985860867, lng: -103.4610084720995 },
    { lat: 19.709778926816746, lng: -103.455465190628}
  ];
  const inside = (point, vs) => {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html
    var x = point[0],
      y = point[1];
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0],
        yi = vs[i][1];
      var xj = vs[j][0],
        yj = vs[j][1];
      var intersect =
        yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  };
  const moveMarker = (coord) => {
    console.log("marker moving:", coord);

    // prepare polygon coords to be processed
    const pol = [];
    for (const coord of polygonCoords) {
      pol.push([coord.lat, coord.lng]);
    }
    //prepare point to compare inside the polygons
    let p = [coord.latLng.lat(), coord.latLng.lng()];
    // compare if point inside polygon
    // console.log("checking if inside", p, pol);
    let result = inside(p, pol);
    //Show result in HOC
    props.markerDragged(coord, result);
    console.log("result:", result);
  };

  //
  return (
    <Map
      google={props.google}
      initialCenter={{
        lat: 19.704686684906957,
        lng: -103.46344391776633,
      }}
      // bounds={bounds}
      zoom={16}
    >
      <Marker
        title="Location"
        id={1}
        position={props.markerPosition}
        draggable={true}
        onDragend={(t, map, coord) => moveMarker(coord)}
        
      ></Marker>
      <Circle
        radius={props.size}
        center={props.markerPosition}
        // onMouseover={() => console.log('mouseover')}
        // onClick={() => console.log('click')}
        // onMouseout={() => console.log('mouseout')}
        strokeColor='transparent'
        strokeOpacity={0}
        strokeWeight={5}
        fillColor='#FF0000'
        fillOpacity={0.2}
      />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyC4kmZBsr256XEgb7P2psWTocdOJjcTFlQ",
  libraries: ["geometry", "places"],
})(MapContainer);
