export interface Sale {
  id?: string;
  idCustomer: string;
  idProduct: string;
  amount?: number;
  numberProducts: number;
  idInformationPeriod?: string;
  nameProduct?: string;
  priceProduct?: string;
  firstNameCustomer?: string;
  lastNameCustomer?: string;
  createdAt?: string;
}
