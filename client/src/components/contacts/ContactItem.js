import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import ContactContext from '../../context/contact/contactContext'

const MarkedFilter = ({ text, filter }) => {
  const regFilter = new RegExp(`${filter}`, 'gi')
  const result = []
  let matched = Array.from(text.matchAll(regFilter))
  const indexes = matched.map((item) => {
    return item.index
  })

  let current = 0
  for (let i = 0; i < indexes.length; i++) {
    let start = current
    current = indexes[i]
    result.push(text.slice(start, current))
    start = current
    current += filter.length
    result.push(<mark>{text.slice(start, current)}</mark>)
  }
  result.push(text.slice(current))

  return result.map((item, i) => <Fragment key={i}>{item}</Fragment>)
}

const ContactItem = ({ contact, filter = '' }) => {
  const contactContext = useContext(ContactContext)
  const { deleteContact, setCurrent, clearCurrent } = contactContext

  const { _id: id, name, email, phone, type } = contact

  const onDelete = () => {
    deleteContact(id)
    clearCurrent()
  }

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {filter ?
          <MarkedFilter text={name} filter={filter} /> : 
          name
        }{' '}
        <span style={{ float: 'right' }}
          className={'badge ' + 
          (type === 'professional' ? 'badge-success' : 'badge-primary')}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>      
      <ul className="list">
        {email && (<li>
          <i className="fas fa-envelope-open"></i> {
            filter ?
              <MarkedFilter text={email} filter={filter} /> : 
              email
          }
        </li>)}
        {phone && (<li>
          <i className="fas fa-phone"></i> {phone}
        </li>)}
      </ul>
      <p>
        <button className="btn btn-dark btn-sm" onClick={() => setCurrent(contact)}>Edit</button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
      </p>
    </div>
  )
}

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
}

export default ContactItem
