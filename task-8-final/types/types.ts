interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  sold: number;
}
class GenericTable<T> {
  data: T[];

  constructor(data: T[]) {
    this.data = data;
  }

  getAll(): T[] {
    return this.data;
  }
}
