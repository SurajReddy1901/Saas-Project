export const setToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const setUserEmail = (email) => localStorage.setItem('userEmail', email);
export const getUserEmail = () => localStorage.getItem('userEmail');
export const isLoggedIn = () => {
    return !!localStorage.getItem('token');
};
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
};
