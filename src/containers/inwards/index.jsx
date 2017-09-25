import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Reports from './Reports'
import { OPEN_ADD_INWARD_MODAL, CLOSE_ADD_INWARD_MODAL } from '../../actions/types'
import { fetchAgencies } from '../../actions/agencies'
import { fetchOffices } from '../../actions/offices'
import agencies from '../../reducers/agencies';

class Inwards extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.createInward = this.createInward.bind(this)
    this.resetAddInwardForm = this.resetAddInwardForm.bind(this)
    this.state = {
      activeTab: 'reports',
      rcd_bill_day: '',
      rcd_bill_month: '',
      rcd_bill_year: '',
      bill_day: '',
      bill_month: '',
      bill_year: '',
      bill_amt: '',
      bill_no: '',
      dd_agency_id: null,
      dd_agency_name: null,
      dd_office_id: null,
      dd_office_name: null,
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
      rcd_bill_day: '',
      rcd_bill_month: '',
      rcd_bill_year: '',
      bill_day: '',
      bill_month: '',
      bill_year: '',
      bill_amt: '',
      bill_no: '',
      dd_agency_id: null,
      dd_agency_name: null,
      dd_office_id: null,
      dd_office_name: null
    })
    this.props.dispatch({ type: CLOSE_ADD_INWARD_MODAL })
  }

  createInward() {

  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab })
    }
  }

  render() {
    const { handleSubmit, dispatch, submitting } = this.props

    return (
      <div>
        <Button color="primary" className={classnames('btn-add-inward')} onClick={() => dispatch({ type: OPEN_ADD_INWARD_MODAL })}>+ Add New Inward</Button>
        <div className={classnames('inwards-panel-tabs')}>
          <Nav tabs>
            <NavItem>
              <NavLink className={classnames({ active: this.state.activeTab === 'reports' })} onClick={() => { this.toggle('reports') }}>Reports</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: this.state.activeTab === 'add_inwards' })} onClick={() => { this.toggle('add_inwards'); }}>All Inwards</NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="reports">
              <Row><Col sm="12">Reports</Col></Row>
            </TabPane>
            <TabPane tabId="add_inwards">
              <Row><Col sm="12">All Inwards</Col></Row>
            </TabPane>
          </TabContent>
        </div>

      <Modal isOpen={this.props.addInwardModalIsOpen}>
        <form onSubmit={handleSubmit(this.createInward)}>
          <ModalHeader>Add Inward</ModalHeader>
          <ModalBody>
            <fieldset className='form-group'>
              <label>Received Date</label>
              <div className="form-inline">
                <input value={this.state.rcd_bill_day} onChange={(e) => this.setState({ rcd_bill_day: e.target.value })} type='text' className={classnames('form-control', 'col-sm-3', 'input-dt')} placeholder="Day (1-31)"/>
                <input value={this.state.rcd_bill_month} onChange={(e) => this.setState({ rcd_bill_month: e.target.value })} type='text' className={classnames('form-control', 'col-sm-3', 'input-dt')} placeholder="Month (1-12)"/>
                <input value={this.state.rcd_bill_year} onChange={(e) => this.setState({ rcd_bill_year: e.target.value })} type='text' className={classnames('form-control', 'col-sm-3', 'input-dt')} placeholder="Year (20xx)"/>
              </div>
            </fieldset>

            <fieldset className='form-group'>
              <label>Bill No.</label>
              <input value={this.state.bill_no} onChange={(e) => this.setState({ bill_no: e.target.value })} type='text' className={classnames('form-control', 'col-sm-6')} />
            </fieldset>

            <fieldset className='form-group'>
              <label>Bill Date</label>
              <div className="form-inline">
                <input value={this.state.bill_day} onChange={(e) => this.setState({ bill_day: e.target.value })} type='text' className={classnames('form-control', 'col-sm-3', 'input-dt')} placeholder="Day (1-31)"/>
                <input value={this.state.bill_month} onChange={(e) => this.setState({ bill_month: e.target.value })} type='text' className={classnames('form-control', 'col-sm-3', 'input-dt')} placeholder="Month (1-12)"/>
                <input value={this.state.bill_year} onChange={(e) => this.setState({ bill_year: e.target.value })} type='text' className={classnames('form-control', 'col-sm-3', 'input-dt')} placeholder="Year (20xx)"/>
              </div>
            </fieldset>

            <fieldset className='form-group'>
              <label>Agency</label>
              <Dropdown isOpen={this.state.agencyDropdownIsOpen} toggle={() => this.setState({ agencyDropdownIsOpen: !this.state.agencyDropdownIsOpen })}>
                <DropdownToggle caret className={classnames('dd-toggle')}>{ !this.state.dd_agency_id ? 'Select Agency' : this.state.dd_agency_name }</DropdownToggle>
                <DropdownMenu>
                  {
                    this.props.agencies && this.props.agencies.map(agency => {
                      return <DropdownItem key={agency._id} onClick={() => this.setState({ dd_agency_id: agency._id, dd_agency_name: agency.name })}>{ agency.name }</DropdownItem>
                    })
                  }
                </DropdownMenu>
              </Dropdown>
            </fieldset>

            <fieldset className='form-group'>
              <label>Amount</label>
              <input value={this.state.bill_amt} onChange={(e) => this.setState({ bill_amt: e.target.value })} type='text' className={classnames('form-control', 'col-sm-6')} />
            </fieldset>

            <fieldset className='form-group'>
              <label>Bill For Location</label>
              <Dropdown isOpen={this.state.officeDropdownIsOpen} toggle={() => this.setState({ officeDropdownIsOpen: !this.state.officeDropdownIsOpen })}>
                <DropdownToggle caret className={classnames('dd-toggle')}>{ !this.state.dd_office_id ? 'Select Office Location' : this.state.dd_office_name }</DropdownToggle>
                <DropdownMenu>
                  {
                    this.props.offices && this.props.offices.map(office => {
                      return <DropdownItem key={office._id} onClick={() => this.setState({ dd_office_id: office._id, dd_office_name: office.name })}>{ office.name }</DropdownItem>
                    })
                  }
                </DropdownMenu>
              </Dropdown>
            </fieldset>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" action='submit' className='btn btn-primary' disabled={submitting}>Create Inward</Button>
            <Button color="secondary" onClick={this.resetAddInwardForm}>Cancel</Button>
          </ModalFooter>

        </form>
      </Modal>

      </div>
    )
  }
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
    fetchOffices
  }, dispatch)
}

Inwards = reduxForm({ form: 'inward' })(Inwards)
Inwards = connect(mapStateToProps, mapDispatchToProps)(Inwards)
export default Inwards
