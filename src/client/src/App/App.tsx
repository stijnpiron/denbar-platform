import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { State } from '../interfaces/state/state.interface';
import { UserState } from '../interfaces/state/user-state.interface';
import { AppWrapper } from './App.styles';
import HeaderContainer from '../containers/Header/Header';
import ContentContainer from '../containers/Content/Content';
// import useAuth from '../utils/Authentication/useAuth';
import LoginPage from '../pages/LoginPage/LoginPage';

const App: React.FC = () => {
  const user: UserState = useSelector((state: State) => state.user);
  // useAuth();

  return (
    <>
      {user.loggedIn ? (
        <Router>
          <AppWrapper>
            <>
              <HeaderContainer />
              <ContentContainer />
            </>
          </AppWrapper>
        </Router>
      ) : (
        <LoginPage />
      )}
    </>
  );
};

export default App;
