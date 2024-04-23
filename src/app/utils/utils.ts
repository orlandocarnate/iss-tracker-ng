import * as THREE from 'three';

export const convertToRadians = (radius: number, latitude: number, longitude: number): THREE.Vector3 => {
    //   console.log("Lat:", latitude, "Long: ", longitude);
    const earthRadius = radius; // in km
    let radLat = (latitude * Math.PI) / 180;
    let radLong = (longitude * Math.PI) / 180;
  //   console.log(radLat, radLong);
  
    let x = -earthRadius * Math.cos(radLat) * Math.cos(radLong);
    let y = earthRadius * Math.sin(radLat);
    let z = earthRadius * Math.cos(radLat) * Math.sin(radLong);
  
    return new THREE.Vector3(x, y, z);
  };