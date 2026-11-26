import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import CreateSchedule from './pages/CreateSchedule';
import MySchedules from './pages/MySchedules';
import ScheduleDetails from './pages/ScheduleDetails';
import Copyright from './pages/Copyright';

function App() {
  const ProtectedRoute = ({ component: Component, ...rest }) => {
    const user = localStorage.getItem('user');
    return (
      <Route
        {...rest}
        render={(props) =>
          user ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    );
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/create-schedule" component={CreateSchedule} />
        <ProtectedRoute exact path="/my-schedules" component={MySchedules} />
        <ProtectedRoute exact path="/schedule/:id" component={ScheduleDetails} />
        <ProtectedRoute exact path="/copyright" component={Copyright} />
        {/* مسارات الصفحات القادمة ستضاف هنا */}
        
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
}

export default App;