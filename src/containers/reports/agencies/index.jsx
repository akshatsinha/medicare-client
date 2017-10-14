import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Table, Button } from 'reactstrap'
import { bindActionCreators } from 'redux'
import { viewByAgencies } from '../../../actions/inwards'
import EditInward from '../../inwards/EditInward'

class ReportByAgenciesIndex extends Component {
  constructor(props) {
    super(props)
    this.editInward = this.editInward.bind(this)
    this.showPeriodData = this.showPeriodData.bind(this)
    this.toggleEditModal = this.toggleEditModal.bind(this)
    this.state = {
      showCards: true,
      periodTableData: '',
      inwardToEdit: null,
      showEditInwardModal: false
    }
  }

  componentDidMount() {
    this.props.viewByAgencies()
  }

  componentWillMount() {
    this.setState({ showCards: true, periodTableData: '' })
  }

  showPeriodData(agencyPeriod) {
    console.log('*****> ', agencyPeriod)
    this.setState({ showCards: false, periodTableData: agencyPeriod })
  }

  editInward(inward) {
    this.setState({ showEditInwardModal: true, inwardToEdit: inward })
  }

  toggleEditModal() {
    this.setState({ showEditInwardModal: !this.state.showEditInwardModal })
  }

  render() {
    const agencyIdToName = {}
    const officeIdToName = {}

    if (this.props.agencies) {
      this.props.agencies.forEach(agencyObj => {
        agencyIdToName[agencyObj._id] = agencyObj.name
      })
    }

    if (this.props.offices) {
      this.props.offices.forEach(officeObj => {
        officeIdToName[officeObj._id] = officeObj.name
      })
    }

    return (
      <div>
        {
          this.state.showEditInwardModal &&
          <EditInward inward={this.state.inwardToEdit} agencyIdToName={agencyIdToName} officeIdToName={officeIdToName}
            agencies={this.props.agencies} offices={this.props.offices} toggleEditModal={this.toggleEditModal} />
        }
        <div className="tab-content-top-margin">
          <Row>
          {
            this.state.showCards && this.props.agency_periods.map((agencyPeriod, idx) => {
              return (
                <Col sm="4" key={idx}>
                  <div className="card inward-summary-card" onClick={() => {this.showPeriodData(agencyPeriod)}}>
                    <div className="card-block">
                      <h4 className="card-title">{ agencyPeriod.canonical_period }</h4>
                      <p className="card-text">Total<span className="bal-numbers">{ agencyPeriod.total_bill_amt }</span></p>
                      <p className="card-text">Paid<span className="bal-numbers">{ agencyPeriod.total_bill_pd_amt || 0 }</span></p>
                      <hr />
                      <p className="card-text">Balance<span className="bal-numbers">{ agencyPeriod.total_bill_amt - agencyPeriod.total_bill_pd_amt }</span></p>
                    </div>
                  </div>
                </Col>
              )
            })
          }
          {
            !this.state.showCards && this.state.periodTableData && this.state.periodTableData.inwards &&
            <div>
              <h4>Inwards for { this.state.periodTableData.canonical_period }</h4>
              {
                Object.keys(this.state.periodTableData.by_agency).map((agencyId, idx) => {
                  return (
                    <div key={idx}>
                      <h5 className="tab-content-top-margin">{ agencyIdToName[agencyId] }</h5>
                      <Table striped key={idx}>
                        <thead>
                          <tr key={idx}>
                            <th>Recd. Dt</th>
                            <th>Bill No.</th>
                            <th>Bill Dt.</th>
                            <th>Agency</th>
                            <th>Location</th>
                            <th>Amt</th>
                            <th>Amt Pd.</th>
                            <th>Balance</th>
                            <th>Amt. Pd. Dt</th>
                            <th></th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                        {
                          this.state.periodTableData.by_agency[agencyId].map((periodData, indx) => {
                            return (
                              <tr key={indx}>
                                <td>{ periodData.bill_rcd_dt }</td>
                                <td>{ periodData.bill_no }</td>
                                <td>{ periodData.bill_dt }</td>
                                <td>{ agencyIdToName[periodData.dd_agency_id] }</td>
                                <td>{ officeIdToName[periodData.dd_office_id] }</td>
                                <td>{ periodData.bill_amt }</td>
                                <td>{ periodData.bill_pd_amt }</td>
                                <td>{ periodData.bill_amt - periodData.bill_pd_amt }</td>
                                <td>{ periodData.bill_pd_dt }</td>
                                <td></td>
                                <td><Button color="warning" onClick={() => this.editInward(periodData)}>Edit</Button></td>
                              </tr>
                            )
                          })
                        }
                        </tbody>
                      </Table>
                    </div>
                  )
                })
              }
            </div>
          }
          </Row>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    agency_periods: state.inwards.agency_periods,
    agencies: state.agencies.all,
    offices: state.offices.all
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    viewByAgencies,
    dispatch
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportByAgenciesIndex)
