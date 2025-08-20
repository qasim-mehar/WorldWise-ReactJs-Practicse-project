import { act, Children, useReducer } from "react";
import { createContext, useContext } from "react";

const AuthContext=createContext();
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
const initialState={
    user:null,
    isAuthenticated:false
}
function reducer(state,action){
switch (action.type) {
    case "login": return{
        ...state,
        isAuthenticated:true,
        user:action.payload
        }
    case "logout": return{
        ...state,
        isAuthenticated:false
    }
    default:
        break;
}
}
function AuthProvider({children}){
    const [{user,isAuthenticated}, dispatch]=useReducer(reducer,initialState)
    
    function login(email,pass){
     if(!email&&!pass) return;
     if(email===FAKE_USER.email && pass===FAKE_USER.password){
       
        dispatch({type:"login", payload:FAKE_USER})
     }
    }
    function logout(){
      dispatch({type:"logout"})
    }
    return(
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            login,
            logout
        }}>{children}</AuthContext.Provider>
    )
}
function useAuth(){
    const context=useContext(AuthContext);
    if(context===undefined) throw new Error("auth context used out of auth context provider");
    return context;
    
}
export {AuthProvider,useAuth}; 
