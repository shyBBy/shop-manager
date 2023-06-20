import AsyncStorage from '@react-native-async-storage/async-storage';

class API {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${config.API_URL}`;
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

  public async getStoreByUserUuid(user_uuid: string) {
    try {
      const headers = await this.getAuthorizationHeader();
      const response = await fetch(`${this.baseUrl}/store/${user_uuid}`, {
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
    try {
      const headers = await this.getAuthorizationHeader();
      const response = await fetch(`${this.baseUrl}/stores`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storeData),
      });
      return this.handleResponse(response);
    } catch (error) {
      console.error('Błąd tworzenia sklepu:', error);
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
