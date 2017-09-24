import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import classnames from 'classnames'
import { OPEN_ADD_OFFICE_MODAL, CLOSE_ADD_OFFICE_MODAL, OPEN_EDIT_OFFICE_MODAL, CLOSE_EDIT_OFFICE_MODAL, OPEN_DEL_OFFICE_MODAL, CLOSE_DEL_OFFICE_MODAL } from '../../../actions/types'
import { createOffice, fetchOffices, updateOffice, deleteOffice } from '../../../actions/offices'
import RenderInput from '../../../components/RenderInput'
import 'bootstrap/dist/css/bootstrap.css'

class Offices extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addOfficeModal: false,
      editOfficeModal: false,
      name: '',
      address: '',
      phone: '',
      del_office_id: ''
    }
    this.createOffice = this.createOffice.bind(this)
    this.resetAddOfficeForm = this.resetAddOfficeForm.bind(this)
    this.editOfficeModal = this.editOfficeModal.bind(this)
    this.updateOffice = this.updateOffice.bind(this)
    this.deleteOfficeModal = this.deleteOfficeModal.bind(this)
    this.deleteOffice = this.deleteOffice.bind(this)
  }

  componentWillMount() {
    this.props.fetchOffices()
  }

  createOffice(formProps) {
    this.props.createOffice(formProps)
    this.props.reset()
    this.setState({ name: '' })
  }

  resetAddOfficeForm() {
    this.props.reset()
    this.setState({ name: '' })
    this.props.dispatch({ type: CLOSE_ADD_OFFICE_MODAL })
  }

  editOfficeModal(officeObj) {
    this.props.dispatch({ type: OPEN_EDIT_OFFICE_MODAL })
    this.setState({ name: officeObj.name, address: officeObj.address, phone: officeObj.address, id: officeObj._id })
  }

  updateOffice() {
    const { name, address, phone, id } = this.state
    this.props.updateOffice({ name, address, phone, id })
  }

  deleteOfficeModal(officeObj) {
    this.props.dispatch({ type: OPEN_DEL_OFFICE_MODAL })
    this.setState({ del_office_id: officeObj._id })
  }

  deleteOffice() {
    this.props.deleteOffice(this.state.del_office_id)
    this.setState({ del_office_id: '' })
  }

  render() {
    const { handleSubmit, submitting, dispatch } = this.props

    return (
      <div>
        <Modal isOpen={this.props.addOfficeModalIsOpen}>
          <form onSubmit={handleSubmit(this.createOffice)}>
            <ModalHeader>Add New Office Location</ModalHeader>
            <ModalBody>
              <fieldset className='form-group'>
                <label>Office Name</label>
                <Field name='name' value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} component={RenderInput} type='text' />
              </fieldset>
              <fieldset className='form-group'>
                <label>Address</label>
                <Field name='address' component={RenderInput} type='text' />
              </fieldset>
              <fieldset className='form-group'>
                <label>Phone</label>
                <Field name='phone' component={RenderInput} type='text' />
              </fieldset>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" action='submit' className='btn btn-primary' disabled={submitting || !this.state.name}>Create Office</Button>
              <Button color="secondary" onClick={this.resetAddOfficeForm}>Cancel</Button>
            </ModalFooter>
          </form>
        </Modal>

        <Button color="primary" className={classnames('btn-add-office')} onClick={() => dispatch({ type: OPEN_ADD_OFFICE_MODAL })}>+ Add New Office</Button>
        {
          this.props.offices && this.props.offices.length > 0 &&
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.offices.map((office, idx) => {
                  return (
                    <tr key={idx+1}>
                      <td className={classnames('td-office')}>{idx + 1}</td>
                      <td className={classnames('td-office')}>{office.name}</td>
                      <td className={classnames('td-office')}>{office.address}</td>
                      <td className={classnames('td-office')}>{office.phone}</td>
                      <td><Button color="warning" className={classnames('btn-edit-office')} onClick={() => this.editOfficeModal(office)}>Edit</Button></td>
                      <td><Button color="danger" className={classnames('btn-edit-office')} onClick={() => this.deleteOfficeModal(office)}>Delete</Button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        }
        {
          !this.props.offices || this.props.offices.length == 0 &&
          <h4 className={classnames('no-office-msg')}>No office locations have been added yet. Click button Add New Office</h4>
        }

        <Modal isOpen={this.props.editOfficeModalIsOpen}>
          <ModalHeader>Edit Office</ModalHeader>
          <form onSubmit={handleSubmit(this.updateOffice)}>
            <ModalBody>
              <fieldset className='form-group'>
                <label>Office Name</label>
                <input value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} type='text' className={classnames({'form-control': true, 'error': !this.state.name})} />
                { !this.state.name && <span className="error">Required</span> }
              </fieldset>
              <fieldset className='form-group'>
                <label>Address</label>
                <input value={this.state.address} onChange={(e) => this.setState({ address: e.target.value })} type='text' className={classnames('form-control')} />
              </fieldset>
              <fieldset className='form-group'>
                <label>Phone</label>
                <input value={this.state.phone} onChange={(e) => this.setState({ phone: e.target.value })} type='text' className={classnames('form-control')} />
              </fieldset>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" action='submit' className='btn btn-primary' disabled={submitting || !this.state.name}>Update Office</Button>
              <Button color="secondary" onClick={() => dispatch({ type: CLOSE_EDIT_OFFICE_MODAL })}>Cancel</Button>
            </ModalFooter>
          </form>
        </Modal>

        <Modal isOpen={this.props.delOfficeModalIsOpen}>
          <ModalHeader>Delete Office</ModalHeader>
          <ModalBody>Are you sure you want to proceed?</ModalBody>
          <ModalFooter>
            <Button color="primary" action='submit' className='btn btn-primary' disabled={submitting} onClick={() => this.props.deleteOffice(this.state.del_office_id) }>Yes</Button>
            <Button color="secondary" onClick={() => dispatch({ type: CLOSE_DEL_OFFICE_MODAL })}>No</Button>
          </ModalFooter>
        </Modal>

      </div>
    )
  }
}

function validate(values) {
  const errors = {}
  if (!values.name) errors.name = 'Required'
  return errors
}

function mapStateToProps(state) {
  return {
    offices: state.offices.all,
    addOfficeModalIsOpen: state.offices.add_office_is_open,
    editOfficeModalIsOpen: state.offices.edit_office_is_open,
    delOfficeModalIsOpen: state.offices.del_office_is_open
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators ({
    createOffice,
    updateOffice,
    fetchOffices,
    deleteOffice
  }, dispatch)
}

Offices = reduxForm({ form: 'office', validate })(Offices)
Offices = connect(mapStateToProps, mapDispatchToProps)(Offices)
export default Offices
