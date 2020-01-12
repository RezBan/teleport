import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import * as searchActions from '../../store/actions/search'

class Search extends Component {
  componentDidMount() {
    const href = this.props.location.pathname
    const searchValueArr = href.split('/')
    const searchValue = searchValueArr[2]

    this.props.searchActions.get(searchValue)
  }

  renderCityInfo = (city) => {
    return (
      <div>
        <div>
          City name: {city.name}
        </div>
        <div>
          Country: {city._links["city:country"].name}
        </div>
        <div>
          Timezone: {city._links["city:timezone"].name}
        </div>
        <div>
          Population: {city.population}
        </div>
      </div>
    )
  }

  render() {
    const { city } = this.props
    return (
      <Fragment>
        {_.size(city.error) || _.isEmpty(city)
          ? <p>This city was not find.</p>
          : this.renderCityInfo(city)
        }
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    city: state.city
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchActions: bindActionCreators(searchActions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search))