import { View, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../interface/RootStackPrams';

function HomeScreen({ navigation }: { navigation: StackNavigationProp<RootStackParamList> }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Go to Profile"
                onPress={() => navigation.navigate('Champions')}
            />
        </View>
    );
}

export default HomeScreen