import React, { useEffect } from 'react';
import { Field, Form, Formik, FormikErrors } from 'formik';
import { object, string } from 'yup';
import useAuth from '../../hooks/useAuth';
import LoginData from '../../types/requests/LoginData';
import getFirstPropertyValue from '../../utils/getFirstProperty';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import quake from '../../utils/quake';
export default function Login() {
  const { login, error } = useAuth();
  useEffect(() => {
    if (error) quake();
  }, [error]);
  const [t] = useTranslation('auth');
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
              <h1>{t('login')}</h1>
            </div>
            <label htmlFor='username'>{`${t('username')}/${t('email')}`}</label>
            <Field name='username' className='field'></Field>
            <label htmlFor='password'>{t('password')}</label>
            <Field name='password' type='password' className='field'></Field>

            <div className='error'>{getDisplayError(errors)}</div>
            <button type='submit'>{t('submit')}</button>
            <div className='footer'>
              {t('no-account') + ' '}
              <Link className='link' to='/register'>
                {t('here')}
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
