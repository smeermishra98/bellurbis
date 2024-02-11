import { Alert, FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from "react-redux";
import { TextInput } from 'react-native-gesture-handler'
import { useFocusEffect } from '@react-navigation/native';
import { clearToken, createEmployeeDetails, deleteEmployee, getEmployeeList, updatetEmployeeDetails } from '../Helpers/CommonSlice';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import userIcon from '../Assets/userBadge.png';
import Colors from '../Helpers/Colors';
import { unwrapResult } from '@reduxjs/toolkit';
import Modal from "react-native-modal";
const EmplyeeList = (props) => {

  const dispatch = useDispatch()
  const [addEmpModal, setaddEmpModal] = useState(false)
  const [newEmployeeName, setnewEmployeeName] = useState()
  const [newEmployeeAge, setnewEmployeeAge] = useState()
  const [newEmployeeSalary, setnewEmployeeSalary] = useState()
  useFocusEffect(
    React.useCallback(() => {
      try {

        console.log(props.token)
      } catch (e) {
        console.error(e);
      }
    }, [])
  );
  useEffect(() => {
    dispatch(getEmployeeList())
  }, [])
  const onRefresh = () => dispatch(getEmployeeList())
  const PullDownRefresh = () => {
    return (
      <View style={styles.pullDownContainer}>
        <FeatherIcon name={'chevrons-down'}
          style={styles.iconStyle}
          size={20} />
        <Text style={styles.textStyle}>Pull down to refresh</Text>
        <FeatherIcon name={'chevrons-down'}
          style={styles.iconStyle}
          size={20} />
      </View>
    );
  }
  const createEmployee = async () => {
    const data = {
      body: {
        "name": newEmployeeName,
        "salary": newEmployeeSalary,
        "age": newEmployeeAge
      },
    }
    const resp = await dispatch(createEmployeeDetails(data))
    const result = await unwrapResult(resp)

    if (result?.message) {
      alert(JSON.stringify(result?.message))
    } else {
      ToastAndroid.show(`Employee added Successfully`, ToastAndroid.LONG);
    }
    setaddEmpModal(false)
    dispatch(getEmployeeList())

  }
  const EmployeeCard = ({ item, index }) => {
    const [employeeName, setemployeeName] = useState(item?.employee_name)
    const [employeeAge, setemployeeAge] = useState(item?.employee_age.toString())
    const [employeeSalary, setemployeeSalary] = useState(item?.employee_salary.toString())
    const [editView, seteditView] = useState(false)
    const updateDetails = async () => {
      const data = {
        body: {
          "name": employeeName,
          "salary": employeeSalary,
          "age": employeeAge
        },
        id: item?.id
      }
      const resp = await dispatch(updatetEmployeeDetails(data))
      const result = await unwrapResult(resp)

      if (result?.message) {
        alert(JSON.stringify(result?.message))
      } else {
        ToastAndroid.show(`Data Updated Successfully`, ToastAndroid.LONG);
      }
      seteditView(false)
      dispatch(getEmployeeList())

    }
    const deleteDetails = async () => {
      const resp = await dispatch(deleteEmployee(item?.id))
      const result = await unwrapResult(resp)

      if (result?.message) {
        alert(JSON.stringify(result?.message))
      } else {
        ToastAndroid.show(`Data Deleted Successfully`, ToastAndroid.LONG);
      }
      dispatch(getEmployeeList())
    }
    return (
      <View key={index} style={styles.cardContainer}>
        {editView ?
          <>
            <View>
              <View style={{ alignItems: 'center', flexDirection: 'row', marginVertical: 5 }}>
                <Text style={styles.blackText}>Name : </Text>
                <TextInput
                  style={styles.inputStyle}
                  value={employeeName}
                  onChangeText={(value) => setemployeeName(value)}
                  placeholder="Enter Name"
                  returnKeyType="next"
                />
              </View>
              <View style={{ alignItems: 'center', flexDirection: 'row', marginVertical: 5 }}>
                <Text style={styles.blackText}>Age :     </Text>
                <TextInput
                  style={styles.inputStyle}
                  value={employeeAge}
                  onChangeText={(value) => setemployeeAge(value)}
                  placeholder="Enter Age"
                  keyboardType='numeric'
                  returnKeyType="next"
                />
              </View>
              <View style={{ alignItems: 'center', flexDirection: 'row', marginVertical: 5 }}>
                <Text style={styles.blackText}>Salary : </Text>
                <TextInput
                  style={styles.inputStyle}
                  value={employeeSalary}
                  onChangeText={(value) => setemployeeSalary(value)}
                  placeholder="Enter Salary"
                  keyboardType='numeric'
                  returnKeyType="next"
                />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={() => {
                    updateDetails()
                  }}
                >
                  <Text style={styles.buttonTextStyle}>Update</Text>
                </TouchableOpacity>

                <Text onPress={() => { seteditView(false) }} style={{ color: 'red', fontWeight: '800', textDecorationLine: 'underline', fontSize: 18 }}>Cancel</Text>
              </View>

            </View>


          </>
          :
          <>
            <Image source={userIcon} style={{ height: 70, width: 70 }} />
            <View style={{ marginLeft: 30, width: '50%' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.blackText}>Name : </Text>
                <Text style={styles.greyText}>{item?.employee_name}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.blackText}>Age : </Text>
                <Text style={styles.greyText}>{item?.employee_age}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.blackText}>Salary : </Text>
                <Text style={styles.greyText}>{item?.employee_salary}</Text>
              </View>
            </View>
            <View style={{ marginLeft: 20 }}>
              <TouchableOpacity onPress={() => {
                seteditView(true)
              }}>
                <FeatherIcon name={'edit'}
                  style={{ color: Colors.primary }}
                  size={20} />
              </TouchableOpacity>

              <View style={{ marginTop: 20 }} />
              <TouchableOpacity
                onPress={() => {
                  Alert.alert("Hold on!", "Are you sure you want to delete this employee?", [
                    {
                      text: "Cancel",
                      onPress: () => null,
                      style: "cancel"
                    },
                    { text: "YES", onPress: () => deleteDetails() }
                  ]);
                }}>
                <AntDesign name={'delete'}
                  style={{ color: 'red' }}
                  size={20} />
              </TouchableOpacity>
            </View>
          </>
        }
      </View>
    )
  }

  return (
    <>
      <FlatList
        data={props.employeesList}
        renderItem={({ item, index }) => (
          <EmployeeCard
            item={item}
            index={index}
          />
        )}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        ListHeaderComponent={<PullDownRefresh />}

      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 55,
          right: 55
        }}
        onPress={() => {
          setaddEmpModal(true)
        }}>
        <AntDesign name={'pluscircle'}
          style={{ color: Colors.primary }}
          size={45} />
      </TouchableOpacity>
      <Modal
        isVisible={addEmpModal}
        style={{ color: "#fff", }}>
        <View style={{
          flex: 0.5, backgroundColor: "#fff", borderRadius: 10, padding: 15
        }}>
          <ScrollView>
            <Text style={{ fontSize: 22, color: 'red', fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>Add New Employee </Text>
            <View style={{ alignItems: 'center', flexDirection: 'row', marginVertical: 5 }}>
              <Text style={styles.blackText}>Name : </Text>
              <TextInput
                style={styles.inputStyle}
                value={newEmployeeName}
                onChangeText={(value) => setnewEmployeeName(value)}
                placeholder="Enter Name"
                returnKeyType="next"
              />
            </View>
            <View style={{ alignItems: 'center', flexDirection: 'row', marginVertical: 5 }}>
              <Text style={styles.blackText}>Age :     </Text>
              <TextInput
                style={styles.inputStyle}
                value={newEmployeeAge}
                onChangeText={(value) => setnewEmployeeAge(value)}
                placeholder="Enter Age"
                keyboardType='numeric'
                returnKeyType="next"
              />
            </View>
            <View style={{ alignItems: 'center', flexDirection: 'row', marginVertical: 5 }}>
              <Text style={styles.blackText}>Salary : </Text>
              <TextInput
                style={styles.inputStyle}
                value={newEmployeeSalary}
                onChangeText={(value) => setnewEmployeeSalary(value)}
                placeholder="Enter Salary"
                keyboardType='numeric'
                returnKeyType="next"
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={() => {
                  createEmployee()
                }}
              >
                <Text style={styles.buttonTextStyle}>Add</Text>
              </TouchableOpacity>

              <Text onPress={() => { setaddEmpModal(false) }} style={{ color: 'red', fontWeight: '800', textDecorationLine: 'underline', fontSize: 18 }}>Cancel</Text>
            </View>

          </ScrollView>
        </View>
      </Modal>
    </>


  )
}

const mapStateToProps = (state) => ({
  token: state.CommonSlice?.token,
  employeesList: state.CommonSlice?.employeesList

})

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmplyeeList)

const styles = StyleSheet.create({
  iconStyle: {
    color: 'grey'
  },
  textStyle: {
    color: 'grey',
    marginHorizontal: 10
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
  pullDownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5
  },
  cardContainer: {
    flexDirection: 'row',
    borderRadius: 20,
    margin: 15,
    padding: 20,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  inputStyle: {
    width: '60%',
    backgroundColor: "white",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 30,
    padding: 10,
    marginHorizontal: 10
  },
  blackText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500'
  },
  greyText: { color: Colors.blackText, fontSize: 16, fontWeight: '400' }
})