import { useReducer } from 'react'
import axios from 'axios'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CLEAR_CONTACTS,
  CONTACT_ERROR
} from '../types.js'

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    filter: null,
    error: null
  }

  const [state, dispatch] = useReducer(contactReducer, initialState)

  // Get Contacts
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts')
      
      dispatch({ type: GET_CONTACTS, payload: res.data })
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
    }
  }

  // Add Contact
  const addContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/contacts', contact, config)
      
      dispatch({ type: ADD_CONTACT, payload: res.data })
      if (state.filter) {
        dispatch({ type: FILTER_CONTACTS, payload: state.filter })
      }
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
    }
  }

  // Delete Contact
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`)
      dispatch({ type: DELETE_CONTACT, payload: id })
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
    }
  }

  // Update Contact
  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)
      
      console.log(res.data);
      dispatch({ type: UPDATE_CONTACT, payload: res.data })
      if (state.filter) {
        dispatch({ type: FILTER_CONTACTS, payload: state.filter })
      }
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
    }
  }

  // Clear Contacts
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS })
  }

  // Set Current Contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact })
  }
  
  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
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
        error: state.error,
        getContacts,
        addContact,
        deleteContact,
        setCurrent,
        updateContact,
        clearCurrent,
        filterContacts,
        clearFilter,
        clearContacts
      }}
    >
      { props.children }
    </ContactContext.Provider>
  )
}

export default ContactState