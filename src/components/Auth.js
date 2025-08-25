import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthView() {
    const [isLogin, setIsLogin] = useState(true);

    const changeForm = () => {
        setIsLogin(!isLogin);
    }

    return(
        <View style = { styles.viewTitle }>
            <Image style = { styles.logo } source = { require('../assets/logo.png') }/>
            { isLogin ? (<LoginForm changeForm = {changeForm}/>) : (<RegisterForm changeForm = {changeForm}/>) }
        </View>
    );
}

const styles = StyleSheet.create({
    viewTitle: {
        flex: 0,
        alignItems: 'center',
    },
    logo: {
        width: '80%',
        height: 240,
        marginTop: 50,
        marginBottom: 50,
    }, 
});