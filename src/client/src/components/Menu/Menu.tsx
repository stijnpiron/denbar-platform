import React from 'react';
import MenuItem from './MenuItem/MenuItem';
import { MenuItem as MenuItemProps } from '../../interfaces/menu-item.interface';
import { MenuOutlined, ShoppingCartOutlined, InfoCircleOutlined, EuroOutlined, LogoutOutlined } from '@ant-design/icons';
import { IconPosition, MenuIcon, MenuList } from './Menu.styles';

import AuthService from '../../services/auth.service';
import { useDispatch } from 'react-redux';
import { Action } from '../../interfaces/state/action.interface';

interface MenuProps {
  open: boolean;
  toggleOpen(): void;
}

const Menu: React.FC<MenuProps> = ({ open, toggleOpen }) => {
  const dispatch = useDispatch();

  const menuItemData: MenuItemProps[] = [
    {
      id: 'overview',
      icon: <MenuOutlined style={{ fontSize: '1.5rem', marginBottom: '5px', marginRight: '10px' }} />,
      route: 'overview',
      text: 'Overzicht',
      state: 'active',
    },
    {
      id: 'shop',
      icon: <ShoppingCartOutlined style={{ fontSize: '1.5rem', marginBottom: '5px', marginRight: '10px' }} />,
      route: 'shop',
      text: 'Bestel',
      state: 'active',
    },
    {
      id: 'info',
      icon: <InfoCircleOutlined style={{ fontSize: '1.5rem', marginBottom: '5px', marginRight: '10px' }} />,
      route: 'info',
      text: 'Info over de app...',
      state: 'inactive',
    },
    {
      id: 'pay',
      icon: <EuroOutlined style={{ fontSize: '1.5rem', marginBottom: '5px', marginRight: '10px' }} />,
      route: 'pay',
      text: 'Betaal',
      state: 'inactive',
    },
    {
      id: 'logout',
      icon: <LogoutOutlined style={{ fontSize: '1.5rem', marginBottom: '5px', marginRight: '10px' }} />,
      action: (): any => AuthService.logout(dispatch),
      text: 'Afmelden',
      state: 'active',
    },
  ];

  const menuItems = menuItemData.map((mi: MenuItemProps) => <MenuItem key={mi.id} {...mi} toggleOpen={toggleOpen} />);

  return (
    <>
      <IconPosition>
        <MenuIcon open={open} onClick={toggleOpen}>
          <div />
          <div />
          <div />
        </MenuIcon>
      </IconPosition>
      <MenuList open={open}>{menuItems}</MenuList>
    </>
  );
};

export default Menu;
