import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Contact} from './Contact'

class ContactListClass extends Component {
  render() {
    return (
      <ul>
        {this.props.contacts.map(contact =>
          <Contact key={contact.cid} name={contact.name} blf_state={contact.blf_state}/>
        )}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts
  }
}

const ContactList = connect(mapStateToProps)(ContactListClass)

export default ContactList
