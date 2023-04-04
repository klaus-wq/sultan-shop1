export interface Product {
  id: number;
  imageURL: string;
  imageAlt?: string;
  name: string;
  measurementType: string;
  measurementValue: string;
  barcode: string;
  manufacturer: string;
  brand: string;
  price: number;
  description: string;
  care: number[],
  type: string
}

export async function getProducts() {
  let file = await fetch('products.json');
  const p: Product[] = await file.json();
  return p;
}

