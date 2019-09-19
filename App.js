import React from 'react';
import { Router, Scene } from 'react-native-router-flux'

import LoginScreen from './src/containers/LoginScreen';
import QRCodeScreen from './src/containers/QrCodeScreen';

const App = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene
          key="login"
          component={LoginScreen}
          title="Login"
        />
        <Scene
          key="qrcode"
          component={QRCodeScreen}
          renderBackButton={()=>(null)}
          renderLeftButton={()=>(null)}
          title="QrCode"
        />
      </Scene>
    </Router>
  );
}

export default App;