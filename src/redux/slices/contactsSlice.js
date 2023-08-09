import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [];

const contactsSlice = createSlice({
  name: 'contacts',

  initialState,

  reducers: {
    addContact(state, { payload }) {
      state.push({ ...payload, id: nanoid() });
    },

    removeContact(state, { payload }) {
      return state.filter(c => c.id !== payload);
    },

    editContact(state, { payload }) {
      return state.map(c => (c.id === payload.id ? payload : c));
    },
  },
});

export const { addContact, removeContact, editContact } = contactsSlice.actions;
export const { reducer: contactsReducer } = contactsSlice;
