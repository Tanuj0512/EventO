import { createSlice } from '@reduxjs/toolkit';

export const idSlice = createSlice({
  name: 'id',
  initialState: {
    value: 0,
    type: "",
    eventIdValue:"Event",
    viewEventId:"",
  },
  reducers: {
    idValue: (state, action) => {
      state.value = action.payload;
      sessionStorage.setItem("idValue",state.value)
    },
    usertype: (state, action)=>{
      state.type = action.payload;
      sessionStorage.setItem("usertype",state.type)
    },
    eventIdValue: (state, action) => {
      state.eventIdValue = action.payload;
      sessionStorage.setItem("eventIdValue",state.eventIdValue)
    },
    viewEventId: (state, action) => {
      state.viewEventId = action.payload;
      sessionStorage.setItem("viewEventId",state.viewEventId)
    }
  },
});

export const { idValue, usertype, eventIdValue, viewEventId } = idSlice.actions;
export default idSlice.reducer;
