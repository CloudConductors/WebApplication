import React from "react";

import LoginCom from "../components/loginCom.js";
import { AuthProvider } from "../components/AuthContext.js";

export default function TestPage(){
  return (
    <div>
      <AuthProvider>
      <LoginCom></LoginCom> 
      </AuthProvider>    
    </div>
  );
}