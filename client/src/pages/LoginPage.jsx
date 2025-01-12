import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { login } from '../services/authService';
import { useAuth } from '../context/AuthProvider';

export const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCredentials((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials)
    try {
      const userData = await login(credentials.username, credentials.password);
      loginUser(userData);
      navigate('/');
    } catch (err) {
      console.log(err)
      setError("error");
    }
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center p-4">
          <Link to="/" className="font-semibold text-2xl mb-6">
            DevNews
          </Link>
          <div className="w-full tablet:max-w-md bg-on-surface-1 rounded-lg shadow border border-stroke-bold">
            <div className="p-6 space-y-4 laptop:space-y-6">
              <h1 className="font-bold text-lg laptop:text-xl">
                Sign in to your account
              </h1>
              {error && (
                <p className="text-red-500 text-sm">
                  {error}
                </p>
              )}
              <form onSubmit={handleSubmit} className="space-y-4 laptop:space-y-6">
                <InputField
                  text="Username"
                  inputName="username"
                  inputType="text"
                  placeholder="example123"
                  classNameLabel="block"
                  classNameInput="w-full"
                  value={credentials.username}
                  onChange={handleInput}
                />
                <InputField
                  text="Password"
                  inputName="password"
                  inputType="password"
                  placeholder="••••••••"
                  classNameLabel="block"
                  classNameInput="w-full"
                  value={credentials.password}
                  onChange={handleInput}
                />
                <PrimaryButton
                  text="Sign in"
                  className="w-full text-md font-semibold"
                  onClick={handleSubmit}
                />
                <p className="text-element-secondary">
                  Don’t have an account yet?{' '}
                  <Link
                    to="/register"
                    className="text-element-primary font-semibold hover:text-element-secondary transition-all duration-150"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
