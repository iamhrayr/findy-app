export type CarWithWrapper = {
  // TODO: force `chuvak` to fix this fucking extra car property in api
  car: Car;
};

export type Car = {
  pk: Id;
  carNumber: string;
  color: string;
  model: string;
  modelPk: Id;
  makePk: Id;
  makeName: string;
};
