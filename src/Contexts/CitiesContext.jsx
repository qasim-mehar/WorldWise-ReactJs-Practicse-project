import { createContext,useState,useEffect, useContext } from "react";

const BASE_UR="http://localhost:8000"

const citiesContext=createContext();

function CitiesProvider({children}) {
  const [cities, setCities]=useState([]);
  const [isLoading, setIsLoading]=useState(false);

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
  return (
    <citiesContext.Provider value={{
        cities,
        isLoading
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