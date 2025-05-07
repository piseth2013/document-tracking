import {User, AuthResponse} from '../types';
import api from '../lib/api';

export const getCurrentUser = (): User | null => {
    const userString = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!userString || !token) {
        return null;
    }

    try {
        return JSON.parse(userString);
    } catch {
        return null;
    }
};

export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await api.get('/');
        return response.data.users;
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return [];
    }
};

export const checkAuthStatus = async (): Promise<AuthResponse | null> => {
    try {
        const response = await api.get('/users/me', {withCredentials: true});
        return response.data;
    } catch (error) {
        console.error('Failed to check auth status:', error);
        return null;
    }
};