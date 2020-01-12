import React, { Component } from 'react'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import * as listActions from '../../store/actions/list'

class CitiesList extends Component {
  componentDidMount() {
    const href = this.props.location.search
    const searchValue = href.substring(href.lastIndexOf('=') + 1)

    if (searchValue !== '') {
      this.props.listActions.get(searchValue)
    } else {
      this.props.listActions.getInitialState()
    }
  }

  renderCityList = (list) => {
    return (
      <div>
      {_.map(list._embedded["city:search-results"], item => {
        const itemHref = item._links['city:item'].href
        const pushValue = itemHref.substring(itemHref.lastIndexOf(':') + 1)
        return (
          <p 
            className="link"
            key={item.matching_full_name}
            onClick={() => this.props.history.push(`/search/${pushValue}`)}
          >
            {item.matching_full_name}
          </p>
        )
      })}
    </div> 
    )
  }


  render() {
    const { list } = this.props
    return (
      !_.isEmpty(list) && !_.isEmpty(list._embedded["city:search-results"])
        ? this.renderCityList(list)
        : <p>There is no cities according to your request</p>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    listActions: bindActionCreators(listActions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CitiesList))