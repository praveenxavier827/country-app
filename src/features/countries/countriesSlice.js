import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCountries } from './countriesAPI';

export const getCountries = createAsyncThunk('countries/getCountries', async () => {
  const data = await fetchCountries();
  return data;
});

const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    items: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getCountries.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default countriesSlice.reducer;
