import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchAgencies } from '../../actions/agencies'
import { fetchOffices } from '../../actions/offices'

class Reports extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchOffices()
    this.props.fetchAgencies()
  }

  render() {
    return (
      <div>
        AddInward Component

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    offices: state.offices.all,
    agencies: state.agencies.all
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators ({
    fetchAgencies,
    fetchOffices
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Reports)
