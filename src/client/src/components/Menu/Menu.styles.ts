import styled from 'styled-components';
import { borders, color, height } from '../../utils/global.styles';

const { bottomBoxShadow } = borders;
const { headerHeight } = height;
const { headerColor } = color.types;

export const MenuList = styled.ul<{ open: boolean }>`
  clear: both;
  max-height: 0;
  transition: max-height 0.2s ease-out;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
  background-color: #fff;
  max-height: ${({ open }): string => (open ? '240px' : '0')};
  -webkit-box-shadow: ${({ open }): string => (open ? bottomBoxShadow : 'none')};
  -moz-box-shadow: ${({ open }): string => (open ? bottomBoxShadow : 'none')};
  box-shadow: ${({ open }): string => (open ? bottomBoxShadow : 'none')};
  z-index: ${({ open }): string => (open ? '10' : '-1')};
  @media (min-width: 48em) {
    height: ${headerHeight};
    clear: none;
    float: right;
    max-height: none;
  }
`;

export const MenuIcon = styled.label<{ open: boolean }>`
  cursor: pointer;
  float: right;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 1.5rem;
  height: 1.5rem;
  margin: 10px 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  &:focus {
    outline: none;
  }
  div {
    width: 1.5rem;
    height: 0.25rem;
    background: ${headerColor};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 0.04rem;
    :first-child {
      transform: ${({ open }): string => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }
    :nth-child(2) {
      opacity: ${({ open }): string => (open ? '0' : '1')};
      transform: ${({ open }): string => (open ? 'translateX(2rem)' : 'translateX(0)')};
    }
    :nth-child(3) {
      transform: ${({ open }): string => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
  @media (min-width: 48em) {
    display: none;
  }
`;

export const IconPosition = styled.div`
  height: 100%;
  display: flex;
  flex-flow: row no wrap;
  align-items: center;
  justify-content: flex-end;
`;
