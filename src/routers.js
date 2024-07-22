import React,{} from "react"
import { BrowserRouter,Redirect,Route,Switch,Component } from "react-router-dom"
import Login from "./login"
import Home from "./home"
import Admin from "./admin"



function Routes(props){


    return(
        <BrowserRouter>
        <Switch>
        <Route path="/" exact component={Login}/>
        <Route 
        
           render={() => (
            localStorage.getItem("login")==1 && localStorage.getItem("usertype")=="citizen" ?
              (
            
                <Home props  />
              
              ):  localStorage.getItem("login")==1 && localStorage.getItem("usertype")=="admin" ?
              (
             
                <Admin props  /> 
               
              ):(
                <Redirect to='/' />
              )

    )}
        />
         <Route 
        
     
     />
        </Switch>
      
        
        </BrowserRouter>
    )

}
export default Routes