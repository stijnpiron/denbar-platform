import { Layout } from 'antd';
import styled from 'styled-components';
import { color } from '../utils/global.styles';

const { contentBackground, text } = color.types;

export const AppWrapper = styled(Layout)`
  background: ${contentBackground};
  color: ${text};
`;
