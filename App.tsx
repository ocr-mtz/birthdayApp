/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { StatusBar, StyleSheet, View, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import { auth } from './src/utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import AuthView from './src/components/Auth';
import ListBirthday from './src/components/ListBirthday';
import { encode, decode } from 'base-64';

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

function App() {
  const [user, setUser] = useState<User | null>(null);
  console.log(user?.uid);

  useEffect(() => {
    onAuthStateChanged(auth, (response) => {
      if (response) {
        setUser(response);
      } else {
        setUser(null);
      }
    });
  }, []);

  if (user === undefined) return null;

  return (
    <View>
      <StatusBar barStyle={'light-content'} />
      <SafeAreaView style = { styles.background }>
        <View>
          { user ? <ListBirthday userlogged = { user }/> : <AuthView />}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#15212b',
    height: '100%',
  },
});

export default App;

interface User {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
}