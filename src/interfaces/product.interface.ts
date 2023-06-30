export interface Product {
    id: number;
    name: string;
    product_id: number;
    variation_id: number;
    quantity: number;
    tax_class: string;
    subtotal: string;
    subtotal_tax: string;
    total: string;
    total_tax: string;
    taxes: Tax[];
    meta_data: any[]; // Może być dowolny typ dla meta_data
    sku: string;
    price: number;
    image: ProductImage;
    parent_name: string | null;
}

export interface Tax {
    id: number;
    total: string;
    subtotal: string;
}

export interface ProductImage {
    id: string;
    src: string;
}