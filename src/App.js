import {Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import ProfilePage from './components/ProfilePage'
import SpecificUserPage from './components/SpecificUserPage'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/Login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/my-profile" component={ProfilePage} />
    <ProtectedRoute exact path="/users/:id" component={SpecificUserPage} />
  </Switch>
)

export default App
