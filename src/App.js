import React from "react";
import "./App.css";
import  "bootstrap/dist/css/bootstrap.css";
import countryData from "./data/countries";
import statesData from "./data/states.json";
import citiesData from "./data/cities.json";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      delivery: "no",
      payment: "cash",
      contryId: null,
      countryStates: [],
      countryCities: [],
      cardNumber: "",
      expirationDate: "",
      cvv: "",
      x: null,
      y: null
    };
  }
  onChangeInput(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }
 
  onContryChange(e) {
    let countryStates = [];
    statesData.forEach((state) => {
      if (state["country_id"] === +e.target.value) {
        countryStates.push(state);
      }
    });
    this.setState({
      countryStates,
      contryId: e.target.value,
    });
  }
  onRegionChange(e) {
    console.warn(e.target.value)
    let countryCities = [];
    citiesData.forEach((city) => {
      if (city["state_code"] === e.target.value) {
        countryCities.push(city);
      }
    });
    this.setState({
      countryCities,
    });
  }
  getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState(
        {
          x: position.coords.latitude,
          y: position.coords.longitude
        }
      )

    });
  }
  render() {
    const { countryStates, countryCities, x, y } = this.state;
    return (
      <div className='container'>
        <div className='form-group'>
          <input
            name="firstName"
            type='text'
            className='form-control'
            placeholder='First Name'
            value={this.state.firstName}
            onChange={this.onChangeInput.bind(this)}
          ></input>
        </div>
        <div className='form-group'>
          <input
            name="lastName"
            type='text'
            className='form-control'
            placeholder='Last Name'
            value={this.state.lastName}
            onChange={this.onChangeInput.bind(this)}
          ></input>
        </div>

        <div className='form-group'>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='radio'
              name='delivery'
              value='no'
              onChange={this.onChangeInput.bind(this)}
              checked={this.state.delivery === "no"}
            ></input>
            <label className='form-check-label'> Delivery - no</label>
          </div>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='radio'
              name='delivery'
              value='yes'
              onChange={this.onChangeInput.bind(this)}
              checked={this.state.delivery === "yes"}
            ></input>
            <label className='form-check-label'> Delivery - yes</label>
          </div>
        </div>

        <div className='form-group'>
          <select
            className='form-control'
            onChange={this.onContryChange.bind(this)}>
            {countryData.map((country, index) => (
              <option value={country["id"]} key={`country-${index}`}>{country["name"]}</option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <select
            className='form-control'
            onChange={this.onRegionChange.bind(this)}
          >
            {countryStates.map((state, index) => (
              <option value={state["state_code"]} key={`state-${index}`}>{state["name"]}</option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <select
            className='form-control'
            onChange={this.onContryChange.bind(this)}
          >
            {countryCities.map((city, index) => (
              <option value={city["id"]} key={`city-${index}`}>{city["name"]}</option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <div className='form-check'>
            <input
              className='form-check-input'
              name="payment"
              type='radio'
              value='cash'
              onChange={this.onChangeInput.bind(this)}
              checked={this.state.payment === "cash"}
            ></input>
            <label className='form-check-label'> Payment - cash</label>
          </div>
          <div className='form-check'>
            <input
              className='form-check-input'
              name="payment"
              type='radio'
              value='credit card'
              onChange={this.onChangeInput.bind(this)}
              checked={this.state.payment === "credit card"}
            ></input>
            <label className='form-check-label'> Payment - credit card</label>
          </div>
        </div>
        <div className='form-group'>
          <div className='input-group'>
            <input
              name="cardNumber"
              type='text'
              className='form-control'
              placeholder='Card Number'
              value={this.state.cardNumber}
              onChange={this.onChangeInput.bind(this)}
            ></input>
            <input
              name="expirationDate"
              type='text'
              className='form-control'
              placeholder='Expiration Date'
              value={this.state.expirationDate}
              onChange={this.onChangeInput.bind(this)}
            ></input>
            <input
              name="cvv"
              type='text'
              className='form-control'
              placeholder='CVV'
              value={this.state.cvv}
              onChange={this.onChangeInput.bind(this)}
            ></input>
          </div>
        </div>

        <div className='form-group'>
          <button type='button' className='btn btn-success'>
            Success
          </button>
        </div>

        <div className='form-group'>
          <button type='button' className='btn btn-success' onClick={this.getLocation.bind(this)} >
            Location
          </button>
          <div>
            {`x:${x} y:${y}`}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
