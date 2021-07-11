import React, { Fragment, useContext } from 'react'
import ContactItem from './ContactItem'
import ContactContext from '../../context/contact/contactContext'
import { motion, AnimatePresence } from 'framer-motion'

const Contacts = () => {
  const contactContext = useContext(ContactContext)

  const { contacts, filtered, filter } = contactContext

  if (contacts.length === 0) {
    return <h4>Please add a contact</h4>
  }

  return (
    <Fragment>
        {filtered !== null ? (
          <AnimatePresence>
            {filtered.map(contact => (
              <motion.div
                key={contact.id}
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
                key={contact.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ContactItem contact={contact} />          
              </motion.div>
            ))}
          </AnimatePresence>
        )}
    </Fragment>
  )
}

export default Contacts
