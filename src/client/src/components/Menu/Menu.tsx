import React from 'react';

interface MenuProps {
  open: boolean;
  toggleOpen(): void;
}

const Menu: React.FC<MenuProps> = ({ open, toggleOpen }) => {
  return <div>Menu here open: {open}</div>;
};

export default Menu;
