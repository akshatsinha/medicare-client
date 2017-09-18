import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import RenderInput from '../../components/RenderInput'
import * as actions from '../../actions'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(formProps) {
    this.props.signupUser(formProps)
  }

  render() {
    const { handleSubmit, submitting } = this.props
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset className='form-group'>
          <label>First</label>
          <Field name='fname' component={RenderInput} type='text' />
        </fieldset>
        <fieldset className='form-group'>
          <label>Last</label>
          <Field name='lname' component={RenderInput} type='text' />
        </fieldset>
        <fieldset className='form-group'>
          <label>Email</label>
          <Field name='email' component={RenderInput} type='email' />
        </fieldset>
        <fieldset className='form-group'>
          <label>Password</label>
          <Field name='password' component={RenderInput} type='password' />
        </fieldset>
        <fieldset className='form-group'>
          <label>Phone (optional)</label>
          <Field name='phone' component={RenderInput} type='text' />
        </fieldset>
        {
          this.props.errorMessage &&
          <div className='alert alert-danger'>
            <strong>Oops! </strong>{this.props.errorMessage}
          </div>
        }
        <button action='submit' className='btn btn-primary' disabled={submitting}>Sign Up</button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  }
}

function validate(values) {
  const errors = {}
  if (!values.email) errors.email = 'Required'
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) errors.email = 'Invalid email address'
  if (!values.password) errors.password = 'Required'
  else if (values.password.length < 3) errors.password = 'Min. password length 3'
  if (!values.fname) errors.fname = 'Required'
  if (!values.lname) errors.lname = 'Required'
  return errors
}

Signup = reduxForm({ form: 'signup', validate })(Signup)
Signup = connect(mapStateToProps, actions)(Signup)
export default Signup
