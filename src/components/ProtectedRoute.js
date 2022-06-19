import { Redirect, Route } from "react-router-dom"

const ProtectedRoute = ({component: Component, loggedIn, path, ...props}) => {
  console.log(props);
  return (
    <Route exact path={path}>
      {() => loggedIn === true ? <Component {...props}/> : <Redirect to="/sign-in"/>}
    </Route>
  )
}

export default ProtectedRoute;