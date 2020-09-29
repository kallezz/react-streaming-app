import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchStream} from "../../actions";
import {Grid, Header, Icon, Loader, Segment} from "semantic-ui-react";

class StreamShow extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }

  render() {
    if (!this.props.stream) {
      return <Loader active inline='centered' />
    }

    const {title, description} = this.props.stream;

    return (
      <Grid centered>
        <Grid.Row>
          <Segment inverted attached>
            <Header as='h1' inverted>
              <Icon name='podcast' />
              <Header.Content>
                {title}
                <Header.Subheader>{description}</Header.Subheader>
              </Header.Content>
            </Header>
          </Segment>
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
  fetchStream
})(StreamShow);