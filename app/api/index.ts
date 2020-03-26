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

  fetchProfileSettings = () => {
    return http({
      url: 'accounts/change-notification/',
      method: 'get',
    });
  };

  changeProfileSettings = (data: {
    notificationMethod?: string;
    showPhoneNumber?: boolean;
  }) => {
    return http({
      url: 'accounts/change-notification/',
      method: 'put',
      data,
    });
  };

  editUser = (data: { firstName: string; lastName: string; email: string }) => {
    return http({
      url: '/accounts/edit-user/',
      method: 'patch',
      data,
    });
  };

  /*************/
  /* Events */
  fetchThreads = () => {
    return http({
      url: '/messaging/inbox/',
      method: 'get',
    });
  };

  fetchThreadMessages = (id: Id) => {
    return http({
      url: `/messaging/inbox/${id}`,
      method: 'get',
    });
  };

  checkCarExistance = (carNumber: string) => {
    return http({
      url: `/accounts/check_car/${carNumber}`,
      method: 'get',
    });
  };

  sendMessage = (data: { carId: Id; message: string }) => {
    return http({
      url: '/api/v1/messaging/send-message',
      method: 'post',
      data,
    });
  };
}

export default new Api();
