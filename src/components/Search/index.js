import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import * as searchActions from '../../store/actions/search'

class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEdit: false,
      cityName: '',
      country: ''
    }
  }

  componentDidMount() {
    const href = this.props.location.pathname
    const searchValueArr = href.split('/')
    const searchValue = searchValueArr[2]

    this.props.searchActions.get(searchValue)
  }


  renderEditButton = (city) => {
    if (this.state.isEdit) {
      return (
        <Fragment>
          <button onClick={() => this.saveChanges()}> Save </button>
          <button onClick={() => this.setState({isEdit: false})}> Cancel </button>
        </Fragment>
      )
    }
    return (
      <button 
        onClick={() => 
          this.setState({
            isEdit: true, 
            cityName: city.name, 
            country: city._links["city:country"].name
          })
        }
      >
        Edit
      </button>
    )
  }

  saveChanges = () => {
    const city = this.state.cityName
    const country = this.state.country

    this.props.searchActions.change({city, country})
    this.setState({isEdit: false})
  }

  handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({[name]: value})
  }

  renderCityInfo = (city) => {
    return (
      <div>
        <div>
          City name: 
          {this.state.isEdit 
            ? <input 
                value={this.state.cityName} 
                name="cityName"
                onChange={(e) => this.handleChange(e)}
              /> 
            : city.name
          }
        </div>
        <div>
          Country: 
          {this.state.isEdit 
            ? <input 
                value={this.state.country} 
                name="country"
                onChange={(e) => this.handleChange(e)}
              /> 
            : city._links["city:country"].name
          }
        </div>
        <div>
          Timezone: {city._links["city:timezone"].name}
        </div>
        <div>
          Population: {city.population}
        </div>

        <div>
          {this.renderEditButton(city)}
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