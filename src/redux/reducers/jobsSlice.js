import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Stato iniziale
const initialState = {
  jobs: [],
  loading: false,
  error: null,
};

// Azione asincrona per cercare i job
export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (query) => {
  const response = await fetch(
    `https://strive-benchmark.herokuapp.com/api/jobs?search=${query}&limit=20`
  );
  if (!response.ok) {
    throw new Error('Errore nel caricamento dei dati');
  }
  const { data } = await response.json();
  return data;
});

// Slice Redux
const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    clearJobs(state) {
      state.jobs = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearJobs } = jobsSlice.actions;

export default jobsSlice.reducer;
