import React, { useState, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactForm = () => {
  const contactContext = useContext(ContactContext)

  const { addContact, updateContact, current, clearCurrent } = contactContext

  const [empty, setEmpty] = useState(true)

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  })  

  const { name, email, phone, type } = contact

  useEffect(() => {
    if (empty && !current) setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    }) 
    else if (current) setContact(current)
  }, [empty, current])

  useEffect(() => {
    setEmpty(contact.name === '' &&
             contact.email === '' &&
             contact.phone === '' &&
             contact.type === 'personal')
  }, [contact])

  const onChange = e => setContact({
    ...contact, [e.target.name]: e.target.value
  })

  const onSubmit = e => {
    e.preventDefault()
    current ? 
      updateContact(contact) :
      addContact(contact)
    clearAll()
  }

  const clearAll = () => {
    clearCurrent()
    setEmpty(true)
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
      <input 
        type="text" 
        placeholder="Name" 
        name="name"   
        value={name} 
        onChange={onChange} 
      />
      <input 
        type="email" 
        placeholder="Email" 
        name="email"   
        value={email} 
        onChange={onChange} 
      />
      <input 
        type="text" 
        placeholder="Phone" 
        name="phone"   
        value={phone} 
        onChange={onChange} 
      />
      <h5>Contact Type</h5>
      <label><input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={onChange} /> Personal</label>{' '}
      <label><input type="radio" name="type" value="professional" checked={type === 'professional'} onChange={onChange} /> Professional</label>
      <div>
        <input 
          type="submit" 
          value={current ? 'Update Contact' : 'Add Contact'} 
          className="btn btn-primary btn-block" 
        />
      </div>
      {!empty && <div>
        <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
      </div>}
    </form>
  )
}

export default ContactForm
