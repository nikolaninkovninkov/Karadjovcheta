import { Field, Form, Formik, FormikErrors } from 'formik';
import useAuth from '../../hooks/useAuth';
import * as yup from 'yup';
import getFirstPropertyValue from '../../utils/getFirstProperty';
import RegisterData from '../../types/RegisterData';
import { Link } from 'react-router-dom';
export default function Register() {
  const { register, error } = useAuth();
  const registerSchema = yup.object().shape({
    name: yup.string().required('Name field is required'),
    username: yup
      .string()
      .required('Username field is required')
      .test(
        'no-space-lowercase-min-3-check',
        'Username must be all lowercase, at least 3 characters in length, and have no spaces in it',
        (username) =>
          !!username && username.length >= 3 && !/\s/.test(username),
      ),
    email: yup
      .string()
      .required('Email field is required')
      .email('Email not valid'),
    password: yup
      .string()
      .required('Password field is required')
      .min(8, 'Password has to be at least 8 characters long')
      .max(32, 'Password has to be at most 32 characters long'),
  });
  function getDisplayError(errors: FormikErrors<RegisterData>) {
    if (getFirstPropertyValue(errors)) {
      return getFirstPropertyValue(errors);
    }
    if (error?.response?.data.message) return error?.response?.data.message;
    if (error) return 'An unexpected error has occurred. Please try again.';
  }
  return (
    <Formik
      initialValues={
        { username: '', password: '', email: '', name: '' } as RegisterData
      }
      onSubmit={register}
      validationSchema={registerSchema}>
      {({ errors, touched }) => (
        <Form className='auth-form'>
          <div className='heading'>
            <h1>Register</h1>
          </div>
          <label htmlFor='name'>Name</label>
          <Field name='name' className='field'></Field>
          <label htmlFor='email'>Email</label>
          <Field name='email' className='field'></Field>
          <label htmlFor='username'>Username</label>
          <Field name='username' className='field'></Field>
          <label htmlFor='password'>Password</label>
          <Field name='password' className='field' type='password'></Field>
          <div className='error'>{getDisplayError(errors)}</div>
          <button type='submit'>Submit</button>
          <div className='footer'>
            Already have an account? Login{' '}
            <Link to='/login' className='link'>
              here
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}
