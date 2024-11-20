import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import reportWebVitals from './reportWebVitals'
import {Provider} from 'react-redux'
import {applyMiddleware, compose} from 'redux';
import { legacy_createStore as createstore } from 'redux'
import {thunk} from 'redux-thunk'
import Reducers from './Reducers'
import { GoogleOAuthProvider } from '@react-oauth/google';
const store=createstore(Reducers,compose(applyMiddleware(thunk)));
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="606650232794-68hbd9n89587egfa81kq8h5k0v8hoal7.apps.googleusercontent.com">
  <StrictMode>
    <App />
  </StrictMode>
    </GoogleOAuthProvider>
  </Provider>
);
