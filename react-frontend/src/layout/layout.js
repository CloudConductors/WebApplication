import react from "react";
import {Outlet} from 'react-router-dom';
import Nav from "../components/Main-Navbar";
import Header from "../components/Header";

export default function Layout({}){
    return(
        <>
        <Header/>
        <Nav/>
        <Outlet/>
        </>
    );
}