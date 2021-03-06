import { AxiosError } from 'axios';
import { Field, Form, Formik, FormikErrors } from 'formik';
import React from 'react';
import * as yup from 'yup';
import NewsArticleData from '../../types/requests/NewsArticleData';
import getFirstPropertyValue from '../../utils/getFirstProperty';
export default function NewsCreateArticle({
  error,
  createArticle,
}: {
  error: AxiosError | undefined;
  createArticle: (articleData: NewsArticleData) => Promise<void>;
}) {
  const createNewArticleSchema = yup.object().shape({
    title: yup
      .string()
      .required('Title field is required')
      .test(
        'title-length-check',
        'Title must be a maximum of 100 and a minimum of 10 characters long',
        (title) => !!title && title.length <= 100 && title.length >= 10,
      ),
    content: yup.string().required('Content field is required'),
  });
  function getDisplayError(errors: FormikErrors<NewsArticleData>) {
    if (getFirstPropertyValue(errors)) {
      return getFirstPropertyValue(errors);
    }
    if (error?.response?.data.message) return error.response.data.message;
    if (error) return 'An unexpected error has occurred. Please try again.';
  }
  return (
    <div className='news-create-article'>
      <Formik
        onSubmit={createArticle}
        initialValues={{ title: '', content: '' }}
        validationSchema={createNewArticleSchema}>
        {({ errors, touched }) => (
          <Form className='form'>
            <div className='heading'>
              <h1>Create a new article</h1>
            </div>
            <label htmlFor='title'>Title</label>
            <Field name='title' className='field' />
            <label htmlFor='content'>Content</label>
            <Field as='textarea' name='content' className='field' />
            <div className='error'>{getDisplayError(errors)}</div>
            <button type='submit'>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
