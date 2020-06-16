import styled from 'styled-components';
import { Layout } from 'antd';
import { height } from '../../utils/global.styles';

export const StyledContent = styled(Layout.Content)`
  margin-top: ${height.headerHeight};
  height: calc(100% - ${height.headerHeight});
  overflow-y: scroll;
  padding: 1rem;
`;
