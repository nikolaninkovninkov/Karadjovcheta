import React from 'react';
import { Field, Form, Formik, FormikErrors } from 'formik';
import { object, string } from 'yup';
import useAuth from '../../hooks/useAuth';
import LoginData from '../../types/LoginData';
import getFirstPropertyValue from '../../utils/getFirstProperty';
import { Link } from 'react-router-dom';
export default function Login() {
  const { login, error } = useAuth();
  const LoginSchema = object().shape({
    username: string().required('Username/Email field is required'),
    password: string().required('Password field is required'),
  });
  function getDisplayError(errors: FormikErrors<LoginData>) {
    if (getFirstPropertyValue(errors)) {
      return getFirstPropertyValue(errors);
    }
    if (error?.response?.data.message) return error?.response?.data.message;
    if (error) return 'An unexpected error has occurred. Please try again.';
  }
  return (
    <div>
      <Formik
        initialValues={
          {
            password: '',
            username: '',
          } as LoginData
        }
        onSubmit={login}
        validationSchema={LoginSchema}>
        {({ errors, touched }) => (
          <Form className='auth-form'>
            <div className='heading'>
              <h1>Login</h1>
            </div>
            <label htmlFor='username'>Username/Email</label>
            <Field name='username' className='field'></Field>
            <label htmlFor='password'>Password</label>
            <Field name='password' type='password' className='field'></Field>
            <div className='error'>{getDisplayError(errors)}</div>
            <button type='submit'>Submit</button>
            <div className='footer'>
              Don't have an account? Register{' '}
              <Link className='link' to='/register'>
                here
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
