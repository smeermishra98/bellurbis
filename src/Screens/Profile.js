import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import userIcon from '../Assets/userBadge.png';
import { connect, useDispatch } from "react-redux";
import { userDetails } from '../Helpers/CommonSlice';
import Colors from '../Helpers/Colors';
import { useNavigation } from '@react-navigation/native';
const Tab = createMaterialTopTabNavigator();
const Profile = (props) => {
  const [user, setuser] = useState({})
  const dispatch = useDispatch()
  const nav=useNavigation()
  useEffect(() => {
    dispatch(userDetails(props.token))
  }, [])

  useEffect(() => {
    setuser(props.userDetails)
    console.log(`${user?.firstName + user?.lastName}`)
  }, [props.userDetails])


  const horizontalRowData = (key, value) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderColor: 'grey' }}>
        <Text style={{ fontSize: 16, marginRight: 10, color: 'black', fontWeight: '600', flex: 0.5 }}>{key}</Text>
        <Text style={{ fontSize: 16, marginRight: 10, color: 'black', flex: 0.4 }}>{value}</Text>
      </View>
    )
  }
  const Personal = () => {
    return (
      <View>
        {horizontalRowData("Full Name", `${user?.firstName + user?.lastName}`)}
        {horizontalRowData("User Name", `${user?.username}`)}
        {horizontalRowData("Age", `${user?.age}`)}
        {horizontalRowData("Gender", `${user?.gender}`)}
        {horizontalRowData("Contact Number", `${user?.phone}`)}
        {horizontalRowData("Date of Birth", `${user?.birthDate}`)}
        {horizontalRowData("Full Address", `${user?.address?.address + "," + user?.address?.city}`)}
        {horizontalRowData("Blood Group", `${user?.bloodGroup}`)}


      </View>
    )
  }
  const WorkProfile = () => {
    return (
      <View>
        {horizontalRowData("Company Name", `${user?.company?.name}`)}
        {horizontalRowData("Designation", `${user?.company?.title}`)}
        {horizontalRowData("Department", `${user?.company?.department}`)}
        {horizontalRowData("Company Address", `${user?.company?.address?.address + " , " + user?.company?.address?.city}`)}

      </View>
    )
  }
  const Documents = () => {
    return (
      <View>
        {horizontalRowData("Card Number", `${user?.bank?.cardNumber}`)}
        {horizontalRowData("Card Type", `${user?.bank?.cardType}`)}
        {horizontalRowData("Card Expire", `${user?.bank?.cardExpire}`)}
        {horizontalRowData("currency", `${user?.bank?.currency}`)}

      </View>
    )
  }
  const Assets = () => {
    return (
      <Text>Personal</Text>
    )
  }
  return (
    <View style={{ flex: 1 }}>
      {/* <TouchableOpacity onPress={() => props.navigation.goBack()}
      style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 25 }}>
      <Icon name="angle-left" size={25} style={{ color: 'black', marginHorizontal: 15, }} />
      <Text style={{ fontSize: 18, color: 'black', fontWeight: '700' }}>Profile Details</Text>
    </TouchableOpacity> */}
      <View style={{ alignItems: 'center', marginTop: 50, marginBottom: 30 }}>
        <Text onPress={() => { nav.navigate("LoginScreen") }} style={{ color: 'red', fontWeight: '800', textDecorationLine: 'underline', fontSize: 18, position: 'absolute',right:30 }}>Logout</Text>
        <Image src={'https://robohash.org/Jeanne.png?set=set4'} style={{ height: 100, width: 100 }} />
        <Text style={{ fontWeight: '800', fontSize: 22 }}>{user?.firstName}</Text>
        <Text style={{ fontWeight: '500', fontSize: 16 }}>{user?.company?.title} at {user?.company?.name}</Text>
        <Text style={{ fontWeight: '500', fontSize: 16 }}>{user?.company?.department}</Text>
      </View>
      <Tab.Navigator screenOptions={() => ({
        tabBarStyle: { backgroundColor: Colors.primary },
        // '#11406B'  --- '#1FBAAB'
        tabBarLabelStyle: { color: 'black' },
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: { backgroundColor: 'red' }
      })}>
        <Tab.Screen name="Personal Details" component={Personal} />
        <Tab.Screen name="Work Profile" component={WorkProfile} />
        <Tab.Screen name="Bank Details" component={Documents} />

      </Tab.Navigator>
      
    </View>
  )
}
const mapStateToProps = (state) => ({
  token: state.CommonSlice?.token,
  employeesList: state.CommonSlice?.employeesList,
  userDetails: state.CommonSlice?.userDetails

})

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

const styles = StyleSheet.create({
  buttonStyle: {
    width: "40%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf:'center',
    padding: 16,
    borderRadius: 32,
    backgroundColor: 'red',
    marginTop: 16,
  },
  buttonTextStyle: {
    fontWeight: "500",
    fontSize: 14,
    letterSpacing: -0.05,
    color: 'white',
  },
})