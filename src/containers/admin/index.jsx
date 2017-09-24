import React, { Component } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import classnames from 'classnames'
import ViewAgencies from './agencies'

const AdminPanel = ({ title, link }) => {
  return (
    <Link to={link}>
      <div className="panel panel-default">
        <div className="panel-body">
          { title }
        </div>
      </div>
    </Link>
  )
}

class Admin extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = { activeTab: 'agencies' }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab })
    }
  }

  render() {
    return (
      <div className={classnames('admin-panel-tabs')}>
        <Nav tabs>
          <NavItem>
            <NavLink className={classnames({ active: this.state.activeTab === 'agencies' })} onClick={() => { this.toggle('agencies') }}>Agencies</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({ active: this.state.activeTab === 'office_locations' })} onClick={() => { this.toggle('office_locations'); }}>Office Locations</NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="agencies">
            <Row><Col sm="12"><ViewAgencies /></Col></Row>
          </TabPane>
          <TabPane tabId="office_locations">
            <Row><Col sm="12"><h4>Tab 2 Contents</h4></Col></Row>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

export default connect(null, null)(Admin)
