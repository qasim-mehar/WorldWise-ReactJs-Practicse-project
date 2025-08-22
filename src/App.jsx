import { lazy ,Suspense} from 'react'
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom'

import { CitiesProvider } from './Contexts/CitiesContext'
import { AuthProvider } from './Contexts/FakeAuthContext'

import CityList from './components/CityList'
import CountryList from './components/CountryList'
import City from "./components/City"
import Form from "./components/Form"
import ProtectAuthentication from './pages/ProtectAuthentication'
import SpinnerFullPage from "./components/SpinnerFullPage"

const PageNotFound=lazy(()=>import("./pages/PageNotFound"))
const Pricing= lazy(()=>import('./pages/Pricing'))
const Login=lazy(()=>import("./pages/Login"))
const Product= lazy(()=>import('./pages/product'))
const AppLayout=lazy(()=>import('./pages/AppLayout'))
const Homepage=lazy(()=>import('./pages/homepage'))
// import PageNotFound from "./pages/PageNotFound"
// import Pricing from './pages/Pricing'
// import Login from "./pages/Login"
// import Product from './pages/product'
// import AppLayout from './pages/AppLayout'
// import Homepage from './pages/homepage'

export default function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
      <BrowserRouter>
         <Suspense fallback={<SpinnerFullPage/>}>
          <Routes>
            <Route index element={<Homepage/>}/> 
            <Route path='product' element={<Product/>}> </Route>
            <Route path='pricing' element={<Pricing/>}> </Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path='*' element={<PageNotFound/>}></Route>
            <Route path='app' element={
                  <ProtectAuthentication>
                    <AppLayout/>
                  </ProtectAuthentication>
                }>
              //Note: Inintially we have to use a useState hook to set the currently active tab to decide what to show now we can do the same using routes as cities path is printing a different thing and countries path is diffrenet  
              <Route index element={<Navigate to="cities" replace />} />
              <Route path='cities/:id' element={<City/>}/>
              <Route path='cities' element={<CityList />}></Route>
              <Route element={<CityList />}/>
              <Route path='countries' element={<CountryList/>}></Route>
              <Route path='form' element={<Form/>}></Route>
            </Route>
          </Routes>
         </Suspense> 
      </BrowserRouter>
      </CitiesProvider>
      </AuthProvider>
  )
}
