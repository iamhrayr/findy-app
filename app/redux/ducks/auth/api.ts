import http from '@app/helpers/http';

export const login = (data: { email: string; password: string }) => {
  return http({
    url: '/login',
    method: 'post',
    data,
  });
};

export const register = (email: string, password: string) => {
  return http({
    url: '/register',
    method: 'post',
    data: { email, password },
  });
};
