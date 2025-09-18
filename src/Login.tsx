import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image, // Use Alert for simple popups in React Native
} from 'react-native';
import {API_URL} from '../config';
import tw from 'twrnc';
import colors from '../styles/color';

const Login = ({onLoginSuccess}: {onLoginSuccess: () => void}) => {
  const [username, setUsername] = useState('test@t4t.org');
  const [password, setPassword] = useState('123456');
  const [message, setMessage] = useState({text: '', type: ''});
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    if (username === '' || password === '') {
      if (!password.trim()) {
        Alert.alert('Warning', 'Password tidak boleh kosong');
        return;
      }
    }

    setIsLoading(true);
    try {
      const {data} = await axios.post(API_URL + 'Login', {
        email: username,
        password,
        program_year: '2025',
      });
      const {access_token, User} = data.data.result;
      const userString = JSON.stringify(User);
      AsyncStorage.multiSet([
        ['@token', access_token],
        ['@user', userString],
      ]);
      Alert.alert('Sukses', 'Login berhasil!');
      setMessage({text: 'Login berhasil!', type: 'success'});
      setIsLoading(false);
      onLoginSuccess();
    } catch (error: any) {
      setIsLoading(false);
      console.log('err', error?.response);

      Alert.alert(
        'Failed',
        error?.response?.data?.message || 'Tidak Ada koneksi internet',
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={tw`flex flex-row mb-4`}>
          <Image
            source={{
              uri: 'https://trees4trees.org/wp-content/uploads/2024/07/Trees4Trees-Logo-removebg-preview.png',
            }}
            style={tw`w-25 h-30 rounded-md mr-2`}
          />
          <View style={tw`flex self-center`}>
            <Text style={[tw`text-xl font-bold`, {color: colors.green}]}>
              Login Page
            </Text>
            <Text style={tw`text-black mt-1`}>Aplikasi Grower Trees4Trees</Text>
          </View>
        </View>
        <View style={[styles.form]}>
          <View style={tw`flex-row items-center mb-1`}>
            <Text style={tw`text-sm text-black font-sans-bold`}>
              Alamat Email
            </Text>
            <Text style={tw`text-sm text-red-500 font-light ml-1`}>*</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder="email"
            placeholderTextColor="#8e8e8e"
            keyboardType="default"
            autoCapitalize="none"
          />

          <View style={tw`flex-row items-center mb-1`}>
            <Text style={tw`text-sm text-black font-sans-bold`}>Password</Text>
            <Text style={tw`text-sm text-red-500 font-light ml-1`}>*</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            placeholderTextColor="#8e8e8e"
            secureTextEntry
          />
          <Text
            style={[
              tw`text-center underline text-sm font-bold py-4`,
              {
                color: colors.biru,
              },
            ]}>
            Lupa Password? Klik di Sini
          </Text>
          <TouchableOpacity
            style={[
              styles.button,
              isLoading && styles.buttonDisabled,
              tw`rounded-full`,
              {
                backgroundColor: colors.green,
              },
            ]}
            onPress={login}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={[styles.buttonText, tw`rounded-full`]}>Login</Text>
            )}
          </TouchableOpacity>
        </View>
        {message.text ? (
          <View
            style={[
              styles.messageBox,
              message.type === 'success' ? styles.successBox : styles.errorBox,
            ]}>
            <Text
              style={[
                styles.messageText,
                message.type === 'success'
                  ? styles.successText
                  : styles.errorText,
              ]}>
              {message.text}
            </Text>
          </View>
        ) : null}
      </View>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Test T4T</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: -80, // Menggeser ke atas untuk menyeimbangkan visual
  },
  logo: {
    fontSize: 50,
    fontWeight: '300',
    fontFamily: 'Roboto', // Ganti font ini jika Anda memiliki font Instagram
    marginBottom: 40,
    color: '#000',
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: '#fafafa',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 14,
    color: '#000',
    borderColor: '#dbdbdb',
    borderWidth: 1,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3897f0',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#b2dffc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  forgotPassword: {
    color: '#385185',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 15,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#dbdbdb',
  },
  separatorText: {
    marginHorizontal: 15,
    color: '#8e8e8e',
    fontWeight: '600',
    fontSize: 12,
  },
  facebookButton: {
    marginTop: 10,
  },
  facebookText: {
    color: '#385185',
    fontWeight: '600',
    fontSize: 14,
  },
  messageBox: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  successBox: {
    backgroundColor: '#e6f7e9',
  },
  errorBox: {
    backgroundColor: '#fde9e9',
  },
  messageText: {
    fontWeight: '500',
    textAlign: 'center',
  },
  successText: {
    color: '#00870c',
  },
  errorText: {
    color: '#d9534f',
  },
  signupContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#dbdbdb',
    backgroundColor: '#fff',
  },
  signupText: {
    fontSize: 14,
    color: '#8e8e8e',
    marginRight: 5,
  },
  signupLink: {
    fontSize: 14,
    color: '#3897f0',
    fontWeight: '600',
  },
});

export default Login;
