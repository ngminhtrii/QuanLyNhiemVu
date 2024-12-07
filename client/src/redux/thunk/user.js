import { createAsyncThunk } from "@reduxjs/toolkit";
import { patchApi } from "../../utils/api";

const updateProfile = createAsyncThunk(
  "users/updateProfile",
  async ({ data, token, id }, thunkApi) => {
    try {
      console.log("Sending data:", data); // Log dữ liệu gửi đi
      const res = await patchApi(`/profile/${id}`, data, token);
      return res.data;
    } catch (error) {
      const errMsg = error.response.data.err || error.message;
      return thunkApi.rejectWithValue(errMsg);
    }
  }
);

export default updateProfile;
