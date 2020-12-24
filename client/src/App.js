import React from "react";
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {NavBar} from "./components/NavBar";
import 'materialize-css'
import {Loader} from "./components/Loader";

function App() {
    const {token, userID, login, logout, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    if (!ready) return <Loader/>

    return (
        <AuthContext.Provider value={{token, userID, login, logout, isAuthenticated}}>
            {isAuthenticated && <NavBar/>}
            <div className='container'>
                {routes}
            </div>
        </AuthContext.Provider>
    )
}

export default App;
