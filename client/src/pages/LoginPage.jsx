import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { InputField } from '../components/InputField'
import { PrimaryButton } from '../components/PrimaryButton'

export const LoginPage = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    password: ''
  })

  const handleInput = (e) => {
    const {name, value} = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues)
  }
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className='flex flex-col items-center p-4'>
          <Link to="/" className='font-semibold text-2xl mb-6'>DevNews</Link>
          <div className='w-full tablet:max-w-md bg-on-surface-1 rounded-lg shadow border border-stroke-bold'>
            <div className='p-6 space-y-4 laptop:space-y-6'>
              <h1 className='font-bold text-lg laptop:text-xl'>
                Sign in to your account
              </h1>
              <form action="" className='space-y-4 laptop:space-y-6'>
                <InputField
                  text="Username"
                  inputName="username"
                  inputType="text"
                  placeholder="example123"
                  classNameLabel='block'
                  classNameInput='w-full'
                  onChange={handleInput}
                />
                <InputField
                  text="Password"
                  inputName="password"
                  placeholder="••••••••"
                  inputType="password"
                  classNameLabel='block'
                  classNameInput='w-full'
                  onChange={handleInput}
                />
                <PrimaryButton onClick={handleSubmit} text="Sign in" className="w-full text-md font-semibold" />
                <p className='text-element-secondary'>
                  Dont have an account yet? <Link to='/register' className='text-element-primary font-semibold hover:text-element-secondary transition-all duration-150'
                  >Sign up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
