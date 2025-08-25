import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, View } from 'react-native';
import { validateEmail } from '../utils/validations';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';

export default function RegisterForm(props) {
    const { changeForm } = props;
    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({});

    const register = () => {
        let errors = {};
        if (!formData.email || !formData.password || !formData.repeatPassword) {
            if (!formData.email) errors.email = true;
            if (!formData.password) errors.password = true;
            if (!formData.repeatPassword) errors.repeatPassword = true;
        } else if (!validateEmail(formData.email)) {
            errors.email = true;
        } else if (formData.password !== formData.repeatPassword) {
            errors.password = true;
            errors.repeatPassword = true;
        } else if (formData.password.length < 6) {
            errors.password = true;
            errors.repeatPassword = true;
        } else {
            createUserWithEmailAndPassword(auth, formData.email, formData.password).then((userCredentials) => {
                const user = userCredentials.user;
            }).catch((error) => {
                setFormError({email: true, password: error, repeatPassword: true});
            });
        }
        setFormError(errors);
    };

    return (
        <>
            <TextInput 
                style = {[styles.input, formError.email && styles.error]} 
                placeholder = 'Correo Electronico' 
                placeholderTextColor = {{ color: '#969696' }} 
                onChange = { (e) => setFormData({ ...formData, email: e.nativeEvent.text }) }
            />
            <TextInput 
                style = {[styles.input, formError.password && styles.error]} 
                placeholder = 'Contraseña' 
                placeholderTextColor = {{ color: '#969696' }} 
                secureTextEntry = { true } 
                onChange = { (e) => setFormData({ ...formData, password: e.nativeEvent.text }) }
            />
            <TextInput 
                style = {[styles.input, formError.repeatPassword && styles.error]} 
                placeholder = 'Repetir contraseña' 
                placeholderTextColor = {{ color: '#969696' }} 
                secureTextEntry = { true } 
                onChange = { (e) => setFormData({ ...formData, repeatPassword: e.nativeEvent.text }) }
            />
            <TouchableOpacity onPress = { register }>
                <Text style = { styles.btnText }>Registrarse</Text>
            </TouchableOpacity>
            <View style = { styles.loginStyle }>
                <TouchableOpacity onPress = { changeForm }>
                    <Text style = { styles.btnText }>Iniciar sesión</Text>
                </TouchableOpacity>
            </View>
        </>
    );
} 

function defaultValue() {
    return {
        email: '', password: '', repeatPassword: '',
    };
}

const styles = StyleSheet.create({
    btnText: {
        color: '#fff',
        fontSize: 20,
    },
    input: {
        height: 50,
        color: '#fff',
        width: '80%',
        marginBottom: 25,
        backgroundColor: '#1e3040',
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 20,
        borderWidth: 1,
        borderColor: '#1e3040',
    },
    loginStyle: {
        marginTop: 30,
    },
    error: {
        borderColor: '#940c0c',
    },
});