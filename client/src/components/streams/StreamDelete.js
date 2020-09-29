import React from 'react';
import history from "../../history";
import {connect} from 'react-redux';
import {deleteStream, fetchStream} from "../../actions";
import StreamModal from "../StreamModal";

class StreamDelete extends React.Component {
  state = {
    status: true
  };

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }

  renderContent = () => {
    if (!this.props.stream) {
      return 'Do you really want to delete the stream?'
    } else {
      return `Do you really want to delete the stream: ${this.props.stream.title}?`
    }
  };

  render() {
    return (
      <StreamModal
        title="Are you sure?"
        content={this.renderContent()}
        open={() => this.setState({status: true})}
        onCancel={() => {
          this.setState({status: false});
          history.push('/');
        }}
        onDelete={() => {
          this.setState({status: false});
          this.props.deleteStream(this.props.match.params.id)
        }}
        status={this.state.status}
      />
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
  deleteStream
})(StreamDelete);