import {config} from "../config/config";
import {ToastAndroid} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {HomeCouponNavigationProp, HomeNavigationProp} from "../interfaces/navigation.interfaces";
import {number, string} from "yup";

class API {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${config.API_URL}`; // Zmień to na właściwy adres API
    }


    private async getAuthorizationHeader() {
        return {
            credentials: 'include',
            'Content-Type': 'application/json',
        };
    }


    public async getAllStores() {
        try {
            const headers = await this.getAuthorizationHeader();
            const response = await fetch(`${this.baseUrl}/store/list`, {
                headers,
            });

        } catch (error) {
            console.error('Błąd pobierania wszystkich sklepów:', error);
            throw error;
        }
    }


    public async createStore(storeData: any, navigation: HomeNavigationProp) {
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
            return res;
        } catch (error) {
            ToastAndroid.show('Coś poszło nie tak, spróbuj jeszcze raz.', ToastAndroid.SHORT);
            return;
        }
    }







public async getOrder(orderId: string | number) {
        try {
            const response = await fetch(`${this.baseUrl}/order/${orderId}`, {
                credentials: 'include',
            });
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Błąd pobierania zamówienia:', error);
            throw error;
        }
    }

   
    public async getAllOrders() {
        try {

            const response = await fetch(`${this.baseUrl}/order/list`, {
                credentials: 'include',
            });
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Błąd pobierania wszystkich zamówień:', error);
            throw error;
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
                body: JSON.stringify({status: newStatus}),
            });

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

        } catch (error) {
            console.error('Błąd pobierania zalogowanego użytkownika:', error);
            throw error;
        }
    }


   
   
   
   
    //REFUNDS SECTION START

    public async getAllRefunds() {
        try {

            const response = await fetch(`${this.baseUrl}/refund/list`, {
                credentials: 'include',
            });
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Błąd pobierania wszystkich zamówień:', error);
            throw error;
        }
    }

    public async getRefund(refundId: string | number) {
        try {
            const response = await fetch(`${this.baseUrl}/refund/${refundId}`, {
                credentials: 'include',
            });
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Błąd pobierania zwrotu:', error);
            throw error;
        }
    }

    public async deleteRefund(refundId: string | number) {
        try {
            const response = await fetch(`${this.baseUrl}/refund/${refundId}`, {
                method: "DELETE",
                credentials: 'include',
            });
            if (!response.ok) {
                ToastAndroid.show(`Nie udało się usunąć zwrotu.`, ToastAndroid.SHORT);
                return;
            }

            ToastAndroid.show(`Pomyślnie utworzono usunięto zwrot`, ToastAndroid.SHORT);
            return
        } catch (e) {
            ToastAndroid.show(`Coś poszło nie tak`, ToastAndroid.SHORT);
        }
    }

    //REFUNDS SECTION END

   
   
   
   
    //REPORTS SECTION START

    public async getSalesReport() {
        try {
            const response = await fetch(`${this.baseUrl}/order/reports/sales`, {
                credentials: 'include',
            });
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Błąd pobierania raportu:', error);
            throw error;
        }
    }

    public async getTopProductSalesReport() {
        try {
            const response = await fetch(`${this.baseUrl}/order/reports/topproducts`, {
                credentials: 'include',
            });
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Błąd pobierania raportu:', error);
            throw error;
        }
    }


    //REPORTS SECTION END


   
   
   
   
    //COUPONS SECTION START

    public async getOneCoupon(couponId: string | number) {
        try {
            const response = await fetch(`${this.baseUrl}/store/coupon/${couponId}`, {
                credentials: 'include',
            });
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Błąd pobierania kuponu:', error);
            throw error;
        }
    }

    public async getAllCoupons() {
        try {

            const response = await fetch(`${this.baseUrl}/store/coupon/list`, {
                credentials: 'include',
            });
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Błąd pobierania wszystkich kuponów', error);
            throw error;
        }
    }

    public async createCoupon(couponData: any) {
        try {
            const headers = await this.getAuthorizationHeader();
            const response = await fetch(`${this.baseUrl}/store/coupon/create`, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(couponData),
            });



            if (!response.ok) {
                ToastAndroid.show(`${couponData.message}`, ToastAndroid.SHORT);
                return;
            }

            const res = await response.json();
            ToastAndroid.show(`Pomyślnie utworzono kupon: ${couponData.code}`, ToastAndroid.SHORT);
            return res
        } catch (error) {
            console.log(error)
            ToastAndroid.show('Coś poszło nie tak, spróbuj jeszcze raz.', ToastAndroid.SHORT);
            return;
        }
    }

    public async removeCoupon(couponId: string | number) {
        try {
            const response = await fetch(`${this.baseUrl}/store/coupon/${couponId}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            const data = await response.json()
            ToastAndroid.show('Pomyślnie usunięto kupon', ToastAndroid.SHORT);
            return data
        } catch (error) {
            console.error('Błąd usuwania kuponu:', error);
            throw error;
        }
    }


    //COUPONS SECTION END
    
    
    
   //CLIENTS SECTION START
   
   
    public async getOneCustomer(couponId: string | number) {
        try {
            const response = await fetch(`${this.baseUrl}/store/coupon/${couponId}`, {
                credentials: 'include',
            });
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Błąd pobierania kuponu:', error);
            throw error;
        }
    }

    public async getAllCustomers(page: any, rowsPerPage: any) {
        try {

            const response = await fetch(`${config.API_URL}/customer/list?page=${page}&perPage=${rowsPerPage}`, {
                credentials: 'include',
            });
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Błąd pobierania wszystkich klientów', error);
            throw error;
        }
    }

    
    
    
}

export default new API();


