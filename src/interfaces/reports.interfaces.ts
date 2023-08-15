// Definicja interfejsu dla obiektu `totals`
interface TotalsData {
    sales: string;
    orders: number;
    items: number;
    tax: string;
    shipping: string;
    discount: string;
    customers: number;
}


// Definicja interfejsu dla całego obiektu z odpowiedzi
export interface SalesReportData {
    total_sales: string;
    net_sales: string;
    average_sales: string;
    total_orders: number;
    total_items: number;
    total_tax: string;
    total_shipping: string;
    total_refunds: number;
    total_discount: string;
    totals_grouped_by: string;
    totals: {
        [date: string]: TotalsData;
    };
    total_customers: number;
    _links: {
        about: {
            href: string;
        }[];
    };
}

export type GetOneSalesReportResponse = SalesReportData;



export interface TopProduct {
    name: string;
    product_id: number;
    quantity: number;
    _links: {
        about: {
            href: string;
        }[];
        product: {
            href: string;
        }[];
    };
    image: {
        url: string;
    };
};

export type GetOneTopProductResponse = TopProduct
export type GetListOfTopProductsResponse = GetOneTopProductResponse[]
