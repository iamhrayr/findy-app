import * as Yup from 'yup';

export default Yup.object().shape({
  carNumber: Yup.string().required('Please enter Car Number'),
  make: Yup.string().required('Please select Car Make'),
  model: Yup.string().required('Please select Car Model'),
  color: Yup.string().required('Please enter colorw'),
});
