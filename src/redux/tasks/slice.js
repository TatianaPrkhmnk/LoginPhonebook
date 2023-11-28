import { createSlice } from '@reduxjs/toolkit';
import { logOut } from 'redux/auth/operations';
import { fetchTasks, addTask, deleteTask } from './operations';

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  if (action.payload) {
    state.items = action.payload;
  }
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, handlePending)
      .addCase(addTask.pending, handlePending)
      .addCase(deleteTask.pending, handlePending)
      .addCase(fetchTasks.fulfilled, handleFulfilled)
      .addCase(addTask.fulfilled, handleFulfilled)
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((task) => task.id !== action.payload.id);
        handleFulfilled(state, action);
      })
      .addCase(fetchTasks.rejected, handleRejected)
      .addCase(addTask.rejected, handleRejected)
      .addCase(deleteTask.rejected, handleRejected)
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        handleFulfilled(state, {});
      });
  },
});

export const tasksReducer = tasksSlice.reducer;
