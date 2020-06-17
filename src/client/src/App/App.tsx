import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AppWrapper } from './App.styles';
import HeaderContainer from '../containers/Header/Header';
import ContentContainer from '../containers/Content/Content';

import { Provider } from 'react-redux';

import store from '../store';

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
