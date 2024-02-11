import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doDel, doGet, doPost, doPut } from "./sliceApi";


const initialState = {
  token: '',
  username: '',
  phoneNumber: '',
  employeesList: [],
  userDetails:{}

};

export const login = createAsyncThunk(
  "login",
  async (data, thunkAPI) => {
    return doPost(thunkAPI, { auth: true, path: '/login' }, {}, data, '');
  }
);

export const userDetails = createAsyncThunk(
  "userDetails",
  async (token, thunkAPI) => {
    return doGet(thunkAPI, { auth: true, path: '/me' }, {}, token);
  }
);
export const getEmployeeList = createAsyncThunk(
  "getEmployeeList",
  async (data, thunkAPI) => {
    return doGet(thunkAPI, '/employees',);
  }
);
export const updatetEmployeeDetails = createAsyncThunk(
  "updatetEmployeeDetails",
  async (data, thunkAPI) => {
    return doPut(thunkAPI, `/update/${data?.id}`,{},data?.body);
  }
);
export const deleteEmployee = createAsyncThunk(
  "deleteEmployee",
  async (id, thunkAPI) => {
    return doDel(thunkAPI, `/delete/${id}`);
  }
);
export const createEmployeeDetails = createAsyncThunk(
  "createEmployeeDetails",
  async (data, thunkAPI) => {
    return doPost(thunkAPI, `/create`,{},data?.body);
  }
);


const CommonSlice = createSlice({
  name: "StoreAddress",
  initialState,
  reducers: {
    clearToken(state) {
      state.token = ''
    },
    // lastSyncDateAction(state,action) {
    //   console.log(action.payload,);
    //   state.lastSyncingDate = action.payload
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        if (!action.payload?.message) {
          state.token = action.payload?.token
          state.username = action.payload?.username
        }
      })
      .addCase(getEmployeeList.fulfilled, (state, action) => {
        state.employeesList = action?.payload?.data
      })
      .addCase(userDetails.fulfilled, (state, action) => {
        state.userDetails = action?.payload
      })


  },
});


export const {
  clearToken,
} = CommonSlice.actions;
export default CommonSlice.reducer;
