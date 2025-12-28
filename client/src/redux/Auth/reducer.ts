import { LOGIN_SUCCESS, LOGOUT } from "./actionTypes";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

// Helper to get cookie by name
const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

const initialState: AuthState = {
  token: getCookie("Authentication"),
  isAuthenticated: !!getCookie("Authentication"),
};

const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      // Store token in cookie
      document.cookie = `Authentication=${action.payload}; Path=/; SameSite=Lax`;

      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
      };
    case LOGOUT:
      // Remove cookie by setting past expiration date
      document.cookie =
        "Authentication=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";

      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
