import React, {useState} from 'react';
import axios from 'axios';
import './App.css';
import moment from 'moment';
import settingsImg from './settings_applications.svg';
import Modal from 'react-bootstrap/Modal';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Alert from 'react-bootstrap/Alert'
import Dropdown from 'react-bootstrap/Dropdown'

class Weather extends React.Component {
	componentDidMount() {
		this.timerID = setInterval(
		  () => this.tickHour(), 3600000
		);
	}
	componentWillUnmount() {
		clearInterval(this.timerID);
	}
	tickHour() {
		this.props.getLocation();
	}
	render() {
		const temp_unit = this.props.unit === "metric" ? "°C": "°F";
		const wind_unit = this.props.unit === "metric" ? "m/s": "mph";
		if (this.props.currentWeather)
		{
			const weather_symbol = this.props.currentWeather.weather.map((weatherdata, i) =>{
				return(
				<div className="col-auto" key={weatherdata.main}>
					<div><img className="weatherIcon" width="160" alt={weatherdata.main} src={"http://openweathermap.org/img/wn/" + weatherdata.icon + "@2x.png"}/></div>
					<div className="text-capitalize font-weight-bold" style={{lineHeight: "1"}}>{weatherdata.description}</div>
				</div>)
			})
			return (
				<div>
					<div className="currentWeather row justify-content-center">
						<div className="col-auto">
							<div className="row">{weather_symbol}</div>
							<div className="row">
								<div className='col small'>
								{this.props.currentWeather.name + ", " + this.props.currentWeather.sys.country}
								</div>
							</div>
						</div>
						<div className="col-auto">
							<div className="temp" style={{lineHeight: "1"}}>{this.props.currentWeather.main.temp.toFixed() + temp_unit}</div>
							<div className="wind" style={{lineHeight: "1"}}>{this.props.currentWeather.wind.speed + wind_unit}</div>
							<div className="small">
								<div className="small" style={{fontWeight: "normal"}}>Humidity: {this.props.currentWeather.main.humidity}%</div>
								<div className="small" style={{fontWeight: "normal"}}>Cloudiness: {this.props.currentWeather.clouds.all}%</div>
							</div>
						</div>
					</div>
				</div>);
		}
		else
			return null;
	}
}

class WeatherForecast extends React.Component {
	componentDidMount() {
		this.timerID = setInterval(
		  () => this.tickHour(), 3600000
		);
	}
	componentWillUnmount() {
		clearInterval(this.timerID);
	}
	tickHour() {
		this.props.getLocation();
	}
	render() {
		const temp_unit = this.props.unit === "metric" ? "°C": "°F";
		const wind_unit = this.props.unit === "metric" ? "m/s": "mph";
		
		if (this.props.forecastWeather)
		{
			let daySet = [];
			for (let i = 0; i < this.props.forecastWeather.list.length; i++)
			{
				const new_day = moment.unix(this.props.forecastWeather.list[i].dt).format('dddd Do');
                if (daySet.indexOf(new_day) === -1 && new Date(this.props.forecastWeather.list[i].dt * 1000).getHours() >= 8 && new Date(this.props.forecastWeather.list[i].dt * 1000).getHours() <= 18)
	                daySet.push(new_day);
			}
			const weatherCard = daySet.map((day, i) => {
				const hourCard = this.props.forecastWeather.list.filter((weatherdata, i) => 
					new Date(weatherdata.dt * 1000).getHours() >= 8 && new Date(weatherdata.dt * 1000).getHours() <= 18 && moment.unix(weatherdata.dt).format('dddd Do') === day
				).map((weatherdata, i) => {
					return (
					<div key={weatherdata.dt_txt} className="col flex-shrink-0">
						<div>{moment.unix(weatherdata.dt).format('h a')}</div>
						<div><img className="weatherIcon" alt={weatherdata.weather[0].main} src={"http://openweathermap.org/img/wn/" + weatherdata.weather[0].icon + ".png"}/></div>
						<div>{weatherdata.main.temp.toFixed() + temp_unit}</div>
						<div className="small">
							<div style={{fontWeight: "normal"}}>{weatherdata.wind.speed + wind_unit + " wind"}</div>
						</div>
					</div>
					);
				});
				return (
				<div key={day} className="border flex-shrink-0">
					<div>{day}</div>
					<div className="d-flex flex-row flex-nowrap">{hourCard}</div>
				</div>
                );
            }); 
			return (
				<div className="d-flex flex-row flex-nowrap" style={{overflowX: "scroll", overflowScrolling: "touch", WebkitOverflowScrolling: "touch", whiteSpace: "nowrap"}}>
					{weatherCard}
				</div>);
		}
		else
			return null;
	}
}

