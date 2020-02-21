import http from '@app/helpers/http';

class AuthApi {
  login = (data: { phoneNumber: string; password: string }) => {
    return http({
      url: 'accounts/login/',
      method: 'post',
      data,
    });
  };

  register = (data: { email: string; password: string }) => {
    return http({
      url: 'accounts/signup/',
      method: 'post',
      data,
    });
  };

  confirmPhoneNumber = (code: string) => {
    return http({
      url: 'accounts/confirm-phone/',
      method: 'post',
      data: { token: code },
    });
  };
}

export default new AuthApi();
