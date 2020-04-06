export type Brand = {
  pk: Id;
  name: string;
};

export type Model = {
  pk: Id;
  name: string;
  makePk: Id;
};

export type CarBrandModel = {
  brands: Brand[];
  models: Model[];
};
