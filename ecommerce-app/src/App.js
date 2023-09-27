import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {LoginPage, HomePage} from "./Routes.js"
export const App = () => {

  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<HomePage />}/> 
    </Routes>
    </BrowserRouter>
  )
}

export default App
