import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Bookings from './pages/Bookings'
import Add from './pages/Add'
import List from './pages/List'


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/addcourse" element={<Add />} />
      <Route path="/listcourse" element={<List />} />

    </Routes>
  )
}

export default App
