import { useSearchParams, useNavigate } from 'react-router-dom';
import {MapContainer,  TileLayer,Marker,Popup,useMap,} from 'react-leaflet'
import styles from './Map.module.css';
import { useEffect, useState } from 'react';
import { useCities } from '../Contexts/CitiesContext';


function Map() {
  const [mapPosition, setMapPossition] =useState([40, 0]);
  const {cities} =useCities();
  const navigate= useNavigate()
  const [searchParam]= useSearchParams();
  const mapLat=searchParam.get('lat');
  const mapLng=searchParam.get('lng');

  useEffect(function(){
    if(mapLat || mapLng) setMapPossition([parseFloat(mapLat), parseFloat(mapLng)]);
  },[mapLat,mapLng])


  return (
    <div className={styles.mapContainer} onClick={()=>navigate("form")}>
     <MapContainer className={styles.map} center={mapPosition} zoom={6} scrollWheelZoom={true}>
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
      </MapContainer>
    </div>
  );
}
function ChangeCenter({position}){
  const map =useMap();
  map.setView(position)
  return null;
}

export default Map;