import { User } from './../interfaces/user.interface';
import storeActions from '../store/store.actions';
import { Dispatch } from 'react';
import api from '../utils/api';

const { checkAuthFailed, checkAuthSuccess } = storeActions.auth.Actions;

const setAuthToken = async (dispatch: Dispatch<any>): Promise<void> => {
  try {
    const res = await api.get('/auth/check');
    if (res.data?._id) {
      dispatch(checkAuthSuccess(res.data as User));
    }
    dispatch(checkAuthFailed({ code: 401, type: 'Unauthorized', message: 'Wrong or no authentication token provided' }));
  } catch (err) {
    dispatch(checkAuthFailed(err));
  }
};

export default setAuthToken;
