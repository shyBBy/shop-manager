export interface SingleShippingTrackingInterface {
    branch: string,
    datetime: string | Date,
    state: string,
    status: string
}

export interface ShippingTrackingResponse {
    tracking: SingleShippingTrackingInterface
}

export interface SingleShippingInterface {
    package_id: string;
    group_id: null;
    pickup: {
        name: string;
        company: string;
        street: string;
        postcode: string;
        city: string;
        country_code: string;
        county: null;
        email: string;
        phone: string;
        point: null;
        point_label: null;
        point_data: null;
    };
    sender: {
        name: string;
        company: string;
        street: string;
        postcode: string;
        city: string;
        country_code: string;
        county: null;
        email: string;
        phone: string;
        point_data: null;
        only_pickup_provided: true;
    };
    receiver: {
        name: string;
        company: string;
        street: string;
        postcode: string;
        city: string;
        country_code: string;
        county: null;
        email: string;
        phone: string;
        point: string;
        point_data: {
            code: string;
            name: string;
            original_name: string;
            active: true;
            opening_hours: {
                monday: {
                    start_hour: string;
                    end_hour: string;
                };
                tuesday: {
                    start_hour: string;
                    end_hour: string;
                };
                wednesday: {
                    start_hour: string;
                    end_hour: string;
                };
                thursday: {
                    start_hour: string;
                    end_hour: string;
                };
                friday: {
                    start_hour: string;
                    end_hour: string;
                };
                saturday: {
                    start_hour: string;
                    end_hour: string;
                };
                sunday: {
                    start_hour: string;
                    end_hour: string;
                };
            };
            max_supported_weight: null;
            cod: true;
            type: string;
            service: string;
            is_send_point: true;
            is_delivery_point: true;
            description: string;
            coordinates: {
                latitude: number;
                longitude: number;
            };
            distance: null;
            address: {
                postcode: string;
                street: string;
                city: string;
                country_code: string;
            };
            phone: null;
            photos: [];
            point_type_str: string;
            email: null;
            boxes_specification: null;
            holiday: false;
            service_type: string;
            holiday_period: null;
            furgonetka_point: null;
            facebook_url: null;
            digital_label: null;
        };
        point_label: string;
    };
    parcels: [
        {
            package_no: string;
            description: string;
            state_description: string;
            state: string;
            station: null;
            width: number;
            depth: number;
            height: number;
            weight: number;
            dimensional_weight: null;
            value: number;
            tracking_url: string;
            service: string;
            delivery_time: number;
            gauge: string;
            datetime_status: string;
        }
    ];
    additional_services: {
        cod: null;
        rod: false;
        cud: false;
        private_shipping: false;
        guarantee_0900: false;
        guarantee_0930: false;
        guarantee_1200: false;
        saturday_delivery: false;
        additional_handling: false;
        sms_predelivery_information: false;
        documents_supply: false;
        saturday_sunday_delivery: false;
        guarantee_next_day: false;
        fedex_priority: false;
        ups_saver: false;
        ups_standard: false;
        valuable_shipment: false;
        fragile: false;
        personal_delivery: false;
        poczta_kurier24: false;
        poczta_kurier48: false;
        pocztex: false;
        weight_30_50: false;
        delivery_on_day: string;
        courier_drive_up: false;
        registered_letter: false;
        registered_company_letter: false;
        registered_letter_international: false;
        poczta_globalexpres: false;
        delivery_confirmation: false;
        selected_pickup_date: false;
        valuable_package: false;
        self_pickup: false;
        insurance: true;
        ambro_size20: null;
        xpress_service: null;
        xpress_service_name: null;
        premium: false;
        receiver_sms_notification: false;
        inpost_letter: false;
        standard: false;
        mini: false;
        deligoo_express: false;
        city_size_small: false;
        srs: false;
        service_description: string;
        dox: false;
        long_package: false;
        large_package: false;
        avizo_pickup_sms: false;
        avizo_pickup_tel: false;
        avizo_delivery_tel: false;
        pickup_same_day: false;
        oversized_package: false;
        customs_clearance: false;
        additional_manipulative_fee: false;
        odb_sat: false;
        ps: false;
        destination_remote_area: false;
        destination_extended_area: false;
        origin_extended_area: false;
        city_size_large: false;
        city_size_medium: false;
        delivery_to_door: false;
        pickup_from_door: false;
        energy_fee: false;
        dimensional_weight_fee: false;
        ups_ship_notification: false;
        ups_exception_notification: false;
        ups_delivery_notification: false;
        digital_label: null;
    };
    type: string;
    pricing: {
        price_gross: number;
        price_net: number;
        price_base_net: number;
        price_org: number;
        adjusted_price: number;
        tax: number;
        price_info: string;
        details: [
            {
                service: string;
                price_net: number;
                description: string;
            }
        ];
    };
    user_reference_number: null;
    service: string;
    transport_service: string;
    transport_service_description: null;
    service_id: number;
    state: string;
    service_contract: string;
    cancel_available: boolean;
    complaint_available: boolean;
    cancel_details: {
        available: boolean;
        cancellation_done: boolean;
        cancellation_date: null;
        scheduled_cancel_date: null;
        before_cancel_message_type: null;
        pricelist_url: null;
    };
    edit_url: null;
    documents_url: string;
    add_similar_url: string;
    repickup: boolean;
    pickup_available: boolean;
    name: string;
    pickup_number: string;
    label: {
        file_format: string;
    };
    documents: [
        {
            type: string;
            format: string;
        }
    ];
    pickup_date: {
        date: string;
        min_time: string;
        max_time: string;
        info: string;
    };
    datetime_order: string;
    datetime_add: string;
    datetime_delivery: string;
    machine_command_available: null;
    point_command_available: null;
    duty: null;
    point_specific_details: null;
    delivery_time: string;
    changes: [
        {
            price: number;
            description: string;
            datetime: string;
            changed_by: null;
            protocol_url: null;
        }
    ];
    related_packages: [];
    changes_relations: [];
    return_disposition: null;
    readdressing_disposition: null;
    system_fees: null;
    digital_label: [];
}


export type GetOneShippingResponse = SingleShippingInterface
export type GetOneShippingTrackingResponse = SingleShippingTrackingInterface