import { LOGIN_SUCCESS, LOGOUT, SET_LOADING } from "./actionTypes";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean; // Add loading state
  user: any | null; // Optional: store user info if returned by backend
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true, // We start as 'loading' until we check the backend
  user: null,
};

const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload, // If you send user data
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
