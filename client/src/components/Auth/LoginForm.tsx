import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import api from "../../lib/api.tsx";
import {useApp} from "../../context/AppContext.tsx";
import {AuthResponse} from "../../types";


const LoginForm = () => {
  const {login} = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthenticationSuccess = (authResponse: AuthResponse): void => {
    console.log('Authentication successful', authResponse);
    if (!authResponse?.user) {
      throw new Error('Invalid authentication response');
    }
    try {
      login(authResponse);
    } catch (error) {
      console.error('Failed to process login:', error);
      throw new Error('Authentication failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('/users/login', {
        username,
        password,
      }, {withCredentials: true});

      if (response.data.message === 'Login successful') {
        handleAuthenticationSuccess(response.data);
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Login failed');
      if(error.message === 'Network Error')
        return (
          setError('Failed to connect to server. Please try again.')
      )
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <img
              src="/logo_kandal_province_transperant.png"
              alt="DocTrack Logo"
              className="h-24 w-24 rounded-full border-2 border-blue-500 p-1"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">DocTrack</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to access your documents
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn size={20} className="text-blue-500 group-hover:text-blue-400" />
              </span>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;