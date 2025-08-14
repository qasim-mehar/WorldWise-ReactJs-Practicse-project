import { useSearchParams, useNavigate } from 'react-router-dom';
import {MapContainer,  TileLayer,Marker,Popup,useMap,} from 'react-leaflet'
import styles from './Map.module.css';
import { useState } from 'react';
import { useCities } from '../Contexts/CitiesContext';


function Map() {
  const [mapPosition, setMapPossition] =useState([40, 0]);
  const {cities} =useCities();
  const navigate= useNavigate()
  const [searchParam, setSearchParam]= useSearchParams();
  const lat=searchParam.get('lat');
  const lng=searchParam.get('lng');



  return (
    <div className={styles.mapContainer} onClick={()=>navigate("form")}>
     <MapContainer className={styles.map} center={mapPosition} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map(city=><Marker position={[city.position.lat, city.position.lng]} key={city.id}>
          <Popup>
            <span>{city.emoji}</span> <span>{city.cityName}</span>
          </Popup>
        </Marker>)}
      </MapContainer>
    </div>
  );
}

export default Map;