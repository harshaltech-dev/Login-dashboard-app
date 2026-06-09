import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import Login from './Pages/Login'
import Dashboard from "./Pages/Dashboard";
import EditProfile from "./Pages/EditProfile";
import Employee from "./Pages/Employee";
import Products from "./Pages/Products";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import './App.css'



export default function App() {
   return (
        <>
        
         <BrowserRouter>
      <Routes>
        <Route path="/" element ={<PublicRoute>
      <Login />
    </PublicRoute>} />
        <Route path="/dashboard" element={
            <ProtectedRoute>
            <Dashboard />
            </ProtectedRoute> } />
        <Route path="/edit-profile" element={ 
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>} />
            <Route path="/Employee" element={
              <ProtectedRoute>
                <Employee/>
                </ProtectedRoute>
             }/>
              <Route path="/Products" element={
              <ProtectedRoute>
                <Products/>
                </ProtectedRoute>
             }/>
      </Routes>
    </BrowserRouter>
        
        
        </>
    )
}

