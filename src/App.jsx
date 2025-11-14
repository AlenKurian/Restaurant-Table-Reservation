import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'
import Home from './Pages/Home'
import RestaurantDetails from './Pages/RestaurantDetails'
import AddRestaurant from './Pages/AddRestaurant'
import AddTable from './Pages/AddTable'
import Reservations from './Pages/Reservations'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/home' element={<Home />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        <Route path="/add-restaurant" element={<AddRestaurant />} />
        <Route path="/add-table" element={<AddTable />} />
        <Route path="/reservations" element={<Reservations />} />
      </Routes>
    </>
  )
}

export default App
