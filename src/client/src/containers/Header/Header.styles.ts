import styled from 'styled-components';
import { Layout } from 'antd';
import { borders, height } from '../../utils/global.styles';

export const StyledHeader = styled(Layout.Header)<{ open: boolean }>`
  background-color: #fff;
  height: ${height.headerHeight};
  -webkit-box-shadow: ${({ open }): string => (open ? 'none' : borders.bottomBoxShadow)};
  -moz-box-shadow: ${({ open }): string => (open ? 'none' : borders.bottomBoxShadow)};
  box-shadow: ${({ open }): string => (open ? 'none' : borders.bottomBoxShadow)};
  position: fixed;
  width: 100%;
  z-index: 13;
`;
