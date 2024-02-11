import links from "./links";
import ObjectHelper from "./objectHelpers";
import SpinnerActions from "../Components/spinner/SpinnerActions";
import NetInfo from "@react-native-community/netinfo";
import { clearToken } from "./CommonSlice";
import { useNavigation } from "@react-navigation/native";


const getLocation = (location) => {
  if (location.auth) {
    return links?.baseApiAuth + location?.path;
  }
  return links?.baseApi + location;
};

async function status(response, thunk) {

  if (response?.status >= 200 && response?.status < 300) {

  }
  else if (response?.status >= 401 && response?.status <= 403) {
    alert(`Token expired please login again\nError code : ${response.status}`)
    thunk?.dispatch(clearToken())
  }
  else if (response?.status >= 500) {
    alert(`Server error, we are working on it please wait for sometime\nError code : ${response?.status} `)
  } else {
    alert(`Server error, Please try after sometime\nError code :${response?.status}`)
  }
  thunk.dispatch(SpinnerActions.hideSpinner())

}

export const doPost = async (thunk, location, query, body, token) => {
  let url = getLocation(location) + ObjectHelper.getQueryString(query);

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  const NetInfoData = await NetInfo.fetch()
  if (!NetInfoData?.isInternetReachable || !NetInfoData?.isConnected) {
    alert("Please Check your internet connection")
    thunk.dispatch(SpinnerActions.hideSpinner())
  }
  thunk.dispatch(SpinnerActions.showSpinner())
  const response = await fetch(url, config);
  thunk.dispatch(SpinnerActions.hideSpinner())
  status(response, thunk)
  return await response.json();
};

export const doPut = async (thunk, location, query, body, token) => {
  let url = getLocation(location) + ObjectHelper.getQueryString(query);
  const config = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  const NetInfoData = await NetInfo.fetch()
  if (!NetInfoData?.isInternetReachable || !NetInfoData?.isConnected) {
    alert("Please Check your internet connection")
    thunk.dispatch(SpinnerActions.hideSpinner())
  }

  thunk.dispatch(SpinnerActions.showSpinner())
  const response = await fetch(url, config);
  thunk.dispatch(SpinnerActions.hideSpinner())
  status(response, thunk)
  return await response.json();
};


export const doDel = async (thunk, location, query, body, token) => {
  let url = getLocation(location) + ObjectHelper.getQueryString(query);
  const config = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  const NetInfoData = await NetInfo.fetch()
  if (!NetInfoData?.isInternetReachable || !NetInfoData?.isConnected) {
    alert("Please Check your internet connection")
    thunk.dispatch(SpinnerActions.hideSpinner())
  }
  thunk.dispatch(SpinnerActions.showSpinner())
  const response = await fetch(url, config);
  thunk.dispatch(SpinnerActions.hideSpinner())
  status(response, thunk)
  return await response.json();
};

export const doGet = async (thunk, location, query, token) => {
  let url = getLocation(location) + ObjectHelper.getQueryString(query);
  console.log(url, query, token, "GETTTTT")
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  const NetInfoData = await NetInfo.fetch()
  if (!NetInfoData?.isInternetReachable || !NetInfoData?.isConnected) {
    alert("Please Check your internet connection")
    thunk.dispatch(SpinnerActions.hideSpinner())
  }
  thunk.dispatch(SpinnerActions.showSpinner())
  const response = await fetch(url, config);
  thunk.dispatch(SpinnerActions.hideSpinner())
  status(response, thunk)
  return await response.json();
};
