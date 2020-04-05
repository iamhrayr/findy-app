import * as Yup from 'yup';
import { phoneNumber } from '@app/helpers/regexp';

export default Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(phoneNumber, 'Phone number is not valid')
    .required('Please enter phone number'),
  password: Yup.string()
    .min(4, 'Too short password!')
    .max(50, 'Too Long!')
    .required('Please enter password'),
});
