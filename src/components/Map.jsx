import { useSearchParams, useNavigate } from 'react-router-dom';
import {MapContainer,  TileLayer,Marker,Popup,useMap, useMapEvent,} from 'react-leaflet'
import styles from './Map.module.css';
import { useEffect, useState } from 'react';
import { useCities } from '../Contexts/CitiesContext';
import { useGeolocation } from '../../Hooks/useGeoLocation';
import { useURLPosition } from '../../Hooks/useURLPosition';
import Button from "./Button"


function Map() {
  const navigate= useNavigate()
  const [mapPosition, setMapPossition] =useState([40,0]);
  const {cities} =useCities();
  const [mapLat,mapLng]=useURLPosition()
  const {isLoading :isLoadingPosition, position:geolocationPosition, getPosition}=useGeolocation(null);
 

  useEffect(function(){
    //Always parseFloat() query params.
    if(mapLat || mapLng) setMapPossition([parseFloat(mapLat), parseFloat(mapLng)]);
  },[mapLat,mapLng])

useEffect(function(){
  console.log(geolocationPosition);
 if(geolocationPosition){setMapPossition([parseFloat(geolocationPosition.lat),parseFloat(geolocationPosition.lng)]);}
// console.log([geolocationPosition.lat,geolocationPosition.lng]);
},[geolocationPosition])

  return (
    <div className={styles.mapContainer} onClick={()=>navigate("form")}>
     <MapContainer className={styles.map} center={mapPosition} zoom={6} scrollWheelZoom={true}>
      {!geolocationPosition&&<Button type="position" onClick={()=>getPosition()}>{isLoadingPosition?"Loading...":"Get you Loction"}</Button>}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map(city=><Marker position={[city.position.lat, city.position.lng]} key={city.id}>
          <Popup>
            <span>{city.emoji}</span> <span>{city.cityName}</span>
          </Popup>
        </Marker>)}
        <ChangeCenter position={mapPosition}/>
        <DetectClick/>
      </MapContainer>
    </div>
  );
}

function ChangeCenter({position}){
  const map =useMap();
  map.setView(position)
  return null;
}
 
function DetectClick(){
   const navigate= useNavigate()
  useMapEvent({
    click:(e)=> navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  })
}

export default Map;