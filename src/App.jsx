import React from 'react'

import Homepage from './pages/homepage'
import Pricing from './pages/Pricing'
import Product from './pages/product'
import Login from "./pages/Login"
import PageNotFound from "./pages/PageNotFound"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './pages/AppLayout'
export default function App() {

  return (
    <BrowserRouter>
        <Routes>
           <Route index element={<Homepage/>}> </Route>
           <Route path='product' element={<Product/>}> </Route>
           <Route path='pricing' element={<Pricing/>}> </Route>
           <Route path='*' element={<PageNotFound/>}></Route>
           <Route path='/app' element={<AppLayout/>}>
             <Route index element={<p>List</p>}></Route>
             <Route path='cities' element={<p>List of cities</p>}></Route>
             <Route path='countries' element={<p>List of Country</p>}></Route>
           </Route>
           <Route path="/login" element={<Login/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}
