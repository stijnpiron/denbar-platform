import React, { ReactNode } from 'react';
import { RouteProps } from 'react-router-dom';
import { StyledContent } from './Content.styles';

const AppContent: React.FC = () => (
  <StyledContent>
    <div>Content</div>
  </StyledContent>
);

export default AppContent;

/*
 * a wrapper for <Route> that redirects to the login
 * screen if you're not yet authenticated.
 */
interface PrivateRouteProps extends RouteProps {
  children?: ReactNode;
  component: any;
}

// const PrivateRoute: any = (props: PrivateRouteProps) => {
//   const { children, ...rest } = props;
//   const user = useSelector((state: State) => state.user);

//   return (
//     <Route
//       {...rest}
//       render={(routeProps): any =>
//         user.loggedIn ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: '/',
//               state: { from: routeProps.location },
//             }}
//           />
//         )
//       }
//     />
//   );
// };
