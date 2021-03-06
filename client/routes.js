import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import App from './containers/App';
import AuthenticatedRoutes from './components/AuthenticatedRoutes';
import Auth from './components/Auth';
import NotFound from './components/NotFound';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Account from './components/Account';

const AdminAccess = UserAuthWrapper({
  authSelector: state => state.user,
  predicate: user => { return user.role === 'admin' },
  redirectAction: () => browserHistory.push("/"),
  wrapperDisplayName: 'UserIsAdmin'
})

const AdminRoutes = AdminAccess( (props) => props.children )

export default (
 <Route>
   <Route path="/" component={App}>
    <IndexRoute component={Home} />
     <Route path="signup" component={Auth} title="Sign Up" />
     <Route path="signin" component={Auth} title="Sign In" />

     <Route component={AuthenticatedRoutes}>
         {/* PROTECTED BY AUTHENTICATION */}
         <Route path="dashboard" component={Dashboard} title="Explore" />
          <Route path="account" component={Account} />


       <Route component={AdminRoutes}>
           {/* PROTECTED BY ADMIN ACCESS */}
       </Route>
     </Route>
     <Route path="*" status={404} component={NotFound}/>
   </Route>
 </Route>
)
