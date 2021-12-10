import { Field, Form, Formik, FormikErrors } from 'formik';
import useAuth from '../../hooks/useAuth';
import * as yup from 'yup';
import getFirstPropertyValue from '../../utils/getFirstProperty';
import RegisterData from '../../types/requests/RegisterData';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Loader from '../layout/Loader';
export default function Register() {
  const { register, error, loading } = useAuth();
  const [t] = useTranslation('auth');
  const registerSchema = yup.object().shape({
    name: yup.string().required('Name field is required'),
    username: yup
      .string()
      .required(t('username-field-required'))
      .min(3, t('username-min-length'))
      .max(32, t('username-max-length'))
      .test(
        'username-check',
        t('username-requirements'),
        (username) => !!username && /^[a-zA-Z0-9._]+$/.test(username),
      ),
    email: yup
      .string()
      .required(t('email-field-required'))
      .email(t('email-not-valid')),
    password: yup
      .string()
      .required(t('password-field-required'))
      .min(8, t('password-min-length'))
      .max(32, t('password-max-length')),
  });

  function getDisplayError(errors: FormikErrors<RegisterData>) {
    if (getFirstPropertyValue(errors)) {
      return getFirstPropertyValue(errors);
    }
    if (error?.response?.data.message) return t(error.response.data.message);
    if (typeof error?.response?.data?.errors?.length == 'number')
      return error.response.data.errors[0].msg;
    if (error) return t('unexpected-error');
  }
  return !loading ? (
    <Formik
      initialValues={
        { username: '', password: '', email: '', name: '' } as RegisterData
      }
      onSubmit={register}
      validationSchema={registerSchema}>
      {({ errors, touched }) => (
        <Form className='auth-form'>
          <div className='heading'>
            <h1>{t('register')}</h1>
          </div>
          <label htmlFor='name'>{t('name')}</label>
          <Field name='name' className='field'></Field>
          <label htmlFor='email'>{t('email')}</label>
          <Field name='email' className='field'></Field>
          <label htmlFor='username'>{t('username')}</label>
          <Field name='username' className='field'></Field>
          <label htmlFor='password'>{t('password')}</label>
          <Field name='password' className='field' type='password'></Field>
          <div className='error'>{getDisplayError(errors)}</div>
          <button type='submit'>{t('submit')}</button>
          <div className='footer'>
            {t('already-account') + ' '}
            <Link to='/login' className='link'>
              {t('here')}
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  ) : (
    <Loader />
  );
}
