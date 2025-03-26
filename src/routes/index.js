import React from "react";
import {Routes,Route} from 'react-router-dom'
import HomePage from "../pages/home";
import MainLayout from "../mainLayout";
import DynamicPropertyPage from "../pages/dynamicPage";
import Error404 from "../pages/pageNotFound";


export default function MainRoutes() {
    return (
        <>
        <MainLayout>
        <Routes>
            <Route path="/homepage" 
            element={<HomePage/>}
            />
            <Route path="/details/:id" 
            element={<DynamicPropertyPage/>}
            />
    <Route path='*' element={<Error404/>}/>
        </Routes>
        </MainLayout>
        </>
    )
}