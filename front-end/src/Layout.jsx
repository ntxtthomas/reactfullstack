import { Outlet } from "react-router-dom";
import NavBar from "./navBar";

export default function Layout( ) {
  return (
    <>
      <NavBar />
      <Outlet></Outlet>
    </>
  );
} 