export interface FormData {
  name: string;
  lastName?: string;
  email: string;
  password: string;
  zip: string;
  extraCode?: string;
  phone: string;
}

export const initialValue: FormData = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  zip: "",
  extraCode: "",
  phone: "",
};
