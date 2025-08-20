import { useEffect } from "react";
import { useAuth } from "../Contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

function ProtectAuthentication({children}) {
    const navigate=useNavigate();
    const {isAuthenticated}=useAuth()
    
    useEffect(function(){
        if(!isAuthenticated)navigate("/")
    },[isAuthenticated,navigate])

  return isAuthenticated?children:null;
}

export default ProtectAuthentication;