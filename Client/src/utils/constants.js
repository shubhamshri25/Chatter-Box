export const HOST = import.meta.env.VITE_SERVER_URL;

// auth routes
export const AUTH_ROUTES = "/api/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`;
export const UPDATE_PROFILE = `${AUTH_ROUTES}/update-profile`;
export const ADD_PROFILE_IMAGE = `${AUTH_ROUTES}/add-profile-image`;
export const DELETE_PROFILE_IMAGE = `${AUTH_ROUTES}/remove-profile-image`;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;

// contacts routes
export const CONTACTS_ROUTES = "/api/contacts";
export const SEARCH_CONTACT_ROUTE = `${CONTACTS_ROUTES}/search`;
