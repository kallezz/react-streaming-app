import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Form, Message, Card, Button} from "semantic-ui-react";

class StreamForm extends React.Component {
  renderInput = ({
                   input,
                   label,
                   placeholder,
                   type,
                   meta: {
                     touched,
                     error,
                     warning
                   }
                 }) => {
    return (
      <Form.Field error={!!(error && touched)}>
        <label>{label}</label>
        <input {...input} placeholder={placeholder} type={type} autoComplete="off"/>
        {touched && ((error && <Message size="tiny" negative header='Error' content={error} />) || (warning && <Message size="tiny" warning header='Warning' content={warning} />))}
      </Form.Field>
    )
  };

  onSubmit = values => {
    this.props.onSubmit(values)
  };

  render() {
    return (
      <Card fluid as="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Card.Content>
          <Card.Header>
            {this.props.title}
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Form as="div">
            <Field
              name="title"
              label="Title"
              placeholder="Enter title"
              type="text"
              component={this.renderInput} />
            <Field
              name="description"
              label="Description"
              placeholder="Enter description"
              type="text"
              component={this.renderInput} />
          </Form>
        </Card.Content>
        <Card.Content extra textAlign="center">
          <Button type="submit" inverted color='green'>
            {this.props.submitText}
          </Button>
        </Card.Content>
      </Card>
    )
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'Title is required'
  }

  if (!formValues.description) {
    errors.description = 'Description is required'
  }

  return errors;
};

export default  reduxForm({
  form: 'streamForm',
  validate
})(StreamForm);