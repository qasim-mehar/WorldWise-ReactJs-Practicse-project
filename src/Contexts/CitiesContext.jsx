import { createContext,useState,useEffect, useContext } from "react";

const BASE_UR="http://localhost:8000"

const citiesContext=createContext();

function CitiesProvider({children}) {
  const [cities, setCities]=useState([]);
  const [isLoading, setIsLoading]=useState(false);
  const [currentCity, setCurrentCity]=useState({});

  useEffect(function(){
    setIsLoading(true);
    async function fetchCitiesData() {
      try{const res= await fetch(`${BASE_UR}/cities`);
      const data= await res.json();
      
      setCities(data)
      }
      catch{
        alert("error while fetching data");
      }finally{
        setIsLoading(false)
      }
    }
    fetchCitiesData();
  },[])

  async function getCity(id){
    setIsLoading(true);
    try{const res= await fetch(`${BASE_UR}/cities/${id}`);
      const data= await res.json();
      
      setCurrentCity(data)
      }
      catch{
        alert("error while fetching data");
      }finally{
        setIsLoading(false)
      }
    }
  
  return (
    <citiesContext.Provider value={{
        cities,
        isLoading,
        getCity,
        currentCity
    }}>
        {children}
    </citiesContext.Provider>
    
  );
}
function useCities(){
    const context=useContext(citiesContext)
    if(context==undefined){
        throw new Error("Cities context used outside of CitiesProvider");
    }
    return context;
}

export  {CitiesProvider, useCities};