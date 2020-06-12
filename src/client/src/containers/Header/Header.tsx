import React, { useState } from 'react';
import { StyledHeader } from './Header.styles';
import Logo from '../../components/Logo/Logo';

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <StyledHeader open={open}>
      <Logo />
      {/* <Menu open={open} toggleOpen={(): void => setOpen(!open)} /> */}
    </StyledHeader>
  );
};

export default Header;
