import React from 'react';
import ReactDOM from 'react-dom';
import { Amplify, Auth } from 'aws-amplify';
import config from './config';

import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/index.css';
import App from './App';

Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: config.cognito.REGION,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: 'scores',
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
});

Auth.currentCredentials().catch((e) => console.log('error: ', e));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
