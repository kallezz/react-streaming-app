import React, {Component} from 'react';
import flv from 'flv.js';
import {connect} from "react-redux";
import {fetchStream} from "../../actions";
import {Grid, Header, Icon, Loader, Segment} from "semantic-ui-react";

class StreamShow extends Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const {id} = this.props.match.params;

    this.props.fetchStream(id);
    this.buildPlayer();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  buildPlayer = () => {
    if (this.player || !this.props.stream) {
      return;
    }

    const {id} = this.props.match.params;
    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
    this.player.play();
  };

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
        <Grid.Row color="black">
          <Grid.Column width={8}>
            <div className="ui embed">
              <video
                controls
                ref={this.videoRef}
                style={{
                  width: '100%'
                }}
              />
            </div>
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
  fetchStream
})(StreamShow);