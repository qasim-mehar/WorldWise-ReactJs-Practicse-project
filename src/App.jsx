import React from 'react'

import Homepage from './pages/homepage'
import Pricing from './pages/Pricing'
import Product from './pages/product'
import PageNotFound from "./pages/PageNotFound"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
export default function App() {

  return (
    <BrowserRouter>
        <Routes>
           <Route path='/' element={<Homepage/>}> </Route>
           <Route path='product' element={<Product/>}> </Route>
           <Route path='pricing' element={<Pricing/>}> </Route>
           <Route path='*' element={<PageNotFound/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}
