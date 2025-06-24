// components/AlertBox.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { router } from 'expo-router';

interface AlertProps {
    type?: string;
    title?: string;
    body?: string;
    visible: boolean;
    onOk?: () => void;
    onCancel?: () => void;
    onDismiss?: () => void;
}

const AlertBox: React.FC<AlertProps> = ({
    type = '',
    title = '',
    body = '',
    visible,
    onOk,
    onCancel,
}) => {
    return (
        <Modal
            isVisible={visible}
            onBackdropPress={()=>{router.back()}}
            onBackButtonPress={()=>{router.back()}}
            backdropOpacity={0.5}
            useNativeDriver
        >
            <View style={styles.container}>
                {title ?
                    <Text style={[styles.title, {backgroundColor: `${
                        type === 'error'? '#ff6467' :
                        type === 'success'? '#7b9d00' :
                        type === 'info'? '#106ea9' :'transparent'}`}]}>
                            {title}
                    </Text> 
                : null}

                <ScrollView style={styles.bodyContainer}>
                    <Text style={[styles.bodyText]}>{body}</Text>
                </ScrollView>

                <View style={styles.footer}>
                    {onCancel && (
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    )}
                    {onOk && (
                        <TouchableOpacity style={[styles.button, styles.okButton]} onPress={onOk}>
                            <Text style={styles.buttonText}>OK</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "95%",
        backgroundColor: '#fff',
        alignSelf: "center",
        borderRadius: 10,
        overflow: "hidden"
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        color: 'white', // red-600
        borderBottomColor: "gray",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    bodyContainer: {
        maxHeight: 200,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    bodyText: {
        fontSize: 16,
        color: '#374151', // gray-700
        textAlign: 'justify',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "100%",
        gap: 2,
        paddingBottom: 1,
        paddingHorizontal: 3,
        paddingLeft: 1
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 16,
        width: "50%",
    },
    cancelButton: {
        backgroundColor: 'gray', // gray-200
        borderBottomLeftRadius: 10
    },
    okButton: {
        backgroundColor: '#106ea9', // blue-500
        borderBottomRightRadius: 10
    },
    buttonText: {
        fontSize: 14,
        color: '#ffffff',
        textAlign: 'center',
    },
});

export default AlertBox;