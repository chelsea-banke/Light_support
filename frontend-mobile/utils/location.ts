import * as Location from 'expo-location';
import { Alert } from 'react-native';

const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert(
            'Permission denied',
            'Location access is required to show your location.'
        );
        return;      
    }
                
    const location = await Location.getCurrentPositionAsync();
    return location;
};

export default { getLocation };