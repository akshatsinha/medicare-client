import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import classnames from 'classnames'
import DatePicker from 'react-datepicker'
import { bindActionCreators } from 'redux'
import { Button, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { HIDE_EDIT_INWARD_MODAL } from '../../actions/types'
import { updateInward } from '../../actions/inwards'

class EditInward extends Component {
  constructor(props) {
    super(props)
    this.updateInward = this.updateInward.bind(this)
    this.handleBillDateSelect = this.handleBillDateSelect.bind(this)
    this.handleBillRcdDateChange = this.handleBillRcdDateChange.bind(this)
    this.handleBillRcdDateOnBlur = this.handleBillRcdDateOnBlur.bind(this)
    this.handleBillRcdDateSelect = this.handleBillRcdDateSelect.bind(this)
    this.handleBillPaidDateSelect = this.handleBillPaidDateSelect.bind(this)

    const { _id, bill_rcd_dt, bill_no, bill_dt, dd_agency_id, dd_office_id, bill_amt, bill_pd_dt, bill_pd_amt } = this.props.inward
    this.state = {
      showEditInwardForm: true,
      showMissingRcdDateError: false,
      _id,
      bill_rcd_dt: bill_rcd_dt !== '' ? moment(bill_rcd_dt, 'DD-MM-YYYY') : '',
      bill_no,
      bill_dt: bill_dt !== '' ? moment(bill_dt, 'DD-MM-YYYY') : '',
      agencyDropdownIsOpen: false,
      dd_agency_id,
      dd_agency_name: this.props.agencyIdToName[dd_agency_id],
      officeDropdownIsOpen: false,
      dd_office_id,
      dd_office_name: this.props.officeIdToName[dd_office_id],
      bill_amt,
      bill_pd_dt: bill_pd_dt !== '' ? moment(bill_pd_dt, 'DD-MM-YYYY') : '',
      bill_pd_amt
    }
  }

  updateInward() {
    const { _id, bill_rcd_dt, bill_no, bill_dt, dd_agency_id, dd_office_id, bill_amt, bill_pd_dt, bill_pd_amt } = this.state
    const submitInwardPayload = {
      _id,
      bill_rcd_dt: bill_rcd_dt === null ? '' : bill_rcd_dt !== '' ? moment(bill_rcd_dt).format('DD-MM-YYYY') : '',
      bill_no,
      bill_dt: bill_dt === null ? '' : bill_dt !== '' ? moment(bill_dt).format('DD-MM-YYYY') : '',
      dd_agency_id,
      dd_office_id,
      bill_amt,
      bill_pd_dt: bill_pd_dt === null ? '' : bill_pd_dt !== '' ? moment(bill_pd_dt).format('DD-MM-YYYY') : '',
      bill_pd_amt
    }
    console.log('To Be Updated: ', submitInwardPayload)
    this.props.updateInward(submitInwardPayload, this.props.src)
  }

  handleBillRcdDateSelect(date) {
    this.setState({ bill_rcd_dt: date, showMissingRcdDateError: false })
  }

  handleBillRcdDateChange(date) {
    this.setState({ showMissingRcdDateError: false, bill_rcd_dt: date })
  }

  handleBillRcdDateOnBlur(e) {
    if (!e.target.value) this.setState({ showMissingRcdDateError: true })
    else this.setState({ showMissingRcdDateError: false })
  }

  handleBillDateSelect(date) {
    this.setState({ bill_dt: date })
  }

  handleBillPaidDateSelect(date) {
    this.setState({ bill_pd_dt: date })
  }

  render() {
    const amt_bal = (this.state.bill_amt ? this.state.bill_amt : 0) - (this.state.bill_pd_amt ? this.state.bill_pd_amt : 0)
    return (
      <Modal isOpen className={classnames('inward-modal-wide')}>
        <ModalHeader>Edit Inward</ModalHeader>
        <ModalBody>
          <fieldset className='form-group'>
            <div className="form-inline">
              <label className={classnames("col-sm-4", "float-left")}>Received Date</label>
              <DatePicker onChange={this.handleBillRcdDateChange} onBlur={this.handleBillRcdDateOnBlur}
                name="bill_rcd_dt" dateFormat="DD-MM-YYYY" selected={this.state.bill_rcd_dt} onSelect={this.handleBillRcdDateSelect}
                className={classnames({"form-control": true, "col-sm-12": true, "error": this.state.showMissingRcdDateError})} />
              { this.state.showMissingRcdDateError && <span className={classnames("error", "offset-sm-4")}>Bill Recd date is required</span> }
            </div>
          </fieldset>

          <fieldset className='form-group'>
            <div className="form-inline">
              <label htmlFor="bill_no" className={classnames("col-sm-4", "float-left")}>Bill No.</label>
              <input id="bill_no" value={this.state.bill_no} onChange={(e) => this.setState({ bill_no: e.target.value })}
                type='text' className={classnames('form-control', 'col-sm-5')} />
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
          <Button color="primary" onClick={this.updateInward} className='btn btn-primary' disabled={!this.state.bill_rcd_dt}>Update Inward</Button>
          <Button color="secondary" onClick={() => this.props.dispatch({ type: HIDE_EDIT_INWARD_MODAL })}>Cancel</Button>
        </ModalFooter>

      </Modal>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateInward,
    dispatch
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(EditInward)
