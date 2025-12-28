import { LOGIN_SUCCESS, LOGOUT, SET_LOADING } from './actionTypes';
import axiosInstance from '@/api/axios'; // Import your configured axios

export const loginSuccess = (user: any) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const logout = () => async (dispatch: any) => {
  try {
    await axiosInstance.post('/auth/logout');
  } catch (error) {
    console.error("Logout failed", error);
  }
  dispatch({ type: LOGOUT });
};

export const setLoading = (isLoading: boolean) => ({
  type: SET_LOADING,
  payload: isLoading,
});

// Thunk to check authentication on app load
export const checkAuthStatus = () => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    // This call sends the httpOnly cookie to the backend
    const response = await axiosInstance.get('/auth/status');
    
    if (response.data.isAuthenticated) {
      dispatch(loginSuccess(response.data.user));
    } else {
      dispatch({ type: LOGOUT });
    }
  } catch (error) {
    // If 401 Unauthorized or network error
    dispatch({ type: LOGOUT });
  }
};