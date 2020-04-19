import * as Yup from 'yup';

export default Yup.object().shape({
  password: Yup.string().required('Please enter password'),
  confirmPassword: Yup.string().required('Please enter password confirmation'),
});
