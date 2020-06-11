import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import storeActions from '../../store/store.actions';

const { loginUserSuccess, logoutUser } = storeActions.user.Actions;

function useAuth(): void {
  const dispatch = useDispatch();

  useEffect(() => {
    const replaceMe: any = {};
    const unsubscribe = replaceMe.auth.onAuthStateChanged((user: any) => {
      if (user) {
        dispatch(loginUserSuccess(user));
      } else {
        dispatch(logoutUser());
        user = null;
      }
    });

    return (): void => unsubscribe();
  }, [dispatch]);
}

export default useAuth;
