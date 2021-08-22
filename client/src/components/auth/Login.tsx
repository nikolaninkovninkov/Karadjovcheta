import React from 'react';
import { Field, Form, Formik } from 'formik';
import { object, string } from 'yup';
import useAuth from '../../hooks/useAuth';
import LoginData from '../../types/LoginData';
import getFirstPropertyValue from '../../utils/getFirstProperty';
export default function Login() {
  const { login, error } = useAuth();
  const LoginSchema = object().shape({
    username: string().required('Username/Email field is required'),
    password: string().required('Password field is required'),
  });
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
        validationSchema={LoginSchema}
      >
        {({ errors, touched }) => (
          <Form className="auth-form">
            <div className="heading">
              <h1>Login</h1>
            </div>
            <label htmlFor="username">Username/Email</label>
            <Field name="username" className="field"></Field>
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" className="field"></Field>
            <div className="error">
              {getFirstPropertyValue(errors) ?? error?.response.data.message}
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
