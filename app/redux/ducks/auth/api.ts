import http from '@app/helpers/http';

class AuthApi {
  login = (data: { email: string; password: string }) => {
    return http({
      url: 'accounts/login/',
      method: 'post',
      data,
    });
  };

  register = (data: { email: string; password: string }) => {
    return http({
      url: 'accounts/signup',
      method: 'post',
      data,
    });
  };
}

export default new AuthApi();
