import Nav from './component/NavComponent'
import './App.css'
import Marker from './component/MarkerComponent'
import MainLayout from './component/MainLayout'
import LoginLayout from './component/LoginLayout'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout/>}></Route>
        <Route path='/log-in' element={<LoginLayout/>}></Route>
      </Routes>
    </BrowserRouter>
   
    </>
  )
}

export default App