class Clock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {date: moment()};
	}
	componentDidMount() {
		this.timerID = setInterval(
		  () => this.tickSecond(), 1000
		);
	}
	componentWillUnmount() {
		clearInterval(this.timerID);
	}
	tickSecond() {
		this.setState({
		  date: moment()
		});
	}
	render() {
		return (
		<div>
			<div>
				<span className="time">{this.state.date.format('h:mm')}</span>
				<span className="date">{this.state.date.format(':ss a')}</span>
			</div>
			<div className="date col-auto">{this.state.date.format('dddd, MMMM Do YYYY')}</div>
		</div>
    );
  }
}

class SuggestDropdown extends React.Component {
	constructor(props) {
		super(props)
		this.delayTimer = null;
		this.state = {locationsuggestions: [], location_query: ""};
	}
	
	suggestLocations(query) {
		this.setState({location_query: query});
		if (this.props.apikey !== "" && query.length > 3)
		{
			clearTimeout(this.delayTimer);
			const that = this;
			this.delayTimer = setTimeout(function() {
				axios.get('https://api.openweathermap.org/data/2.5/find', {
					params: {
						q: query,
						type: "like",
						sort: "population",
						cnt: 10,
						appid: that.props.apikey
					}
				})
				.then((response) => {
					let locationsuggest = [];
					for (let i = 0; i < response.data.list.length; i++)
					{
						locationsuggest.push({ 	
							name: response.data.list[i].name + ", " + response.data.list[i].sys.country,
							cityid: response.data.list[i].id,
							latitude: response.data.list[i].coord.lat,
							longitude: response.data.list[i].coord.lon
						});
					}
					that.setState({locationsuggestions: locationsuggest });
				})
				.catch(function (error) {
					alert("When retrieving locations: " + error + ". " + 
					(error.response ? error.response.data.message: ""));
				});
				
			}, 500);
		} else
		{
			this.setState({locationsuggestions: [] });
		}
	}
	
	render() {
		const locationdropdowns = this.state.locationsuggestions.map((suggestion, i) => {
			return (
			<Dropdown.Item as="button" key={'dropdown_' + suggestion.latitude + ',' + suggestion.longitude}
			onClick={() => {this.props.onLocationChange("add", suggestion ); this.setState({location_query: "", locationsuggestions: []}) }}>
				{suggestion.name}&nbsp;&nbsp;&nbsp;&nbsp;<a target="_blank" rel="noopener noreferrer"
				key={'googlemap_' + suggestion.latitude + ',' + suggestion.longitude} onClick={(e) => e.stopPropagation()}
				href={"https://www.google.com/maps/search/?api=1&query=" + suggestion.latitude+"," + suggestion.longitude}>
				Check on map</a>
			</Dropdown.Item>);
		});
		return (
			<div>
				<FormControl value={this.state.location_query}
					onChange={(e) => this.suggestLocations(e.target.value)}
					placeholder="Add location <City, country code> (e.g. London, UK)" aria-label="Location"/>
				<Dropdown show={this.state.locationsuggestions.length > 0}>
					<Dropdown.Menu>{locationdropdowns}</Dropdown.Menu>
				</Dropdown>
			</div>
		)
	}
}

