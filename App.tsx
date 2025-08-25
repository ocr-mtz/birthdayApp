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

function App() {
  const [user, setUser] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser('Estas logeado');
      } else {
        setUser('');
      }
    });
  }, []);

  return (
    <View>
      <StatusBar barStyle={'light-content'} />
      <SafeAreaView style = { styles.background }>
        <View>
          { user ? <ListBirthday /> : <AuthView />}
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
