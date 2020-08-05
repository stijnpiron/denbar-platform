import React from 'react';
import { ActionLink, DisabledLink, Item, StyledLink } from './MenuItem.styles';
import { MenuItem as MenuItemProps } from '../../../interfaces/menu-item.interface';

const MenuItem: React.FC<MenuItemProps> = ({ state, icon, route, toggleOpen, text, action }) => {
  return (
    <Item linkState={state || 'active'}>
      {action ? (
        <ActionLink onClick={action}>
          <span>{icon}</span>
          <span>{text}</span>
        </ActionLink>
      ) : state === 'active' ? (
        <StyledLink to={`/${route}`} onClick={toggleOpen}>
          <span>{icon}</span>
          <span>{text}</span>
        </StyledLink>
      ) : (
        <DisabledLink>
          <span>{icon}</span>
          <span>{text}</span>
        </DisabledLink>
      )}
    </Item>
  );
};

export default MenuItem;
