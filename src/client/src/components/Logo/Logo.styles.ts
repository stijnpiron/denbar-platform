import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { color, height } from '../../utils/global.styles';

const { headerColor } = color.types;
const { headerHeight } = height;

export const LogoLink = styled(Link)`
  display: block;
  float: left;
  font-size: 1.5em;
  line-height: ${headerHeight};
  padding: 0 20px;
  text-decoration: none;
  color: ${headerColor};
  &:hover {
    color: ${headerColor};
  }
  &.active {
    color: ${headerColor};
  }
`;
