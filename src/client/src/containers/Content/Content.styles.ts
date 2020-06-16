import styled from 'styled-components';
import { Layout } from 'antd';
import { height } from '../../utils/global.styles';

export const StyledContent = styled(Layout.Content)`
  margin-top: ${height.headerHeight};
  padding: 1rem;
`;
