import { createContext,useState,useEffect, useContext, useReducer } from "react";

const BASE_UR="http://localhost:8000"

const citiesContext=createContext();
const initialState={
  cities:[],
  isLoading:false,
  currentCity:{}
}
function reducer(state, action){
  switch (action.type) {
    case "loading": return{
       ...state,
       isLoading:true
    }
    case "cities/loaded":
      return{
        ...state,
        cities:action.payload,
        isLoading:false
      }
    case "city/loaded":
      return{
        ...state,
        currentCity:action.payload,
        isLoading:false
      }
    case "city/created":
      return{
        ...state,
        cities:[...state.cities,action.payload],
        isLoading:false
      }
    case "City/deleted":
      return{
        ...state,
        cities:state.cities.filter(city=>city.id!==action.payload),
        isLoading:false
      }
      
    default:
      break;
  }
}

function CitiesProvider({children}) {
  // const [cities, setCities]=useState([]);
  // const [isLoading, setIsLoading]=useState(false);
  // const [currentCity, setCurrentCity]=useState({});
  const [{cities,isLoading,currentCity},dispatch]=useReducer(reducer,initialState)

  useEffect(function(){
    dispatch({type:"loading"})
      async function fetchCitiesData() {
        try{const res= await fetch(`${BASE_UR}/cities`);
        const data= await res.json();
        
        dispatch({type:"cities/loaded", payload:data})
        }
        catch{
          alert("error while fetching data");
        }
      }
    fetchCitiesData();
  },[])

  async function getCity(id){
      dispatch({type:"loading"})
      try{const res= await fetch(`${BASE_UR}/cities/${id}`);
        const data= await res.json();
        
        // setCurrentCity(data)
        dispatch({type:"city/loaded", payload: data})
        }
        catch{
          alert("error while fetching data");
        }
    }

     async function setCity(newCity){
        dispatch({type:"loading"})
        try{const res= await fetch(`${BASE_UR}/cities`,{
          method:"POST",
          body: JSON.stringify(newCity),
          headers:{
            "Content-Type":"application/json"
          }
          }
        );
          const data= await res.json();
          // setCities(cities=>[...cities,data]);
          dispatch({type:"city/created",payload:data})
          // console.log(data);
          // setCurrentCity(data)
      }
        catch{
          alert("error while Adding data...");
        }
    }

    async function removeCity(id){
      dispatch({type:"loading"})
        try{
          const res =await fetch(`${BASE_UR}/cities/${id}`,{
            method:"DELETE"
          })
          //Filter deleted city out from json file
          // setCities((cities)=>cities.filter(city=>city.id!==id));
          dispatch({type:"City/deleted",payload:id})
          

        }catch(err){
          alert("Error while deleting data...")
        }
    }
  
  return (
    <citiesContext.Provider value={{
        cities,
        isLoading,
        getCity,
        currentCity,
        setCity,
        removeCity
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