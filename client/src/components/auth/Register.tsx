import { Field, Form, Formik } from 'formik';
import useAuth from '../../hooks/useAuth';
import * as yup from 'yup';
import getFirstPropertyValue from '../../utils/getFirstProperty';

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
  return (
    <Formik
      initialValues={{ username: '', password: '', email: '', name: '' }}
      onSubmit={register}
      validationSchema={registerSchema}
    >
      {({ errors, touched }) => (
        <Form className="auth-form">
          <div className="heading">
            <h1>Register</h1>
          </div>
          <label htmlFor="name">Name</label>
          <Field name="name" className="field"></Field>
          <label htmlFor="email">Email</label>
          <Field name="email" className="field"></Field>
          <label htmlFor="username">Username</label>
          <Field name="username" className="field"></Field>
          <label htmlFor="password">Password</label>
          <Field name="password" className="field" type="password"></Field>
          <div className="error">
            {getFirstPropertyValue(errors) ?? error?.response.data.message}
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}
