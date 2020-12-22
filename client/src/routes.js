import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {LinksPage} from "./pages/LinksPage";
import {CreatePage} from "./pages/CteatePage";
import {DetailPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/links' exact render={() => <LinksPage/>}/>
                <Route path='/create' exact render={() => <CreatePage/>}/>
                <Route path='/detail/:id' render={() => <DetailPage/>}/>
                <Redirect to={'/create'}/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path='/' exact render={() => <AuthPage/>}/>
            <Redirect to={'/'}/>
        </Switch>
    )
}