import { createStackNavigator } from '@react-navigation/stack';
import Home from "../screens/HomeScreen"
import Champions from '../screens/ChampionsScreen';
import Skin from '../screens/SkinSceen';

const Stack = createStackNavigator();

export function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
            <Stack.Screen name="Champions" component={Champions} />
            <Stack.Screen name="Skin" component={Skin} />
        </Stack.Navigator>
    );
}