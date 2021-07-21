import React, { Fragment, useContext, useEffect } from 'react'
import ContactItem from './ContactItem'
import ContactContext from '../../context/contact/contactContext'
import Spinner from '../layout/Spinner'
import { motion, AnimatePresence } from 'framer-motion'

const Contacts = () => {
  const contactContext = useContext(ContactContext)

  const { contacts, filtered, filter, getContacts, loading } = contactContext

  useEffect(() => {
    getContacts()
    // eslint-disable-next-line
  }, [])

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        filtered !== null ? (
          <AnimatePresence>
            {filtered.map(contact => (
              <motion.div
                key={contact._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ContactItem contact={contact} filter={filter} />          
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <AnimatePresence>
            {contacts.map(contact => (
              <motion.div
                key={contact._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ContactItem contact={contact} />          
              </motion.div>
            ))}
          </AnimatePresence>
        )
      ) : <Spinner />}
    </Fragment>
  )
}

export default Contacts