function Settings(props) {
		const [show, setShow] = useState(false);
		const handleClose = () => setShow(false);
		const handleShow = () => setShow(true);
		const showAlert = props.apikey === "";
		let input = props.apikey;
		const locationcards = props.locations.map((loc, i) => {
			return (
			<ListGroup.Item as="div" action active={loc.selected} key={'location_' + loc.latitude + ',' + loc.longitude}
			onClick={() => props.onLocationChange("select", loc)}>
				{loc.name}
				<Button as="div" key={"del_" + loc.latitude + ',' + loc.longitude}
				onClick={(e) => {props.onLocationChange("delete", loc); e.stopPropagation();}}
				size="sm" variant="danger" className="float-right p-0 pl-2 pr-2">Delete</Button>
			</ListGroup.Item>);
		});
		
		return (
		<div className="float-right">
			<a className="btn btn-sm" href="#settings" role="button" onClick={handleShow}>
				<img className="settings" src={settingsImg} alt="Settings"/>
			</a>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Settings</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>
						<h5>OpenWeatherMap API Key</h5>
						<InputGroup className="mb-3">
							<FormControl onChange={(e) => input = e.target.value} disabled={!showAlert}
							placeholder="Paste your API key here" aria-label="OpenWeatherMap API Key"/>
							<InputGroup.Append>
								<Button variant="secondary" onClick={() => props.onKeySave(input)}>Save</Button>
							</InputGroup.Append>
						</InputGroup>
						<Alert variant="warning" show={showAlert}><a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer">Sign up for a free API key to display weather.</a></Alert>
					</div>
					<div style={{display: showAlert ? 'none' : 'block' }}>
						<div>
							<h5>Location</h5>
							<div className="mb-2">
								<ListGroup>{locationcards}</ListGroup>
							</div>
							<SuggestDropdown apikey={props.apikey} onLocationChange={props.onLocationChange}/>
						</div>
						<div className="mt-3">
							<h5>Unit System</h5>
							<ButtonToolbar>
								<ToggleButtonGroup type="radio" name="options" defaultValue={"imperial"}
								onChange={(e) => props.onUnitChange(e)}>
									<ToggleButton className="btn-secondary" value={"metric"}>Metric</ToggleButton>
									<ToggleButton className="btn-secondary" value={"imperial"}>Imperial</ToggleButton>
								</ToggleButtonGroup>
							</ButtonToolbar>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</div>
    );
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.unitSystem = null;
		this.state = {
			locations: [],
			unitsystem: "imperial",
			currentWeather: null,
			apikey: ""
		};
	}
	handleLocationChange(action, loc) {
		const locations = this.state.locations.slice();
		if (action === "add" )
		{
			if (locations.filter((location) => { return loc.cityid === location.cityid; }).length === 0)
			{
				loc.selected = false;
				this.setState({ locations: locations.concat([loc])});	
			}
		}
		else {
			for (let i = 0; i < locations.length; i++) {
				if (locations[i].cityid === loc.cityid)
				{
					if (action === "delete")
					{
						const is_selected = locations[i].selected;
						locations.splice(i, 1);
						if (is_selected && locations.length > 0)
							locations[0].selected = true;
					}
					else if (action === "select")
					{
						locations[i].selected = true;
					}
				} else if (action === "select")
				{
					locations[i].selected = false;
				}
			}
			this.setState({ locations: locations});
			this.getLocation();
		}
	}
	getLocation() {
		let coords = { latitude: 51.476852, longitude: -0.000500, selected: true };
		if (this.state.locations.length === 0)
		{
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
				(positions) => {
					coords.latitude = positions.coords.latitude;
					coords.longitude = positions.coords.longitude;
					this.getWeather(coords);
				},
				(error) => {
					const that = this;
					axios.get('https://ipgeolocation.com/?json=1')
						.then(function (response) {
							const data = response.data.coords;
							coords.latitude = Number(data.split(",")[0]);
							coords.longitude = Number(data.split(",")[1]);
							that.getWeather(coords);
						})
						.catch(function (error) {
							axios.get('https://ipapi.co/json')
							.then(function (response) {
								const data = response.data;
								coords.latitude = Number(data.latitude);
								coords.longitude = Number(data.longitude);
								that.getWeather(coords);
							})
							.catch(function (error) {
								alert("When retrieving IP location: " + error + ". " + 
								(error.response ? error.response.data.message: ""));
								that.getWeather(coords);
							});
						});
				});
			};
		} else 
		{
			for (let i = 0; i < this.state.locations.length;  i++)
			{
				if (this.state.locations[i].selected)
				{
					coords.latitude = this.state.locations[i].latitude;
					coords.longitude = this.state.locations[i].longitude;
					break;
				}
			}
			this.getWeather(coords);
		}
	}
	getWeather(coords) {
		const apikey = this.state.apikey !== "" ? this.state.apikey: this.apikey;
		const unitsystem = this.unitSystem === null ? this.state.unitsystem: this.unitSystem;
		if (apikey !== "" && apikey !== null && apikey !== undefined)
		{
			const that = this;
			axios.all([
			axios.get('https://api.openweathermap.org/data/2.5/weather', {
				params: {
					lat: coords.latitude,
					lon: coords.longitude,
					appid: apikey,
					units: unitsystem
				}
			}),
			axios.get('https://api.openweathermap.org/data/2.5/forecast', {
				params: {
					lat: coords.latitude,
					lon: coords.longitude,
					appid: apikey,
					units: unitsystem
				}
			})])
			.then(axios.spread((responsecurrent, responseforecast) => {
				let locations = that.state.locations.slice();
				if (locations.filter((location) => 
				{ return location.cityid === responsecurrent.data.id; }).length === 0)
				{
					const newcoords = coords;
					newcoords.name = responsecurrent.data.name + ", " + responsecurrent.data.sys.country;
					newcoords.cityid = responsecurrent.data.id;
					locations = locations.concat([newcoords]);
				}
				that.setState({ 
					locations: locations,
					apikey: apikey,
					unitsystem: unitsystem,
					currentWeather: responsecurrent.data, 
					forecastWeather: responseforecast.data });
			}))
			.catch(function (error) {
				alert("When retrieving weather: " + error + ". " + 
				(error.response ? error.response.data.message: ""));
			});
		}
	}
	handleKeySave(keyInput) {
		this.apikey = keyInput;
		this.getLocation();
	}
	handleUnitChange(newUnit) {
		this.unitSystem = newUnit;
		this.getLocation();
	};

	render() {
		return (
		<div className="App">
			<Settings 
			locations={this.state.locations} apikey={this.state.apikey}
			onKeySave={(keyInput) => this.handleKeySave(keyInput)} 
			onUnitChange={(newUnit) => this.handleUnitChange(newUnit)}
			onLocationChange={(action, location) => this.handleLocationChange(action, location)}
			/>
			<div className="Current container-fluid">
				<header>
					<Clock state={this.state.unitsystem} />
					<Weather className="col-6 text-right" 
					currentWeather={this.state.currentWeather}
					getLocation={() => this.getLocation() } 
					unit={this.state.unitsystem}/>
				</header>
			</div>
			<div className="Forecast container-fluid">
				<WeatherForecast forecastWeather={this.state.forecastWeather}
					getLocation={() => this.getLocation() } 
					unit={this.state.unitsystem}/>
			</div>
			<div className="text-muted small">Nightstand icon, made from <a href="http://www.onlinewebfonts.com/icon">Icon Fonts</a>, is licensed by CC BY 3.0</div>
		</div>
		);
	}
}

export default App;
			