import { Dispatch } from 'react';
import storeActions from '../store/store.actions';
import api from './api';
const { checkAuth, checkAuthFailed, checkAuthSuccess } = storeActions.auth.Actions;

export const checkAuthentication = async (dispatch: Dispatch<any>) => {
  dispatch(checkAuth());
  try {
    const res = await api.get('/auth/check');
    if (res.data?._id) {
      dispatch(checkAuthSuccess(res.data));
    }
    dispatch(checkAuthFailed({ code: 401, type: 'Unauthorized', message: 'Wrong or no authentication token provided' }));
  } catch (err) {
    dispatch(checkAuthFailed(err));
  }
};
