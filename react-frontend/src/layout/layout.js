import react from "react";
import {Outlet} from 'react-router-dom';
import Header from "../components/Main-Navbar";

export default function Layout({detailData, contactData, error}){
    return(
        <>
        <Header/>
        <Outlet/>
        </>
    );
}