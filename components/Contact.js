import React, {Component} from 'react'

const icon_states = ["call_end", "phone", "ring_volume", "phone"]

export class Contact extends Component {
  render() {
    return (
      <li>
        <a>
          <i className='material-icons'>{icon_states[this.props.blf_state]}</i>
          {this.props.name}
        </a>
      </li>
    )
  }
}
