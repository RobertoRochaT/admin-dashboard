import './App.css'
import Main from './components/Main'
import Login from './components/Login'
import Header from './components/Header'
import SideBar from './components/SideBar'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'remixicon/fonts/remixicon.css'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'


function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Login />} />
            
            <Route path="/Dashboard" element=
            {
             <>
              <Header />
              <Main />
              <SideBar />
             </>
            } />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
