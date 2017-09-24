import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import classnames from 'classnames'
import { OPEN_ADD_AGENCY_MODAL, CLOSE_ADD_AGENCY_MODAL, OPEN_EDIT_AGENCY_MODAL, CLOSE_EDIT_AGENCY_MODAL, OPEN_DEL_AGENCY_MODAL, CLOSE_DEL_AGENCY_MODAL } from '../../../actions/types'
import { createAgency, fetchAgencies, updateAgency, deleteAgency } from '../../../actions/agencies'
import RenderInput from '../../../components/RenderInput'
import 'bootstrap/dist/css/bootstrap.css'

class Agencies extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addAgencyModal: false,
      editAgencyModal: false,
      name: '',
      address: '',
      phone: '',
      del_agency_id: ''
    }
    this.createAgency = this.createAgency.bind(this)
    this.resetAddAgencyForm = this.resetAddAgencyForm.bind(this)
    this.editAgencyModal = this.editAgencyModal.bind(this)
    this.updateAgency = this.updateAgency.bind(this)
    this.deleteAgencyModal = this.deleteAgencyModal.bind(this)
    this.deleteAgency = this.deleteAgency.bind(this)
  }

  componentWillMount() {
    this.props.fetchAgencies()
  }

  createAgency(formProps) {
    this.props.createAgency(formProps)
    this.props.reset()
    this.setState({ name: '' })
  }

  resetAddAgencyForm() {
    this.props.reset()
    this.setState({ name: '' })
    this.props.dispatch({ type: CLOSE_ADD_AGENCY_MODAL })
  }

  editAgencyModal(agencyObj) {
    this.props.dispatch({ type: OPEN_EDIT_AGENCY_MODAL })
    this.setState({ name: agencyObj.name, address: agencyObj.address, phone: agencyObj.address, id: agencyObj._id })
  }

  updateAgency() {
    const { name, address, phone, id } = this.state
    this.props.updateAgency({ name, address, phone, id })
  }

  deleteAgencyModal(agencyObj) {
    this.props.dispatch({ type: OPEN_DEL_AGENCY_MODAL })
    this.setState({ del_agency_id: agencyObj._id })
  }

  deleteAgency() {
    this.props.deleteAgency(this.state.del_agency_id)
    this.setState({ del_agency_id: '' })
  }

  render() {
    const { handleSubmit, submitting, dispatch } = this.props

    return (
      <div>
        <Modal isOpen={this.props.addAgencyModalIsOpen}>
          <form onSubmit={handleSubmit(this.createAgency)}>
            <ModalHeader>Add New Agency</ModalHeader>
            <ModalBody>
              <fieldset className='form-group'>
                <label>Agency Name</label>
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
              <Button color="primary" action='submit' className='btn btn-primary' disabled={submitting || !this.state.name}>Create Agency</Button>
              <Button color="secondary" onClick={this.resetAddAgencyForm}>Cancel</Button>
            </ModalFooter>
          </form>
        </Modal>

        <Button color="primary" className={classnames('btn-add-agency')} onClick={() => dispatch({ type: OPEN_ADD_AGENCY_MODAL })}>+ Add New Agency</Button>
        {
          this.props.agencies && this.props.agencies.length > 0 &&
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
                this.props.agencies.map((agency, idx) => {
                  return (
                    <tr key={idx+1}>
                      <td className={classnames('td-agency')}>{idx + 1}</td>
                      <td className={classnames('td-agency')}>{agency.name}</td>
                      <td className={classnames('td-agency')}>{agency.address}</td>
                      <td className={classnames('td-agency')}>{agency.phone}</td>
                      <td><Button color="warning" className={classnames('btn-edit-agency')} onClick={() => this.editAgencyModal(agency)}>Edit</Button></td>
                      <td><Button color="danger" className={classnames('btn-edit-agency')} onClick={() => this.deleteAgencyModal(agency)}>Delete</Button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        }
        {
          !this.props.agencies || this.props.agencies.length == 0 &&
          <h4 className={classnames('no-agency-msg')}>No agencies have been added yet. Click button Add New Agency</h4>
        }

        <Modal isOpen={this.props.editAgencyModalIsOpen}>
          <ModalHeader>Edit Agency</ModalHeader>
          <form onSubmit={handleSubmit(this.updateAgency)}>
            <ModalBody>
              <fieldset className='form-group'>
                <label>Agency Name</label>
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
              <Button color="primary" action='submit' className='btn btn-primary' disabled={submitting || !this.state.name}>Update Agency</Button>
              <Button color="secondary" onClick={() => dispatch({ type: CLOSE_EDIT_AGENCY_MODAL })}>Cancel</Button>
            </ModalFooter>
          </form>
        </Modal>

        <Modal isOpen={this.props.delAgencyModalIsOpen}>
          <ModalHeader>Delete Agency</ModalHeader>
          <ModalBody>Are you sure you want to proceed?</ModalBody>
          <ModalFooter>
            <Button color="primary" action='submit' className='btn btn-primary' disabled={submitting} onClick={() => this.props.deleteAgency(this.state.del_agency_id) }>Yes</Button>
            <Button color="secondary" onClick={() => dispatch({ type: CLOSE_DEL_AGENCY_MODAL })}>No</Button>
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
    agencies: state.agencies.all,
    addAgencyModalIsOpen: state.agencies.add_agency_is_open,
    editAgencyModalIsOpen: state.agencies.edit_agency_is_open,
    delAgencyModalIsOpen: state.agencies.del_agency_is_open
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators ({
    createAgency,
    updateAgency,
    fetchAgencies,
    deleteAgency
  }, dispatch)
}

Agencies = reduxForm({ form: 'agency', validate })(Agencies)
Agencies = connect(mapStateToProps, mapDispatchToProps)(Agencies)
export default Agencies
