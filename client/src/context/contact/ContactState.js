import { useReducer } from 'react'
import { v4 } from 'uuid'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types.js'

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Jill Johnson',
        email: 'jill@gmail.com',
        phone: '8-111-111-11-11',
        type: 'personal'
      },
      {
        id: 2,
        name: 'Sara Watson',
        email: 'sara@gmail.com',
        phone: '8-222-222-22-22',
        type: 'personal'
      },
      {
        id: 3,
        name: 'Harry White',
        email: 'harry@gmail.com',
        phone: '8-333-333-33-33',
        type: 'professional'
      },
    ],
    current: null,
    filtered: null,
    filter: null
  }

  const [state, dispatch] = useReducer(contactReducer, initialState)

  // Add Contact
  const addContact = contact => {
    contact.id = v4()
    dispatch({ type: ADD_CONTACT, payload: contact })
    // console.log('state.current');
    if (state.filter) {
      // dispatch({ type: CLEAR_FILTER })
      // console.log(`state.filter ${state.filtered}`);
      dispatch({ type: FILTER_CONTACTS, payload: state.filter })
    }
  }

  // Delete Contact
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id })
  }

  // Set Current Contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact })
  }
  
  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }

  // Update Contact
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact })
  }

  // Filter Contacts
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text})
  }

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        filter: state.filter,
        addContact,
        deleteContact,
        setCurrent,
        updateContact,
        clearCurrent,
        filterContacts,
        clearFilter
      }}
    >
      { props.children }
    </ContactContext.Provider>
  )
}

export default ContactState