import React, { useState } from 'react';
import { StyledHeader } from './Header.styles';
import Logo from '../../components/Logo/Logo';
import { AuthState } from '../../interfaces/state/auth-state.interface';
import { useSelector } from 'react-redux';
import { AppState } from '../../interfaces/state/app-state.interface';
import Menu from '../../components/Menu';

const Header: React.FC = () => {
  const user: AuthState = useSelector((state: AppState) => state.auth).data || { isAuthenticated: false };
  const [open, setOpen] = useState(false);

  return (
    <StyledHeader open={open}>
      <Logo />
      {user.isAuthenticated && <Menu open={open} toggleOpen={(): void => setOpen(!open)} />}
    </StyledHeader>
  );
};

export default Header;
