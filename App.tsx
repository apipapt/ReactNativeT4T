import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Login from './src/Login';
import Home from './src/Home';
import {logout} from './helpers/fetcher';

const App = () => {
  const [token, setToken] = useState('');

  const getToken = async () => {
    const token = await AsyncStorage.getItem('@token');
    console.log('Token:', token);
    setToken(token || '');
  };

  useEffect(() => {
    getToken();
  }, []);

  const onLogout = () => {
    logout();
    getToken();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {token ? (
        <Home onLogout={onLogout} />
      ) : (
        <Login onLoginSuccess={getToken} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1f2937',
    marginBottom: 24,
  },
  form: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1f2937',
    borderColor: '#d1d5db',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#93c5fd',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  messageBox: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  successBox: {
    backgroundColor: '#dcfce7',
  },
  errorBox: {
    backgroundColor: '#fee2e2',
  },
  messageText: {
    fontWeight: '500',
    textAlign: 'center',
  },
  successText: {
    color: '#16a34a',
  },
  errorText: {
    color: '#dc2626',
  },
});

export default App;
