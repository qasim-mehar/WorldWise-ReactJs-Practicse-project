// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import { useURLPosition } from "../../Hooks/useURLPosition";

import Button from "./Button";
import BackButton from "./BackButton";
import Spinner from "./Spinner"
import Message from "./Message"
import { useCities } from "../Contexts/CitiesContext";


export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding]=useState(false);
  const [emoji, setEmoji]=useState("");
  const [geocodingError, setGeocodingError]=useState("")
  const navigate= useNavigate()
  const [lat,lng]=useURLPosition()
  const {setCity, isLoading}=useCities();

  useEffect(function(){
    if(!lat && !lng) return;
    async function fetchGeocodingData(){
      try{
        setGeocodingError("")
        setIsLoadingGeoCoding(true);

        const res =await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
        if(!res.ok) throw new Error("Something Went Wrong");
        const data=await res.json();

        if(!data.countryCode) throw new Error("That doesn't seem to be a city 🥲");

       setCityName(data.city || data.locality || "");
       setCountry(data.countryName);
       setEmoji(convertToEmoji(data.countryCode))
        
      }catch(err){
        setGeocodingError(err.message)
      }
      finally{
        setIsLoadingGeoCoding(false);
      }
    }
  fetchGeocodingData();
  
  },[lat,lng])

 async function handleSubmit(e){
    e.preventDefault();
    if(!country || !date)  return;
    const newCity={
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng
      } 
    }
    //Since setCity is a async func so if we will not use await it can navigate programatically to cities page without city addition in th elist
    await setCity(newCity);
    navigate("/app/cities")
  }
  if(!lat&&!lng) return <Message message='Start by clicking on somewhere on the map! 😼'/>
  if(isLoadingGeoCoding) return <Spinner/>
  if(geocodingError) return <Message message={geocodingError}/>
  return (
    <form className={`${styles.form} ${isLoading? styles.loading:""}`} onSubmit={handleSubmit}>
      
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker id="date" selected={date} onChange={date=>setDate(date)}/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={'primary'}>Add</Button>
        <BackButton/>
      </div>
    </form>
  );
}

export default Form;
