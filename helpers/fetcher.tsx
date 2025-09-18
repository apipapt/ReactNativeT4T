import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosRequestConfig, AxiosError, AxiosInstance} from 'axios';
import {API_URL} from '../config';

export const getToken = async () => {
  try {
    return (await AsyncStorage.getItem('@token')) || '';
  } catch (e) {
    console.log(e);
    return '';
  }
};

export const getUser = async () => {
  try {
    const value = await AsyncStorage.getItem('@user');
    if (value !== null) {
      // Mengubah string menjadi objek
      const userObject = JSON.parse(value);
      return userObject;
    }
  } catch (error) {
    console.log('Error saat mengambil data: ', error);
  }
};

export const logout = async () => {
  try {
    // Google Account disconnected from your app.
    // Perform clean-up actions, such as deleting data associated with the disconnected account.
    await AsyncStorage.clear();
  } catch (error: any) {
    console.log(error);
  }
};

const fetcher = async (
  config?: Omit<AxiosRequestConfig, 'baseURL'>,
): Promise<AxiosInstance> => {
  const access_token = await getToken();
  const axiosInstance = axios.create({
    ...config,
    baseURL: API_URL,
    headers: {
      ...config?.headers,
      Authorization: `Bearer ${access_token}`,
    },
  });

  axiosInstance.interceptors.response.use(
    async (res: any) => {
      return res;
    },
    async (error: AxiosError) => {
      const unauthorized = error.response?.status === 401;

      // Add a whitelist for certain endpoints
      // If the whitelisted endpoint returned 401, do not hit refresh token API
      const whitelistedEndpoints = ['/auth', '/login'];
      const url = error.response?.config?.url || '';

      if (unauthorized && !whitelistedEndpoints.includes(url)) {
        await AsyncStorage.removeItem('@token');
        const access_tokenRemoved = true;
        if (access_tokenRemoved) {
          console.log(url, 'urlfetch');
          return logout();
        }

        // await tokenRefresher();
        return axiosInstance(error.config!);
      }

      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

// const tokenRefresher = async () => {
//   try {
//     const res = await (await fetcher()).post('/auth/refresh');

//     return res;
//   } catch (error: any) {
//     throw error;
//   }
// };

export default fetcher;
