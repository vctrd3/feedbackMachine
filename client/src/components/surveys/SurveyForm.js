import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

export class SurveyForm extends Component {
  renderFields(){
    // return(
    //   <div>
    //     <Field label="Survey Title" type="text" name="title" component={SurveyField} />
    //   </div>
    // )
    return _.map(formFields, ({label, name}) => {
      return <Field key={name} component={SurveyField} type="text" label={label} name={name} />
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text"> Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    )
  }
}

function validate(values){ //values = object with all the values from form
  const errors = {};

  // if(!values.title){
  //   errors.title= 'You must provide a title';
  errors.recipients = validateEmails(values.recipients || ''); //if no emails entered, ''

  //show validation errors to user
  _.each(formFields, ({ name }) => {
    if(!values[name]){
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);

