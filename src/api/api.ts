import AsyncStorage from '@react-native-async-storage/async-storage';
import {config} from "../config/config";
import {ToastAndroid} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {HomeNavigationProp} from "../interfaces/navigation.interfaces";

class API {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${config.API_URL}`; // Zmień to na właściwy adres API
    }

    private async getAuthorizationHeader() {
        const token = await AsyncStorage.getItem('jwt');
        return {
            Authorization: `Bearer ${token}`,
        };
    }

    private async handleResponse(response: Response) {
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
        return response.json();
    }

    public async getStoreByUserUuid(user_uuid: string | any) {
        try {
            const headers = await this.getAuthorizationHeader();
            const response = await fetch(`https://api.dev-olczak.pl/store/${user_uuid}`, {
                headers,

            });
            return this.handleResponse(response);
        } catch (error) {
            console.error('Błąd pobierania sklepu:', error);
            throw error;
        }
    }

    public async getAllStores() {
        try {
            const headers = await this.getAuthorizationHeader();
            const response = await fetch(`${this.baseUrl}/store/list`, {
                headers,
            });
            return this.handleResponse(response);
        } catch (error) {
            console.error('Błąd pobierania wszystkich sklepów:', error);
            throw error;
        }
    }

    public async getOrder(orderId: string) {
        try {
            const headers = await this.getAuthorizationHeader();
            const response = await fetch(`${this.baseUrl}/orders/${orderId}`, {
                headers,
            });
            return this.handleResponse(response);
        } catch (error) {
            console.error('Błąd pobierania zamówienia:', error);
            throw error;
        }
    }

    public async getAllOrders() {
        try {
            const headers = await this.getAuthorizationHeader();
            const response = await fetch(`${this.baseUrl}/orders`, {
                headers,
            });
            return this.handleResponse(response);
        } catch (error) {
            console.error('Błąd pobierania wszystkich zamówień:', error);
            throw error;
        }
    }

    public async createStore(storeData: any) {
        const navigation = useNavigation<HomeNavigationProp>();
        try {
            const headers = await this.getAuthorizationHeader();
            const response = await fetch(`${this.baseUrl}/store/create`, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(storeData),
            });

            if (!response.ok) {
                ToastAndroid.show(`${storeData.message}`, ToastAndroid.SHORT);
                return;
            }

            const res = await response.json();
            ToastAndroid.show(`Pomyślnie utworzono sklep: ${storeData.name}`, ToastAndroid.SHORT);
            navigation.reset({
                index: 0,
                routes: [{name: "Główna"}],
            });
            return res
        } catch (error) {
            ToastAndroid.show('Coś poszło nie tak, spróbuj jeszcze raz.', ToastAndroid.SHORT);
            return;
        }
    }

    public async changeOrderStatus(orderId: string, newStatus: string) {
        try {
            const headers = await this.getAuthorizationHeader();
            const response = await fetch(`${this.baseUrl}/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });
            return this.handleResponse(response);
        } catch (error) {
            console.error('Błąd zmiany statusu zamówienia:', error);
            throw error;
        }
    }

    public async getLoggedInUser() {
        try {
            const headers = await this.getAuthorizationHeader();
            const response = await fetch(`${this.baseUrl}/user`, {
                headers,
            });
            return this.handleResponse(response);
        } catch (error) {
            console.error('Błąd pobierania zalogowanego użytkownika:', error);
            throw error;
        }
    }
}

export default new API();


//AXIOS METHOD


// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios, { AxiosInstance } from 'axios';
//
// class API {
//     private client: AxiosInstance;
//
//     constructor() {
//         this.client = axios.create({
//             baseURL: 'https://api.dev-olczak.pl',
//         });
//
//         this.client.interceptors.request.use(async (config) => {
//             const token = await AsyncStorage.getItem('jwt');
//             if (token) {
//                 config.headers.Authorization = `Bearer ${token}`;
//             }
//             return config;
//         });
//     }
//
//     public async getStoreByUserUuid(user_uuid: string | any) {
//         try {
//             const response = await this.client.get(`/store/${user_uuid}`);
//             return response.data;
//         } catch (error) {
//             console.error('Błąd pobierania sklepu:', error);
//             throw error;
//         }
//     }
//
//
//     public async getAllStores() {
//         try {
//             const response = await this.client.get('/stores');
//             return response.data;
//         } catch (error) {
//             console.error('Błąd pobierania wszystkich sklepów:', error);
//             throw error;
//         }
//     }
//
//     public async getOrder(orderId: string) {
//         try {
//             const response = await this.client.get(`/orders/${orderId}`);
//             return response.data;
//         } catch (error) {
//             console.error('Błąd pobierania zamówienia:', error);
//             throw error;
//         }
//     }
//
//     public async getAllOrders() {
//         try {
//             const response = await this.client.get('/orders');
//             return response.data;
//         } catch (error) {
//             console.error('Błąd pobierania wszystkich zamówień:', error);
//             throw error;
//         }
//     }
//
//     public async createStore(storeData: any) {
//         try {
//             const response = await this.client.post('/store/create', storeData);
//             return response.data;
//         } catch (error) {
//             console.error('Błąd tworzenia sklepu:', error);
//             throw error;
//         }
//     }
//
//     public async changeOrderStatus(orderId: string, newStatus: string) {
//         try {
//             const response = await this.client.put(`/orders/${orderId}/status`, { status: newStatus });
//             return response.data;
//         } catch (error) {
//             console.error('Błąd zmiany statusu zamówienia:', error);
//             throw error;
//         }
//     }
//
//     public async getLoggedInUser() {
//         try {
//             const response = await this.client.get('/user');
//             return response.data;
//         } catch (error) {
//             console.error('Błąd pobierania zalogowanego użytkownika:', error);
//             throw error;
//         }
//     }
// }
//
// export default new API();

