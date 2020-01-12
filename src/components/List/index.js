import React, { Component } from 'react'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import * as listActions from '../../store/actions/list'

class List extends Component {
  constructor(props) {
    super(props)

    this.state = {
      options: [],
      searchValue: ''
    }
  }

  setSearchValue = (value) => {
    this.setState({
      searchValue: value
    }, () => {
      this.getValues()
    })
  }

  getValues = () => {
    const { searchValue } = this.state
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

  search = () => {
    this.props.history.push(`/list?search=${this.state.searchValue}`)
  }


  render() {
    const { list } = this.props
    return (
      <div>
      <input 
        value={this.state.searchValue}
        onChange={(e) => this.setSearchValue(e.target.value)}
      />
      <button
        onClick={() => this.search()}
      >
        Search
      </button>
      {!_.isEmpty(list) 
        ? this.renderCityList(list)
        : null
      }
    </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List))