import React, { useEffect, useState } from 'react'

import Homepage from './pages/homepage'
import Pricing from './pages/Pricing'
import Product from './pages/product'
import Login from "./pages/Login"
import PageNotFound from "./pages/PageNotFound"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './pages/AppLayout'
import CityList from './components/CityList'

const BASE_UR="http://localhost:8000"
export default function App() {
  const [cities, setCities]=useState([]);
  const [isLoading, setIsLoading]=useState(false);

  useEffect(function(){
    setIsLoading(true);
    async function fetchCitiesData() {
      try{const res= await fetch(`${BASE_UR}/cities`);
      const data= await res.json();
      console.log(data);
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
           <Route path='/app' element={<AppLayout/>}>
           //Note: Inintially we have to use a useState hook to set the currently active tab to decide what to show now we can do the same using routes as cities path is printing a different thing and countries path is diffrenet  
             <Route element={<CityList isLoading={isLoading} cities={cities}/>}/>
             <Route path='cities' element={<CityList isLoading={isLoading} cities={cities}/>}></Route>
             <Route path='countries' element={<p>List of Country</p>}></Route>
           </Route>
           <Route path="/login" element={<Login/>}></Route>
           <Route path='*' element={<PageNotFound/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}
