/* eslint-disable react/prop-types */
// AuthContext.js
import { createContext, useContext } from 'react';

const useAuth = () => {
    const AuthContext = createContext();

    return useContext(AuthContext);
}

export default useAuth;