import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import RenderInput from '../../components/RenderInput'
import * as actions from '../../actions'

class Signin extends Component {
  constructor(props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password })
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
        <fieldset className='form-group'>
          <label>Email</label>
          <Field name='email' component={RenderInput} type='email' />
        </fieldset>
        <fieldset className='form-group'>
          <label>Password</label>
          <Field name='password' component={RenderInput} type='password' />
        </fieldset>
        {
          this.props.errorMessage &&
          <div className='alert alert-danger'>
            <strong>Oops! </strong>{this.props.errorMessage}
          </div>
        }
        <button action='submit' className='btn btn-primary'>Sign In</button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  }
}

// reduxForm v6+ does not support connect inherently. So, below wont work anymore.
// export default reduxForm({
//   form: 'signin'
// }, null, actions)(Signin)

// This will work instead
Signin = reduxForm({ form: 'signin' })(Signin)
Signin = connect(mapStateToProps, actions)(Signin)
export default Signin
