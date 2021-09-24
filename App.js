import React from 'react';

import StackNavigator from './src/navigation/StackNavigator';
import {Provider} from 'react-redux';
import Store from './src/store/ConfigureStore';

const App = () => {
  return (
    <Provider store={Store}>
      <StackNavigator />
    </Provider>
  );
};

export default App;
