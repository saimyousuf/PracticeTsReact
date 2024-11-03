export interface FormErrors {
  name?: any;
  lastName?: string;
  email?: string;
  password?: string;
  zip?: string;
  extraCode?: string;
  phone?: string;
}

export const initialErrors: FormErrors = {
  name: undefined,
  lastName: undefined,
  email: undefined,
  password: undefined,
  zip: undefined,
  extraCode: undefined,
  phone: undefined,
};
