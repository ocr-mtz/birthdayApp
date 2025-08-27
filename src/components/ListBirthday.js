import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import AddBirthday from './AddBirthday';
import ActionBar from './ActionBar';
import Birthday from './Birthday';
import { db } from '../utils/firebase';
import { collection, getDocs, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { format, differenceInDays } from 'date-fns';

export default function ListBirthday(props) {
    const { userlogged } = props;
    const [showList, setShowList] = useState(true);
    const [birthday, setBirthday] = useState([]);
    const [pastBirthday, setPastBirthday] = useState([]);
    const [reloadData, setReloadData] = useState(false);

    useEffect(() => {
        setBirthday([]);
        setPastBirthday([]);
        const docD = getDocs(collection(db, userlogged.uid), orderBy('dateBirth', 'asc'));
        docD.then((response) => {
            const itemsArray = [];
            response.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                itemsArray.push(data);
            });
            formatData(itemsArray);
        });
        setReloadData(false);
    }, [reloadData]);

    const formatData = (items) => {
        const currentDay = format(new Date(), 'yyyy-MM-dd');
        const birthdayTempArray = [];
        const pasatBirthdayTempArray = [];

        items.forEach((item) => {
            const itemTemp = item;
            const currentYear = format(new Date(), 'yyyy');
            const dateTemp = itemTemp.dateBirth.split('-');
            itemTemp.dateBirth = `${currentYear}-${dateTemp[1]}-${dateTemp[2]}`;
            itemTemp.days = differenceInDays(currentDay, itemTemp.dateBirth);
            if (itemTemp.days < 1) {
                birthdayTempArray.push(itemTemp);
            } else {
                pasatBirthdayTempArray.push(itemTemp);
            }
        });
        setBirthday(birthdayTempArray);
        setPastBirthday(pasatBirthdayTempArray);
    };

    const deleteBirthday = (birthdayParam) => {
        Alert.alert(
            'Eliminar Cumpleaños',
            `¿Estas seguro de eliminar el cumpleaños de ${birthdayParam.name} ${birthdayParam.lastname}?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    onPress: () => {
                        const docItem = deleteDoc(doc(db, userlogged.uid, birthdayParam.id));
                        docItem.then(() => {
                            setReloadData(true);
                        });
                        console.log('OK');
                    },
                },
            ],
            {cancelable: false}
        );
    };

    return(
        <View style = { styles.container }>
            { showList ? (
                <ScrollView style = { styles.scrollView }>
                    {birthday.map((item, index) => (
                        <Birthday key = { index } birthday = { item } deleteBirthday = { deleteBirthday }/>
                    ))}
                    {pastBirthday.map((item, index) => (
                        <Birthday key = { index } birthday = { item } deleteBirthday = { deleteBirthday }/>
                    ))}
                </ScrollView>
            ) : (
                <AddBirthday user = { userlogged } setShowList = { setShowList } setReloadData = { setReloadData }/>
            ) }
            
            <ActionBar showList = { showList } setShowList = { setShowList }/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%',
    },
    scrollView: {
        marginBottom: 50,
        width: '100%',
    },
});