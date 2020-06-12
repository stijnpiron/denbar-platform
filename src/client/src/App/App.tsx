import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AppWrapper } from './App.styles';
import HeaderContainer from '../containers/Header/Header';
import ContentContainer from '../containers/Content/Content';

import configureStore from '../store/store';
import { Provider } from 'react-redux';

const store = configureStore();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppWrapper>
          <HeaderContainer />
          <ContentContainer />
        </AppWrapper>
      </Router>
    </Provider>
  );
};

export default App;
