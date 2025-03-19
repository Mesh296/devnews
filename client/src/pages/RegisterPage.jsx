//registerpage.jsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { InputField } from '../components/InputField'
import { PrimaryButton } from '../components/PrimaryButton'
import { Flowbite, Datepicker, Select } from "flowbite-react";
import { Label } from "flowbite-react";
import { register } from '../services/users/authService';

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    username: '',
    fullName: '',
    dateOfBirth: null,
    gender: 'Male',
    password: '',
    confirmPassword: '',
  });

  const [isRegistered, setIsRegistered] = useState(false)

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCredentials((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.confirmPassword) {
      alert("Passwords do not match! Please try again.");
      return; 
    }

    try {
      const userData = await register(credentials)
      console.log(userData);
      alert("Your account has been registered successfully!");
      navigate('/login')
    } catch (error) {
      console.log(error);
    }
  };
  


  return (
    <div>
      <section className="bg-surface dark:bg-gray-900">
        <div className='flex flex-col items-center p-4'>
          <Link to="/" className='font-semibold text-2xl mb-6'>DevNews</Link>
          <div className='w-full tablet:max-w-md bg-on-surface-1 rounded-lg shadow border border-stroke-bold'>

              <div className='p-6 space-y-4 laptop:space-y-6'>
                <h1 className='font-bold text-lg laptop:text-xl'>
                  Create your account
                </h1>
                <div className='text-red-500'>{isRegistered ? `Registered successfully` : ''}</div>
                <form action="" className='space-y-4 laptop:space-y-6'>
                  {/* Email Field */}
                  <InputField
                    text="Email"
                    inputName="email"
                    inputType="email"
                    placeholder="example@company.com"
                    classNameLabel='block'
                    classNameInput='w-full'
                    onChange={handleInput}
                  />
                  {/* Username Field */}
                  <InputField
                    text="Username"
                    inputName="username"
                    inputType="text"
                    placeholder="example123"
                    classNameLabel='block'
                    classNameInput='w-full'
                    onChange={handleInput}
                  />
                  {/* Full Name Field */}
                  <InputField
                    text="Your name"
                    inputName="fullName"
                    placeholder="David Laid"
                    inputType="text"
                    classNameLabel='block'
                    classNameInput='w-full'
                    onChange={handleInput}
                  />
                  {/* DoB & Gender Fields */}
                  <div className="flex flex-row tablet:space-x-4">
                    {/* Birthday Field */}
                    <div className="flex-1 mr-4 laptop:mr-2">
                      <label
                        className="block mb-2 text-sm font-medium text-element-primary"
                      >
                        Your birthday
                      </label>
                      <Datepicker
                        selected={credentials.dateOfBirth}
                        onChange={(date) => {
                          if (date) {
                            const formattedDate  = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
                              .toISOString()
                              .split("T")[0];
                            setCredentials((prevValues) => ({
                              ...prevValues,
                              dateOfBirth: formattedDate,
                            }));
                          }
                        }}
                      />
                    </div>
                    {/* Gender Field */}
                    <div className="max-w-md">
                      <div className="mb-1 block">
                        <Label htmlFor="gender" value="Gender" />
                      </div>
                      <Select
                        colors=" failure"
                        id="gender"
                        name="gender"
                        value={credentials.gender}
                        onChange={handleInput}
                        required
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </Select>
                    </div>
                  </div>
                  {/* Password Field */}
                  <InputField
                    text="Password"
                    inputName="password"
                    placeholder="••••••••"
                    inputType="password"
                    classNameLabel='block'
                    classNameInput='w-full'
                    onChange={handleInput}
                  />
                  {/* Confirm Password Field */}
                  <InputField
                    text="Confirm password"
                    inputName="confirmPassword"
                    placeholder="••••••••"
                    inputType="password"
                    classNameLabel='block'
                    classNameInput='w-full'
                    onChange={handleInput}
                  />
                  <PrimaryButton onClick={handleSubmit} text="Sign in" className="w-full text-md font-semibold" />
                  
                  <p className='text-element-secondary'>
                    Already have an account? <Link to='/login' className='text-element-primary font-semibold hover:text-element-secondary transition-all duration-150'>Sign in</Link>
                  </p>
                </form>
              </div>
          </div>
        </div>
      </section>
    </div>
  );
}
