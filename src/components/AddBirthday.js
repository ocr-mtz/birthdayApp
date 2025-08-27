import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import { db } from '../utils/firebase';
import { addDoc, collection } from 'firebase/firestore';

export default function AddBirthday(props) {
    const { user, setShowList, setReloadData } = props;
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [formData, setFormData] = useState({});
    const [formError, setFormError] = useState({});
    const hideDatePicker = () => {
        setIsDatePickerVisible(false);
    };
    const showDatePicker = () => {
        setIsDatePickerVisible(true);
    };
    const handleConfirm = (date) => {
        let dateStr = new Date(date);
        let dateBirth = format(dateStr, 'yyyy-MM-dd');
        setFormData({...formData, dateBirth});
        hideDatePicker();
    };
    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text});
    };
    const onSubmit = () => {
        let errors = {};
        if (!formData.name || !formData.lastname || !formData.dateBirth) {
            if (!formData.name) errors.name = true;
            if (!formData.lastname) errors.lastname = true;
            if (!formData.dateBirth) errors.dateBirth = true;
        } else {
            const data = formData;
            addDoc(collection(db, user.uid), data).then(() => {
                console.log('OK');
                setReloadData(true);
                setShowList(true);
            }).catch(() => {
                setFormError({name: true, lastname: true, dateBirth: true});
            });
        }
        setFormError(errors);
    };

    return(
        <>
            <View style = { styles.container }>
                <TextInput 
                    style = {[styles.input, formError.name && {borderColor: '#940c0c'}]}
                    placeholder = 'Nombre'
                    placeholderTextColor = {{ color: '#969696' }}
                    onChange = {(e) => onChange(e, 'name')}
                />
                <TextInput 
                    style = {[styles.input, formError.lastname && {borderColor: '#940c0c'}]}
                    placeholder = 'Apellidos'
                    placeholderTextColor = {{ color: '#969696' }}
                    onChange = {(e) => onChange(e, 'lastname')}
                />
                <View style = {[styles.input, styles.datepicker, formError.dateBirth && {borderColor: '#940c0c'}]}>
                    <Text style = {{color: formData.dateBirth ? '#fff' : '#969696', fontSize: 18,}} onPress = { showDatePicker }>{ formData.dateBirth ? formData.dateBirth : 'Fecha de Nacimiento' }</Text>
                </View>
                <TouchableOpacity onPress = { onSubmit }>
                    <Text style = { styles.addButton }>Crear Cumpleaños</Text>
                </TouchableOpacity>
            </View>
            <DateTimePickerModal 
                isVisible = { isDatePickerVisible }
                mode = 'date'
                onConfirm = { handleConfirm }
                onCancel = { hideDatePicker }
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 50,
        color: '#fff',
        width: '80%',
        marginBottom: 25,
        backgroundColor: '#1e3040',
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#1e3040',
    },
    datepicker: {
        justifyContent: 'center',
    },
    addButton: {
        fontSize: 18,
        color: '#fff',
    },
});