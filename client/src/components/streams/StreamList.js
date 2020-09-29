import React from 'react';
import {Button, Grid, Header, List} from "semantic-ui-react";
import {connect} from "react-redux";
import {fetchStreams} from "../../actions";
import {Link} from "react-router-dom";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdminActions = stream => {
    if (stream.userId === this.props.currentUserId) {
      return (
        <List.Content floated="right">
          <Button
            as={Link}
            to={`/streams/edit/${stream.id}`}
            inverted
            primary
          >
            Edit
          </Button>
          <Button
            as={Link}
            to={`/streams/delete/${stream.id}`}
            inverted
            color="red"
          >
            Delete
          </Button>
        </List.Content>
      )
    }
  };

  renderList = () => {
    return this.props.streams.map(stream => (
      <List.Item key={stream.id}>
        {this.renderAdminActions(stream)}
        <List.Icon name='podcast' size='large' verticalAlign='middle' />
        <List.Content>
          <List.Header as={Link} to={`/streams/${stream.id}`}>{stream.title}</List.Header>
          <List.Description>{stream.description}</List.Description>
        </List.Content>
      </List.Item>
    ))
  };

  renderCreate = () => {
    if (this.props.isSignedIn) {
      return (
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Button inverted primary as={Link} to="/streams/new">
              Create Stream
            </Button>
          </Grid.Column>
        </Grid.Row>
      )
    }
  };

  render() {
    return (
      <Grid centered padded>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header as="h1">
              Streams
            </Header>
            <List divided relaxed>
              {this.renderList()}
            </List>
          </Grid.Column>
        </Grid.Row>
        {this.renderCreate()}
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  }
};

export default connect(mapStateToProps, {
  fetchStreams
})(StreamList);