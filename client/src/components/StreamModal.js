import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Header, Icon, Modal} from "semantic-ui-react";

const StreamModal = props => {
  return ReactDOM.createPortal(
    <Modal
      basic
      onClose={props.onCancel}
      onOpen={props.open}
      open={props.status}
      size='small'
    >
      <Header icon>
        <Icon name='trash' />
        {props.title}
      </Header>
      <Modal.Content textAlign="center">
        {props.content}
      </Modal.Content>
      <Modal.Actions>
        <Button primary inverted onClick={props.onCancel}>
          <Icon name='remove'/> Cancel
        </Button>
        <Button color='red' inverted onClick={props.onDelete}>
          <Icon name='checkmark'/> Delete
        </Button>
      </Modal.Actions>
    </Modal>,
    document.querySelector('#modal')
  )
};

export default StreamModal;