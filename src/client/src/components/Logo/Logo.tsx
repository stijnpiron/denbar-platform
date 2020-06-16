import React from 'react';
import { ShopOutlined } from '@ant-design/icons';
import { LogoLink } from './Logo.styles';

const Logo: React.FC = () => (
  <LogoLink to='/' className='logo'>
    <ShopOutlined /> DenBAR
  </LogoLink>
);

export default Logo;
