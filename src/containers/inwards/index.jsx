import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ReportsIndex from '../reports/index'
import { OPEN_ADD_INWARD_MODAL, CLOSE_ADD_INWARD_MODAL } from '../../actions/types'
import { fetchAgencies } from '../../actions/agencies'
import { fetchOffices } from '../../actions/offices'
import { createInward } from '../../actions/inwards'
import agencies from '../../reducers/agencies';
import RenderInout from '../../components/RenderInput'
import 'react-datepicker/dist/react-datepicker.css'

class Inwards extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.createInward = this.createInward.bind(this)
    this.resetAddInwardForm = this.resetAddInwardForm.bind(this)
    this.handleBillDateSelect = this.handleBillDateSelect.bind(this)
    this.handleBillRcdDateChange = this.handleBillRcdDateChange.bind(this)
    this.handleBillRcdDateOnBlur = this.handleBillRcdDateOnBlur.bind(this)
    this.handleBillRcdDateSelect = this.handleBillRcdDateSelect.bind(this)
    this.handleBillPaidDateSelect = this.handleBillPaidDateSelect.bind(this)
    this.state = {
      bill_rcd_dt: '',
      bill_no: '',
      bill_dt: '',
      dd_agency_id: '',
      dd_agency_name: '',
      dd_office_id: '',
      dd_office_name: '',
      bill_amt: '',
      bill_pd_dt: '',
      bill_pd_amt: '',
      activeTab: 'reports',
      agencyDropdownIsOpen: false,
      officeDropdownIsOpen: false
    }
  }

  componentWillMount() {
    this.props.fetchAgencies()
    this.props.fetchOffices()
  }

  resetAddInwardForm() {
    this.setState({
      bill_rcd_dt: '',
      bill_no: '',
      bill_dt: '',
      dd_agency_id: '',
      dd_agency_name: '',
      dd_office_id: '',
      dd_office_name: '',
      bill_amt: '',
      bill_pd_dt: '',
      bill_pd_amt: '',
      showMissingRcdDateError: false
    })
    this.props.dispatch({ type: CLOSE_ADD_INWARD_MODAL })
  }

  createInward() {
    const { bill_rcd_dt, bill_no, bill_dt, dd_agency_id, dd_office_id, bill_amt, bill_pd_dt, bill_pd_amt } = this.state
    const submitInwardPayload = {
      bill_rcd_dt: moment(bill_rcd_dt).format('DD-MM-YYYY'),
      bill_no,
      bill_dt: bill_dt !== '' ? moment(bill_dt).format('DD-MM-YYYY') : '',
      dd_agency_id,
      dd_office_id,
      bill_amt,
      bill_pd_dt: bill_pd_dt !== '' ? moment(bill_pd_dt).format('DD-MM-YYYY') : '',
      bill_pd_amt
    }
    console.log('To Be Submitted: ', submitInwardPayload)
    this.props.createInward(submitInwardPayload)
    this.resetAddInwardForm()
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab })
    }
  }

  handleBillRcdDateSelect (date) {
    this.setState({ bill_rcd_dt: date, showMissingRcdDateError: false })
  }

  handleBillRcdDateChange (date) {
    this.setState({ showMissingRcdDateError: false })
  }

  handleBillRcdDateOnBlur(e) {
    if (!e.target.value) this.setState({ showMissingRcdDateError: true })
    else this.setState({ showMissingRcdDateError: false })
  }

  handleBillDateSelect (date) {
    this.setState({ bill_dt: date })
  }

  handleBillPaidDateSelect (date) {
    this.setState({ bill_pd_dt: date })
  }

  render() {
    const { handleSubmit, dispatch, submitting } = this.props
    const amt_bal = (this.state.bill_amt ? this.state.bill_amt : 0) - (this.state.bill_pd_amt ? this.state.bill_pd_amt : 0)
    return (
      <div>
        <Button color="primary" className={classnames('btn-add-inward')} onClick={() => dispatch({ type: OPEN_ADD_INWARD_MODAL })}>+ Add New Inward</Button>
        <ReportsIndex />
        <Modal isOpen={this.props.addInwardModalIsOpen} className={classnames('inward-modal-wide')}>
          <form onSubmit={handleSubmit(this.createInward)}>
            <ModalHeader>Add Inward</ModalHeader>
            <ModalBody>
              <fieldset className='form-group'>
                <div className="form-inline">
                  <label className={classnames("col-sm-4", "float-left")}>Received Date</label>
                  <DatePicker onChange={this.handleBillRcdDateChange} onBlur={this.handleBillRcdDateOnBlur} name="bill_rcd_dt" dateFormat="DD-MM-YYYY" selected={this.state.bill_rcd_dt} onSelect={this.handleBillRcdDateSelect} className={classnames({"form-control": true, "col-sm-12": true, "error": this.state.showMissingRcdDateError})} />
                  { this.state.showMissingRcdDateError && <span className={classnames("error", "offset-sm-4")}>Bill Recd date is required</span> }
                </div>
              </fieldset>

              <fieldset className='form-group'>
                <div className="form-inline">
                  <label htmlFor="bill_no" className={classnames("col-sm-4", "float-left")}>Bill No.</label>
                  <input id="bill_no" value={this.state.bill_no} onChange={(e) => this.setState({ bill_no: e.target.value })} type='text' className={classnames('form-control', 'col-sm-5')} />
                </div>
              </fieldset>

              <fieldset className='form-group'>
                <div className="form-inline">
                  <label className={classnames("col-sm-4", "float-left")}>Bill Date</label>
                  <DatePicker dateFormat="DD-MM-YYYY" selected={this.state.bill_dt} onSelect={this.handleBillDateSelect} className={classnames("form-control", "col-sm-12")} />
                </div>
              </fieldset>

              <fieldset className='form-group'>
                <div className="form-inline">
                  <label className={classnames("col-sm-4", "float-left")}>Agency</label>
                  <Dropdown isOpen={this.state.agencyDropdownIsOpen} toggle={() => this.setState({ agencyDropdownIsOpen: !this.state.agencyDropdownIsOpen })} className={classnames('col-sm-6', 'force-no-left-padding')}>
                    <DropdownToggle caret className={classnames('dd-toggle', 'col-sm-12')}>{ !this.state.dd_agency_id ? 'Select Agency' : this.state.dd_agency_name }</DropdownToggle>
                    <DropdownMenu>
                      {
                        this.props.agencies && this.props.agencies.map(agency => {
                          return <DropdownItem key={agency._id} onClick={() => this.setState({ dd_agency_id: agency._id, dd_agency_name: agency.name })}>{ agency.name }</DropdownItem>
                        })
                      }
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </fieldset>

              <fieldset className='form-group'>
                <div className="form-inline">
                  <label className={classnames("col-sm-4", "float-left")}>Location</label>
                  <Dropdown isOpen={this.state.officeDropdownIsOpen} toggle={() => this.setState({ officeDropdownIsOpen: !this.state.officeDropdownIsOpen })} className={classnames('col-sm-6', 'force-no-left-padding')}>
                    <DropdownToggle caret className={classnames('dd-toggle', 'col-sm-12')}>{ !this.state.dd_office_id ? 'Select Office' : this.state.dd_office_name }</DropdownToggle>
                    <DropdownMenu>
                      {
                        this.props.offices && this.props.offices.map(office => {
                          return <DropdownItem key={office._id} onClick={() => this.setState({ dd_office_id: office._id, dd_office_name: office.name })}>{ office.name }</DropdownItem>
                        })
                      }
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </fieldset>


              <fieldset className='form-group'>
                <div className="form-inline">
                  <label className={classnames("col-sm-4", "float-left")}>Amount Due</label>
                  <input value={this.state.bill_amt} onChange={(e) => this.setState({ bill_amt: e.target.value })} type='text' className={classnames('form-control', 'col-sm-5')} />
                </div>
              </fieldset>

              <hr />

              <fieldset>
                <div className={classnames('info-payment-text')}>Fill below if payment information available</div>
              </fieldset>

              <fieldset className='form-group'>
                <div className="form-inline">
                  <label className={classnames("col-sm-4", "float-left")}>Amount Paid Date</label>
                  <DatePicker dateFormat="DD-MM-YYYY" selected={this.state.bill_pd_dt} onSelect={this.handleBillPaidDateSelect} className={classnames("form-control", "col-sm-12")} />
                </div>
              </fieldset>

              <fieldset className='form-group'>
                <div className="form-inline">
                  <label className={classnames("col-sm-4", "float-left")}>Amount Paid</label>
                  <input value={this.state.bill_pd_amt} onChange={(e) => this.setState({ bill_pd_amt: e.target.value })} type='text' className={classnames('form-control', 'col-sm-5')} />
                </div>
              </fieldset>

              <hr />
              <h4>Amount Balance: <span className={classnames({ 'amt-green': amt_bal == 0, 'amt-red': amt_bal > 0 })}>{ amt_bal }</span></h4>

            </ModalBody>
            <ModalFooter>
              <Button color="primary" action='submit' className='btn btn-primary' disabled={submitting || !this.state.bill_rcd_dt }>Create Inward</Button>
              <Button color="secondary" onClick={this.resetAddInwardForm}>Cancel</Button>
            </ModalFooter>

          </form>
        </Modal>

      </div>
    )
  }
}

function validate(values) {
  const errors = {}
  return errors
}

function mapStateToProps (state) {
  return {
    addInwardModalIsOpen: state.inwards.add_inward_is_open,
    agencies: state.agencies.all,
    offices: state.offices.all
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators ({
    fetchAgencies,
    fetchOffices,
    createInward
  }, dispatch)
}

Inwards = reduxForm({ form: 'inward' , validate })(Inwards)
Inwards = connect(mapStateToProps, mapDispatchToProps)(Inwards)
export default Inwards
