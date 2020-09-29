import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import StreamList from "./components/streams/StreamList";
import StreamCreate from "./components/streams/StreamCreate";
import StreamEdit from "./components/streams/StreamEdit";
import StreamDelete from "./components/streams/StreamDelete";
import StreamShow from "./components/streams/StreamShow";
import {Container} from "semantic-ui-react";
import Header from "./components/Header";
import history from "./history";

const App = () => {
  return (
    <Router history={history}>
      <Header/>
      <Container fluid>
        <Route path="/" exact component={StreamList}/>
        <Route path="/streams/edit/:id" exact component={StreamEdit}/>
        <Route path="/streams/delete" component={StreamList} />
        <Route path="/streams/delete/:id" exact component={StreamDelete}/>
        <Switch>
          <Route path="/streams/new" exact component={StreamCreate}/>
          <Route path="/streams/:id" exact component={StreamShow}/>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;