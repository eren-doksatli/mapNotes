import * as Yup from 'yup';

const addNoteSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Please enter at least 3 characters.')
    .max(30, 'Please enter no more than 30 characters.')
    .required('This field is required.'),
  description: Yup.string()
    .min(10, 'Please enter at least 10 characters.')
    .max(300, 'Please enter no more than 300 characters.')
    .required('This field is required.'),
  time: Yup.string().required('This field is required.'),
  date: Yup.string().required('This field is required.'),
});

const SingInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email.')
    .min(10, 'Please enter at least 3 characters.')
    .max(30, 'Please enter no more than 30 characters.')
    .required('This field is required.'),
  password: Yup.string()
    .min(5, 'Please enter at least 10 characters.')
    .max(300, 'Please enter no more than 300 characters.')
    .required('This field is required.'),
});

const SingUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(10, 'Please enter at least 3 characters.')
    .max(30, 'Please enter no more than 30 characters.')
    .required('This field is required.'),
  email: Yup.string()
    .email('Please enter a valid email.')
    .min(10, 'Please enter at least 3 characters.')
    .max(30, 'Please enter no more than 30 characters.')
    .required('This field is required.'),
  password: Yup.string()
    .min(5, 'Please enter at least 10 characters.')
    .max(300, 'Please enter no more than 300 characters.')
    .required('This field is required.'),
});

export {addNoteSchema, SingInSchema, SingUpSchema};
