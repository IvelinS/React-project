import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:3030/users/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const user = await response.json();
            console.log('Login Response:', user);
            
            const userData = {
                ...user,
                userId: user._id
            };

            console.log('User ID:', userData.userId); 
            setAuth(userData);
            localStorage.setItem('auth', JSON.stringify(userData));
            return userData;
        } catch (error) {
            throw error;
        }
    };

    const register = async (email, password) => {
        try {
            const response = await fetch('http://localhost:3030/users/register', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            const user = await response.json();
            setAuth(user);
            return user;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        setAuth({});
        localStorage.removeItem('auth');
    };

    return (
        <AuthContext.Provider value={{ auth, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
