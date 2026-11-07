export type HeadphoneType = "Earbuds" | "Over-ear" | "On-ear";
export type ProductColor = "Black" | "Pink" | "Red" | "White";
export type ProductMaterial = "Plastic" | "Metal" | "Leather";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  type: HeadphoneType;
  color: ProductColor;
  material: ProductMaterial;
  onOffer: boolean;
}
