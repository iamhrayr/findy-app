import * as Yup from 'yup';
import { phoneNumber } from '@app/helpers/regexp';

export default Yup.object().shape({
  fullName: Yup.string().required('Full Name could not be empty'),
  phoneNumber: Yup.string()
    .matches(phoneNumber, 'Please enter valid phone number')
    .required('Phone Number could not be empty'),
});
