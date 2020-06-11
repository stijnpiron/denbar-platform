import React, { useState } from 'react';
import { StyledHeader } from './Header.styles';
import Logo from '../../components/Logo/Logo';

const Header: React.FC = () => {
  const [open] = useState(false);

  return (
    <StyledHeader open={open}>
      <Logo />
    </StyledHeader>
  );
};

export default Header;
