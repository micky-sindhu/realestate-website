import React from "react";
import {Routes,Route,Navigate} from 'react-router-dom'
import HomePage from "../pages/home";
import MainLayout from "../mainLayout";
import DynamicPropertyPage from "../pages/dynamicPage";
import Error404 from "../pages/pageNotFound";
import { useNavigate } from 'react-router-dom';

export default function MainRoutes() {
 const userValidation = localStorage.getItem("isValidUser");

 console.log("userValidation",userValidation);

 
 
    
    return (
        <>
        <MainLayout>
        <Routes>
            <Route path="/details/:id" 
            element={
                userValidation !== null ? <DynamicPropertyPage /> : <Navigate to="/signin" replace />
              }
            />
            <Route
          path="/"
          element={
            userValidation !== null ? <HomePage /> : <Navigate to="/signin" replace />
          }
        />
    <Route path='*'
     element={
        userValidation !== null ? <Error404 /> : <Navigate to="/signin" replace />
      }
    />
        </Routes>
        </MainLayout>
        </>
    )
}