import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import classnames from 'classnames'
import ReportByAgenciesIndex from './agencies'
import ReportByOfficesIndex from './offices'

class ReportsIndex extends Component {
  constructor(props) {
    super(props)
    this.toggleReportTabs = this.toggleReportTabs.bind(this)
    this.state = {
      activeTab: 'by_agencies'
    }
  }

  toggleReportTabs(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab })
    }
  }

  render() {
    return (
      <div className="tab-content-top-margin">
        <div className="btn-group" role="group">
          <button type="button" className={classnames("btn btn-secondary", { "active": this.state.activeTab === 'by_agencies' })} onClick={() => { this.toggleReportTabs('by_agencies') }}>View By Agencies</button>
          <button type="button" className={classnames("btn btn-secondary", { "active": this.state.activeTab === 'by_offices' })} onClick={() => { this.toggleReportTabs('by_offices') }}>View By Medicare Offices</button>
          <button type="button" className={classnames("btn btn-secondary", { "active": this.state.activeTab === 'by_all_inwards' })} onClick={() => { this.toggleReportTabs('by_all_inwards') }}>All Inwards</button>
        </div>
        <Col sm="12">
          { this.state.activeTab === "by_agencies" && <ReportByAgenciesIndex /> }
          { this.state.activeTab === "by_offices" && <ReportByOfficesIndex /> }
          { this.state.activeTab === "by_all_inwards" && <span>By All Inwards</span> }
        </Col>
      </div>
    )
  }
}

export default ReportsIndex
