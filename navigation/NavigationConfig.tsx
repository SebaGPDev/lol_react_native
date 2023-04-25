import { createStackNavigator } from '@react-navigation/stack';
import Home from "../screens/HomeScreen"
import Champions from '../screens/ChampionsScreen';

const Stack = createStackNavigator();

export function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Champions" component={Champions} />
        </Stack.Navigator>
    );
}