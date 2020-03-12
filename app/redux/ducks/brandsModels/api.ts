import { http } from '@app/helpers/http';

class CarApi {
  fetchBrandsAndModels = () => {
    return http({
      url: 'accounts/add-car-info/',
      method: 'get',
    });
  };
}

export default new CarApi();
