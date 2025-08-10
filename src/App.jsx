import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Homepage from './pages/homepage'
import Pricing from './pages/Pricing'
import Product from './pages/product'
import Login from "./pages/Login"
import PageNotFound from "./pages/PageNotFound"
import AppLayout from './pages/AppLayout'
import CityList from './components/CityList'
import CountryList from './components/CountryList'
import City from "./components/City"
import Form from "./components/Form"


const BASE_UR="http://localhost:8000"
export default function App() {
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
    <BrowserRouter>
        <Routes>
           <Route index element={<Homepage/>}/> 
           <Route path='product' element={<Product/>}> </Route>
           <Route path='pricing' element={<Pricing/>}> </Route>
           <Route path="/login" element={<Login/>}></Route>
           <Route path='*' element={<PageNotFound/>}></Route>
          <Route path='app' element={<AppLayout/>}>
             //Note: Inintially we have to use a useState hook to set the currently active tab to decide what to show now we can do the same using routes as cities path is printing a different thing and countries path is diffrenet  
             <Route index element={<Navigate replace to='cities'/>}></Route>
             <Route path='cities/:id' element={<City/>}/>
             <Route path='cities' element={<CityList isLoading={isLoading} cities={cities}/>}></Route>
             <Route element={<CityList isLoading={isLoading} cities={cities}/>}/>
             <Route path='countries' element={<CountryList cities={cities} isLoading={isLoading}/>}></Route>
             <Route path='form' element={<Form/>}></Route>
          </Route>
        </Routes>
    </BrowserRouter>
  )
}
