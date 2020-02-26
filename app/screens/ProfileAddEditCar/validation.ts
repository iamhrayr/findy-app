import * as Yup from 'yup';

export default Yup.object().shape({
  carNumber: Yup.string().required('Please enter Car Number'),
  carModel: Yup.string().required('Please enter Car Model'),
  color: Yup.string().required('Please enter colorw'),
});
