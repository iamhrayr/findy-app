import { http } from '@app/helpers/http';

class Api {
  /********/
  /* AUTH */
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

  refreshToken = (refresh: string) => {
    return http({
      url: 'accounts/refresh-token/',
      method: 'post',
      data: { refresh },
    });
  };

  /*************************/
  /* car brands and models */
  fetchBrandsAndModels = () => {
    return http({
      url: 'accounts/add-car-info/',
      method: 'get',
    });
  };

  /***********/
  /* profile */
  fetchMyCars = () => {
    return http({
      url: 'accounts/user-cars',
      method: 'get',
    });
  };

  addCar = (data: { carNumber: string; carModel: number; color: string }) => {
    return http({
      url: 'accounts/add-car/',
      method: 'post',
      data,
    });
  };

  editCar = (
    data: { carNumber?: string; carModel?: number; color?: string },
    carId?: Id,
  ) => {
    return http({
      url: `accounts/edit-car/${carId}/`,
      method: 'patch',
      data,
    });
  };

  removeCar = (carId: Id) => {
    return http({
      url: `accounts/delete-car/${carId}`,
      method: 'delete',
    });
  };

  changeAvatar = (data: FormData) => {
    return http({
      url: 'accounts/change-avatar/',
      method: 'post',
      data,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };
}

export default new Api();
