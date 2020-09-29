import React from 'react';
import {connect} from 'react-redux';
import {createStream} from "../../actions";
import {Grid} from "semantic-ui-react";
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {
  onSubmit = values => {
    this.props.createStream(values)
  };

  render() {
    return (
      <Grid centered padded>
        <Grid.Row>
          <Grid.Column width={6}>
            <StreamForm
              title="Create a stream"
              submitText="Create Stream"
              onSubmit={this.onSubmit}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default connect(null, {
  createStream
})(StreamCreate);