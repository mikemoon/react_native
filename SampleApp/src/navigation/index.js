import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../LoginScreen';
import MainScreen from '../MainScreen';

const AuthStack = createStackNavigator(
    {
        LoginScreen: {screen: LoginScreen},
        MainScreen: {screen: MainScreen}
    },
    {
        initialRouteName: 'LoginScreen'
    }
);


import _NavigationService from '../common/NavigationService';
export const NavigationService = _NavigationService;

export default createAppContainer(AppNavigator);