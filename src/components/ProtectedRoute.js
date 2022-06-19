import { Redirect, Route } from "react-router-dom"

const ProtectedRoute = ({component: Component, loggedIn, path, ...props}) => {
  return (
    <Route exact path={path}>
      {() => loggedIn === true ? <Component {...props}/> : <Redirect to="/signin"/>}
    </Route>
  )
}

export default ProtectedRoute;