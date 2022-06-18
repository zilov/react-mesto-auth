import { Redirect, Route } from "react-router-dom"

const ProtectedRoute = ({component: Component, loggedIn, ...props}) => {
  console.log(props);
  return (
    <Route>
      { () => loggedIn === true ? <Component {...props}/> : <Redirect to="/sign-in"/>}
    </Route>
  )
}

export default ProtectedRoute;