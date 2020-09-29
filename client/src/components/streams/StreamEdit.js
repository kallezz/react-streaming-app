import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {fetchStream, editStream} from "../../actions";
import {Grid} from "semantic-ui-react";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }

  onSubmit = values => {
    this.props.editStream(this.props.match.params.id, values)
  };

  render() {
    return (
      <Grid centered padded>
        <Grid.Row>
          <Grid.Column width={6}>
            <StreamForm
              title={this.props.stream ? 'Editing ' + this.props.stream.title : 'Loading...'}
              submitText="Save Stream"
              initialValues={_.pick(this.props.stream, 'title', 'description')}
              onSubmit={this.onSubmit}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  }
};

export default connect(mapStateToProps, {
  fetchStream,
  editStream
})(StreamEdit);