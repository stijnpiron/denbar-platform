import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { color, cursor, height } from '../../../utils/global.styles';

const { headerColor, textDisabled } = color.types;
const { activeLink, disabled } = cursor;
const { headerHeight } = height;

// BUG: link color active/inactive
export const Item = styled.li<{ linkState: string }>`
  display: flex;
  align-items: center;
  height: 100%;
  cursor: ${({ linkState }): string => (linkState === 'active' ? activeLink : disabled)};
  @media (min-width: 48em) {
    float: left;
    &:hover {
      background-color: ${({ linkState }): string | null => (linkState === 'active' ? '#f4f4f4' : null)};
    }
  }
`;

// BUG: link hover color is always blue
export const StyledLink = styled(Link)`
  display: block;
  padding: 20px 20px;
  color: ${headerColor};
  text-decoration: none;
  &:hover {
    color: ${headerColor};
  }
  &:active {
    color: ${headerColor};
  }
  @media (min-width: 48em) {
    border-right: 0.05rem solid ${headerColor};
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    max-height: ${headerHeight} !important;
    padding: 0 2rem;
    margin: auto;
    margin-right: -0.1rem;
  }
`;

export const ActionLink = styled.div`
  display: block;
  padding: 20px 20px;
  color: ${headerColor};
  text-decoration: none;
  &:hover {
    color: ${headerColor};
  }
  &:active {
    color: ${headerColor};
  }
  @media (min-width: 48em) {
    border-right: 0.05rem solid ${headerColor};
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    max-height: ${headerHeight} !important;
    padding: 0 2rem;
    margin: auto;
    margin-right: -0.1rem;
  }
`;

export const DisabledLink = styled.div`
  display: block;
  padding: 20px 20px;
  color: ${textDisabled};
  text-decoration: none;
  @media (min-width: 48em) {
    border-right: 0.05rem solid ${headerColor};
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    max-height: ${headerHeight} !important;
    padding: 0 2rem;
    margin: auto;
    margin-right: -0.1rem;
  }
`;
