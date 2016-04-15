import ContactList from './components/ContactList'

import {addContact, updateContact} from './actionCreators'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

// Reducer
function contacts_reducer(state = {contacts:[]}, action) {
  switch(action.type) {
    case 'NEW_CONTACT':
      return Object.assign({}, state, {
        contacts: [
          ...state.contacts,
          action.contact
        ]
      })
    case 'UPDATE_CONTACT':
      return Object.assign({}, state, {
        contacts: state.contacts.map(contact => {
          if (contact.cid === action.contact.cid) return action.contact
          else return contact
        })
      })
    default:
      return state
  }
  return state
}

// Initialise API
IPCortex.PBX.Auth.setHost('https://pabx.hostname')
IPCortex.PBX.Auth.login().then(() => {
  console.log('login success')
  IPCortex.PBX.startFeed().then(() => {
    console.log('feed started')
    // Store
    let store = createStore(contacts_reducer)
    // Dispatch actions in response to Contact events
    IPCortex.PBX.contacts.forEach(contact => {
      contact.addListener('update', _contact => {
        store.dispatch(updateContact(_contact.cID, _contact.name, _contact.blf))
      })
    })
    IPCortex.Types.Contact.addListener('new', contact => {
      store.dispatch(addContact(contact.cID, contact.name, contact.blf))
    })
    ReactDOM.render(
      <Provider store={store}>
        <ContactList />
      </Provider>,
      document.getElementById('root')
    )
  }, () => {
    console.log('starting feed failed')
  })
}, () => {
  console.log('login failed')
})
