import { Image, Keyboard, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { createRef, useState } from 'react'
import Colors from '../Helpers/Colors'
import { connect, useDispatch } from "react-redux";
import { login } from '../Helpers/CommonSlice';
import { unwrapResult } from '@reduxjs/toolkit'
import { useNavigation } from '@react-navigation/native';

const Login = () => {

  const [userName, setuserName] = useState("kminchelle")
  const [password, setpassword] = useState("0lelplR")
  const passwordInputRef = createRef();
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const handleSubmitPress = async () => {
    const data = {
        "username": userName,
        "password": password
    }
    const resp = await dispatch(login(data))
    const result = await unwrapResult(resp)

    if (result?.message) {
      alert(JSON.stringify(result?.message))
    }  else {
      ToastAndroid.show(`Logged in Successfully`, ToastAndroid.LONG);
      navigation.navigate('Tab')
     
    }
  }
  return (
    <SafeAreaView style={{
      backgroundColor: Colors.secondary,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Image
        style={styles.loginIcon}
        source={{
          uri: 'https://www.bellurbis.com/wp-content/uploads/2023/01/Bellurbis-New-Logo-Dark.png',
        }}
      />
      <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          value={userName}
          onChangeText={(value) => setuserName(value)}
          placeholder="Enter username" //dummy@abc.com
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() =>
            passwordInputRef.current && passwordInputRef.current.focus()
          }
          underlineColorAndroid="#f000"
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          value={password}
          onChangeText={(UserPassword) => setpassword(UserPassword)}
          placeholder="Enter Password"
          keyboardType="default"
          ref={passwordInputRef}
          onSubmitEditing={Keyboard.dismiss}
          blurOnSubmit={false}
          secureTextEntry={true}
          returnKeyType="next"
        />
      </View>
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={handleSubmitPress}
      >
        <Text style={styles.buttonTextStyle}>Login</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 2,
  },
  loginIcon: { height: 80, width: 200, padding: 10, resizeMode: 'contain', marginBottom: 30 },
  inputStyle: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 2,
    borderColor:Colors.primary,
    borderRadius: 30,
    padding: 10,
    marginHorizontal: 50
  },
  buttonStyle: {
    width: "40%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    marginTop: 16,
  },
  buttonTextStyle: {
    fontWeight: "500",
    fontSize: 14,
    letterSpacing: -0.05,
    color: 'white',
  },
})