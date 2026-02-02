
import './App.css'

import MainLayout from './component/MainLayout'
import LoginLayout from './component/LoginLayout'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistroComponent from './component/RegistroComponent'
import LoginComponent from './component/LoginComponent'
import ProviderComponent from './component/ProviderComponent';
import RecordsComponents from './component/RecordsComponents';
import PrivateRoute from './component/PrivateRouter';
import AdminComponent from './component/AdminComponent';

function App() {


  return (
    <>

      <ProviderComponent>
        <BrowserRouter>
          <Routes>
             <Route path='/' element={<MainLayout />}></Route>
            <Route path='/log-in' element={<LoginLayout />}>
              <Route index element={<LoginComponent />}></Route>
              <Route path='registro' element={<RegistroComponent />}></Route>
            </Route>
            <Route element={<PrivateRoute/>}>
               <Route path="/records" element={<RecordsComponents />} />
                <Route path="/admin-panel" element={<AdminComponent />} />
            </Route>
             <Route path="/admin" element={<AdminComponent />} />
          </Routes>
        </BrowserRouter>
      </ProviderComponent>

    </>
  )
}

export default App
