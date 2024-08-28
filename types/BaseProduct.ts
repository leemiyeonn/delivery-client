export interface BaseProduct extends BaseModel {
  id: string;
  name: string;
  price: number;
  storeId: string;
}
