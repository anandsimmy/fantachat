import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom'
import LoginComponent from './login/login';
import SignupComponent from './signup/signup';
import DashboardComponent from './dashboard/dashboard'
import firebase from 'firebase'
import firebaseConfigObj from './firebaseconfig'
require("firebase/firestore")

firebase.initializeApp(firebaseConfigObj)

Notification.requestPermission(function(status) {
  console.log('Notification permission status:', status);
  displayNotification();
});

function displayNotification() {
  if('serviceWorker' in navigator){
    console.log('sw found')
    navigator.serviceWorker.ready
      .then((swreg)=> {
        console.log('inside promise')
        swreg.showNotification('Successfully Subscribed', {
          body: 'You have successfully subscribed to fanta-chat services',
          icon: '../public/logo192.png'
        })
      })
      .catch(err=>
        console.log(err))
  }
  else{
    console.log('no sw found')
  }
}

const router= (
  <BrowserRouter>
    <div id='route-container'>
      <Route path='/login' exact component={LoginComponent} />
      <Route path='/signup' exact component={SignupComponent} />
      <Route path={["/dashboard","/"]} exact component={DashboardComponent} />
    </div>
  </BrowserRouter>
)

ReactDOM.render(
  router,
  document.getElementById('root')
);

serviceWorker.register()
