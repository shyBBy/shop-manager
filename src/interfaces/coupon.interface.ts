export interface CreateCouponFormDataInterface {
    code: string;
    discount_type: string;
    // description?: string; // Description jest teraz opcjonalne
    date_expires: string | Date;
    individual_use: boolean | string;
    usage_limit_per_user: number;
    amount: string;
    exclude_sale_items: boolean | string;
    // minimum_amount?: string; // Minimum_amount jest teraz opcjonalne
}


export interface CouponProfile {
    id: number;
    code: string;
    amount: string;
    status: string;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    discount_type: string;
    description: string;
    date_expires: string;
    date_expires_gmt: string;
    usage_count: number;
    individual_use: boolean;
    product_ids: number[];
    excluded_product_ids: number[];
    usage_limit: number | null;
    usage_limit_per_user: number;
    limit_usage_to_x_items: number | null;
    free_shipping: boolean;
    product_categories: number[];
    excluded_product_categories: number[];
    exclude_sale_items: boolean;
    minimum_amount: string;
    maximum_amount: string;
    email_restrictions: string[];
    used_by: any[];
    meta_data: CouponMetaData[];
    _links: CouponLinks;
}

export interface CouponMetaData {
    id: number;
    key: string;
    value: string;
}

export interface CouponLinks {
    self: CouponLink[];
    collection: CouponLink[];
}

export interface CouponLink {
    href: string;
}

export type CouponResponse = CouponProfile
export type GetListOfAllCouponsResponse = CouponResponse[]
