import { Alert, BackHandler, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Login from '../Screens/Login';
import EmplyeeList from '../Screens/EmplyeeList';
import Profile from '../Screens/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from './Colors';
const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();
const Navigator = (props) => {
  const Tabs = () => {
    const nav = useNavigation()
    useEffect(() => {
      const backAction = () => {
        if (nav.isFocused()) {
          Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
          ]);
          return true;
        };
      }
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }, []);

    return (
      <BottomTabs.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.secondary,
          },
          headerTitleStyle: {
            color: 'white'
          },
          tabBarStyle: {
            backgroundColor: Colors.secondary,
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarIconStyle: {
            fontSize: 40
          },
        }}>

        <BottomTabs.Screen name="Employee List"
          component={EmplyeeList}
          options={{
            tabBarLabel: 'Home',

            tabBarLabelStyle: {
              fontSize: 14
            },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={30} />
            ),
          }}
        />
        <BottomTabs.Screen name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarLabelStyle: {
              fontSize: 14
            },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={30} />
            ),
          }}
        />
      </BottomTabs.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={props.token ? "Tab" : "LoginScreen"}>
        {/* Auth Navigator which includer Login Signup will come once */}
        <Stack.Screen
          name="LoginScreen"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tab"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmployeeList"
          component={EmplyeeList}
          options={{ headerShown: true }}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
          // Hiding header for Splash Screen
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const mapStateToProps = (state) => ({
  token: state.CommonSlice?.token,
})
export default connect(mapStateToProps)(Navigator)

const styles = StyleSheet.create({})