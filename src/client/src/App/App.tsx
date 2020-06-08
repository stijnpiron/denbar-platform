import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ContentContainer from 'containers/Content/Content';
import HeaderContainer from 'containers/Header/Header';
import LoginModal from 'containers/LoginModal/LoginModal';
import { State } from 'interfaces/state/state.interface';
import { UserState } from 'interfaces/state/user-state.interface';
import useAuth from 'utils/Authentication/useAuth';
import { AppWrapper } from './App.styles';
import BugReportModal from 'components/BugReport';

const App: React.FC = () => {
  const user: UserState = useSelector((state: State) => state.user);
  useAuth();

  return (
    <>
      <Router>
        <AppWrapper>
          {user.loggedIn ? (
            <>
              <BugReportModal />
              <HeaderContainer />
              <ContentContainer />
            </>
          ) : null}
        </AppWrapper>
      </Router>
      <LoginModal />
    </>
  );
};

export default App;
