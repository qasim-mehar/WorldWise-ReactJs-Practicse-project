import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom'

import { CitiesProvider } from './Contexts/CitiesContext'
import { AuthProvider } from './Contexts/FakeAuthContext'
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


export default function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
      <BrowserRouter>
          <Routes>
            <Route index element={<Homepage/>}/> 
            <Route path='product' element={<Product/>}> </Route>
            <Route path='pricing' element={<Pricing/>}> </Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path='*' element={<PageNotFound/>}></Route>
            <Route path='app' element={<AppLayout/>}>
              //Note: Inintially we have to use a useState hook to set the currently active tab to decide what to show now we can do the same using routes as cities path is printing a different thing and countries path is diffrenet  
              <Route index element={<Navigate to="cities" replace />} />
              <Route path='cities/:id' element={<City/>}/>
              <Route path='cities' element={<CityList />}></Route>
              <Route element={<CityList />}/>
              <Route path='countries' element={<CountryList/>}></Route>
              <Route path='form' element={<Form/>}></Route>
            </Route>
          </Routes>
      </BrowserRouter>
      </CitiesProvider>
      </AuthProvider>
  )
}
