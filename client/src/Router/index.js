import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'
import Tasks from '../pages/Tasks'
import Confirm from '../pages/Confirm'
import Active from '../pages/Active'
function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Tasks />
                </Route>
                <Route path="/Signup">
                    <Signup />
                </Route>
                <Route path="/SignIn">
                    <Signin />
                </Route>
                <Route path="/Confirm">
                    <Confirm />
                </Route>
                <Route path="/Activate/:activateCode">
                    <Active />
                </Route>
            </Switch>
        </Router>
    )
}
export default AppRouter
