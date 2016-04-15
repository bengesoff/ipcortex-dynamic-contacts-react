export function addContact(cid, name, blf_state) {
  return {
    type: 'NEW_CONTACT',
    contact: {
      cid,
      name,
      blf_state
    }
  }
}

export function updateContact(cid, name, blf_state) {
  return {
    type: 'UPDATE_CONTACT',
    contact: {
      cid,
      name,
      blf_state
    }
  }
}
