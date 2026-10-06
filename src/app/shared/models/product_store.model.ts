import { Signal } from "@angular/core";
import { Product } from "../../features/products/models/product.model";

export interface ProductsStoreInterface {
    products: Signal<Product[]>;
    prodIsLoading: Signal<boolean>;
    load(): void;
}