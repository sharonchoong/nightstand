import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import moment from "moment";
import settingsImg from "./settings_applications.svg";
import Modal from "react-bootstrap/Modal";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";

class WeatherIcon extends React.Component {
  iconPrefix = window.location.hostname === "localhost" ? "nightstand/" : "";
  weatherIcons = {
    0: { description: "Clear sky", imgSrc: this.iconPrefix + (this.props.isNight? "icons/night.svg" : "icons/day.svg") },
    1: {
      description: "Mainly clear",
      imgSrc: this.iconPrefix + (this.props.isNight? "icons/cloudy-night-1.svg" : "icons/cloudy-day-1.svg"),
    },
    2: {
      description: "Partly cloudy",
      imgSrc: this.iconPrefix + (this.props.isNight? "icons/cloudy-night-3.svg" : "icons/cloudy-day-3.svg"),
    },
    3: {
      description: "Overcast",
      imgSrc: this.iconPrefix + (this.props.isNight? "icons/cloudy.svg" : "icons/cloudy.svg"),
    },
    45: {
      description: "Fog",
      imgSrc: this.iconPrefix + "icons/fog.png",
    },
    48: {
      description: "Depositing rime fog",
      imgSrc: this.iconPrefix + "icons/fog.png",
    },
    51: {
      description: "Light drizzle",
      imgSrc: this.iconPrefix + (this.props.isNight? "icons/rainy-4.svg" : "icons/rainy-2.svg"),
    },
    53: {
      description: "Moderate drizzle",
      imgSrc: this.iconPrefix + (this.props.isNight? "icons/rainy-5.svg" : "icons/rainy-3.svg"),
    },
    55: {
      description: "Dense drizzle",
      imgSrc: this.iconPrefix + "icons/rainy-6.svg",
    },
    56: {
      description: "Light freezing drizzle",
      imgSrc: this.iconPrefix + (this.props.isNight? "icons/rainy-5.svg" : "icons/rainy-3.svg"),
    },
    57: {
      description: "Dense freezing drizzle",
      imgSrc: this.iconPrefix + "icons/rainy-6.svg",
    },
    61: {
      description: "Slight rain",
      imgSrc: this.iconPrefix + "icons/rainy-4.svg",
    },
    63: {
      description: "Moderate rain",
      imgSrc: this.iconPrefix + "icons/rainy-5.svg",
    },
    65: {
      description: "Heavy rain",
      imgSrc: this.iconPrefix + "icons/rainy-6.svg",
    },
    66: {
      description: "Light freezing rain",
      imgSrc: this.iconPrefix + "icons/rainy-5.svg",
    },
    67: {
      description: "Heavy freezing rain",
      imgSrc: this.iconPrefix + "icons/rainy-6.svg",
    },
    71: {
      description: "Slight snow",
      imgSrc: this.iconPrefix + "icons/snowy-4.svg",
    },
    73: {
      description: "Moderate snow",
      imgSrc: this.iconPrefix + "icons/snowy-5.svg",
    },
    75: {
      description: "Heavy snow",
      imgSrc: this.iconPrefix + "icons/snowy-6.svg",
    },
    77: {
      description: "Snow grains",
      imgSrc: this.iconPrefix + "icons/rainy-7.svg",
    },
    80: {
      description: "Slight rain showers",
      imgSrc: this.iconPrefix + (this.props.isNight? "icons/rainy-4.svg" : "icons/rainy-2.svg"),
    },
    81: {
      description: "Moderate rain showers",
      imgSrc: this.iconPrefix + "icons/rainy-5.svg",
    },
    82: {
      description: "Violent rain showers",
      imgSrc: this.iconPrefix + "icons/rainy-6.svg",
    },
    85: {
      description: "Slight snow showers",
      imgSrc: this.iconPrefix + "icons/snowy-4.svg",
    },
    86: {
      description: "Heavy snow showers",
      imgSrc: this.iconPrefix + "icons/snowy-6.svg",
    },
    95: {
      description: "Thunderstorm",
      imgSrc: this.iconPrefix + "icons/thunder.svg",
    },
    96: {
      description: "Thunderstorm, slight hail",
      imgSrc: this.iconPrefix + "icons/thunder.svg",
    },
    99: {
      description: "Thunderstorm, heavy hail",
      imgSrc: this.iconPrefix + "icons/thunder.svg",
    },
  };
  render() {
    return (
      <div className="col-auto" style={{ maxWidth: "300px" }}>
        <div>
          <img
            className="weatherIcon"
            height={this.props.height ? this.props.height : "150"}
            src={this.weatherIcons[this.props.weatherCode].imgSrc}
          />
        </div>
        {this.props.includeDescription ? (
          <div
            className="text-capitalize font-weight-bold small"
            style={{ lineHeight: "1" }}
          >
            {this.weatherIcons[this.props.weatherCode].description}
          </div>
        ) : undefined}
      </div>
    );
  }
}

class Weather extends React.Component {
  componentDidMount() {
    this.timerID = setInterval(() => this.tickHour(), 3600000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tickHour() {
    this.props.getLocation();
  }
  render() {
    const temp_unit = this.props.unit === "metric" ? "°C" : "°F";
    const wind_unit = this.props.unit === "metric" ? "k/h" : "mph";
    if (this.props.currentWeather) {
      return (
        <div>
          <div className="currentWeather row justify-content-center">
            <div className="col-auto">
              <div>
                <WeatherIcon
                  weatherCode={this.props.currentWeather.weather_code}
                  includeDescription={true}
                  isNight={moment().hour() > 18 || moment().hour() < 6}
                />
              </div>
              <div className="row">
                <div className="temp_small" style={{ lineHeight: "1" }}>
                  {this.props.dayWeather.temperature_2m_min &&
                  this.props.dayWeather.temperature_2m_max
                    ? this.props.dayWeather.temperature_2m_min.toFixed() +
                      temp_unit +
                      " | " +
                      this.props.dayWeather.temperature_2m_max.toFixed() +
                      temp_unit
                    : ""}
                </div>
              </div>
              <div className="row">
                <div className="small col">
                  <div className="small" style={{ fontWeight: "normal" }}>
                    {(this.props.dayWeather.precipitation_probability_max
                      ? "Rain/snow: " +
                        this.props.dayWeather.precipitation_probability_max +
                        "%"
                      : "") +
                      (this.props.dayWeather.wind_speed_10m_min &&
                      this.props.dayWeather.wind_speed_10m_max
                        ? (this.props.dayWeather.precipitation_probability_max ? ", " : "") + "wind: " +
                          this.props.dayWeather.wind_speed_10m_min.toFixed() +
                          "-" +
                          this.props.dayWeather.wind_speed_10m_max.toFixed() +
                          wind_unit
                        : "")}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-auto">
              <div className="small">{this.props.selectedLocationName}</div>
              <div className="temp" style={{ lineHeight: "1" }}>
                {this.props.currentWeather.temperature_2m
                  ? this.props.currentWeather.temperature_2m.toFixed() +
                    temp_unit
                  : ""}
              </div>
              <div className="small" style={{ lineHeight: "1" }}>
                {this.props.currentWeather.apparent_temperature
                  ? "Feels like " +
                    this.props.currentWeather.apparent_temperature.toFixed() +
                    temp_unit
                  : ""}
              </div>
              <div className="wind" style={{ lineHeight: "1" }}>
                {this.props.currentWeather.wind_speed_10m.toFixed() + wind_unit}
              </div>
              <div className="small" style={{ lineHeight: "1" }}>
                {"(gusts: " +
                  this.props.currentWeather.wind_gusts_10m.toFixed() +
                  wind_unit +
                  ")"}
              </div>
            </div>
          </div>
        </div>
      );
    } else return null;
  }
}

class WeatherForecast extends React.Component {
  componentDidMount() {
    this.timerID = setInterval(() => this.tickHour(), 1800000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tickHour() {
    this.props.getLocation();
  }
  render() {
    const temp_unit = this.props.unit === "metric" ? "°C" : "°F";
    const wind_unit = this.props.unit === "metric" ? "k/h" : "mph";

    if (this.props.forecastWeather) {
      const hourlyForecast = this.props.forecastWeather.hourly;
      let daySet = {};
      for (let i = 0; i < hourlyForecast.time.length; i++) {
        const new_day = moment(hourlyForecast.time[i]).format("dddd Do");
        if (
          moment(hourlyForecast.time[i]).valueOf() - Date.now() > 0 &&
          moment(hourlyForecast.time[i]).hour() >= 6 &&
          moment(hourlyForecast.time[i]).hour() <= 21
        ) {
          if (!daySet[new_day]) {
            const dailyWeatherIndex =
              this.props.forecastWeather.daily.time.indexOf(
                moment(hourlyForecast.time[i]).format("YYYY-MM-DD"),
              );
            daySet[new_day] = {
              indices: [],
              high: this.props.forecastWeather.daily.temperature_2m_max[
                dailyWeatherIndex
              ],
              low: this.props.forecastWeather.daily.temperature_2m_min[
                dailyWeatherIndex
              ],
            };
          }
          daySet[new_day].indices.push(i);
        }
      }
      const weatherDayCard = Object.keys(daySet).map((day) => {
        const hourCard = daySet[day].indices.map((index) => {
          return (
            hourlyForecast.temperature_2m[index] && (
              <div key={day + "_" + index} className="col flex-shrink-0">
                <WeatherIcon
                  weatherCode={hourlyForecast.weather_code[index]}
                  height={"64"}
                  includeDescription={false}
                  isNight={moment(hourlyForecast.time[index]).hour() > 18 || moment(hourlyForecast.time[index]).hour() < 6}
                />
                <div>{moment(hourlyForecast.time[index]).format("h a")}</div>
                <div>
                  {hourlyForecast.temperature_2m[index]
                    ? hourlyForecast.temperature_2m[index].toFixed() + temp_unit
                    : ""}
                </div>
                <div className="small">
                  <div style={{ fontWeight: "normal" }}>
                    {hourlyForecast.wind_speed_10m[index] ? hourlyForecast.wind_speed_10m[index].toFixed() + wind_unit + " wind" : ""}
                  </div>
                  <div style={{ fontWeight: "normal" }}>
                    {hourlyForecast.precipitation_probability[index] +
                      "% rain/snow"}
                  </div>
                </div>
              </div>
            )
          );
        });
        return (
          <div key={day} className="border flex-shrink-0 pl-2 pr-2">
            <b>
              {day +
                (daySet[day].low && daySet[day].high
                  ? " (" +
                    daySet[day].low.toFixed() +
                    temp_unit +
                    " - " +
                    daySet[day].high.toFixed() +
                    temp_unit +
                    ")"
                  : "")}
            </b>
            <div className="d-flex flex-row flex-nowrap">{hourCard}</div>
          </div>
        );
      });
      return (
        <div
          className="d-flex flex-row flex-nowrap"
          style={{
            overflowX: "scroll",
            overflowScrolling: "touch",
            WebkitOverflowScrolling: "touch",
            whiteSpace: "nowrap",
          }}
        >
          {weatherDayCard}
        </div>
      );
    } else return null;
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: moment() };
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.tickSecond(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tickSecond() {
    this.setState({
      date: moment(),
    });
  }
  render() {
    return (
      <div>
        <div>
          <span className="time">{this.state.date.format("h:mm")}</span>
          <span className="date">{this.state.date.format(":ss a")}</span>
        </div>
        <div className="date col-auto">
          {this.state.date.format("dddd, MMM Do YYYY")}
        </div>
      </div>
    );
  }
}

class SuggestDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.delayTimer = null;
    this.state = { locationsuggestions: [], location_query: "" };
  }

  suggestLocations(query) {
    this.setState({ location_query: query });
    if (query.length > 3) {
      clearTimeout(this.delayTimer);
      const that = this;
      this.delayTimer = setTimeout(function () {
        axios
          .get("https://geocoding-api.open-meteo.com/v1/search", {
            params: {
              name: query,
              count: 10,
              language: "en",
              format: "json",
            },
          })
          .then((response) => {
            let locationsuggest = [];
            const results = response.data.results;
            for (let i = 0; i < results.length; i++) {
              locationsuggest.push({
                name:
                  results[i].name +
                  (results[i].admin1 ? ", " + results[i].admin1 : "") +
                  ", " +
                  results[i].country,
                shortname: results[i].name,
                cityid: results[i].id,
                latitude: results[i].latitude,
                longitude: results[i].longitude,
                timezone: results[i].timezone,
              });
            }
            that.setState({ locationsuggestions: locationsuggest });
          })
          .catch(function (error) {
            alert(
              "When retrieving locations: " +
                JSON.stringify(error) +
                ". " +
                (error.response ? error.response.message : ""),
            );
          });
      }, 500);
    } else {
      this.setState({ locationsuggestions: [] });
    }
  }

  render() {
    const locationdropdowns = this.state.locationsuggestions.map(
      (suggestion, i) => {
        return (
          <Dropdown.Item
            as="div"
            key={"dropdown_" + suggestion.latitude + "," + suggestion.longitude}
            onClick={() => {
              this.props.onLocationChange("add", suggestion);
              this.setState({ location_query: "", locationsuggestions: [] });
            }}
          >
            {suggestion.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "small" }}
              key={
                "googlemap_" + suggestion.latitude + "," + suggestion.longitude
              }
              onClick={(e) => e.stopPropagation()}
              href={
                "https://www.google.com/maps/search/?api=1&query=" +
                suggestion.latitude +
                "," +
                suggestion.longitude
              }
            >
              Check on map
            </a>
          </Dropdown.Item>
        );
      },
    );
    return (
      <div>
        <FormControl
          value={this.state.location_query}
          onChange={(e) => this.suggestLocations(e.target.value)}
          placeholder="Add location <City, country code> (e.g. London, UK)"
          aria-label="Location"
        />
        <Dropdown show={this.state.locationsuggestions.length > 0}>
          <Dropdown.Toggle
            as="div"
            style={{ visibility: "hidden", height: "1px" }}
          ></Dropdown.Toggle>
          <Dropdown.Menu>{locationdropdowns}</Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

function Settings(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const locationcards = props.locations.map((loc, i) => {
    return (
      <ListGroup.Item
        as="div"
        action
        active={loc.selected}
        key={"location_" + loc.latitude + "," + loc.longitude}
        onClick={() => props.onLocationChange("select", loc)}
      >
        {loc.name}
        <Button
          as="div"
          key={"del_" + loc.latitude + "," + loc.longitude}
          onClick={(e) => {
            props.onLocationChange("delete", loc);
            e.stopPropagation();
          }}
          size="sm"
          variant="danger"
          className="float-right p-0 pl-2 pr-2"
        >
          Delete
        </Button>
      </ListGroup.Item>
    );
  });

  return (
    <div className="float-right">
      <a
        className="btn btn-sm"
        href="#settings"
        role="button"
        onClick={handleShow}
      >
        <img className="settings" src={settingsImg} alt="Settings" />
      </a>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <h5>Location</h5>
              <div className="mb-2">
                <ListGroup>{locationcards}</ListGroup>
              </div>
              <SuggestDropdown onLocationChange={props.onLocationChange} />
            </div>
            <div className="mt-3">
              <h5>Unit System</h5>
              <ButtonToolbar>
                <ToggleButtonGroup
                  type="radio"
                  name="options"
                  defaultValue={props.unit}
                  onChange={(e) => props.onUnitChange(e)}
                >
                  <ToggleButton className="btn-secondary" value={"metric"}>
                    Metric
                  </ToggleButton>
                  <ToggleButton className="btn-secondary" value={"imperial"}>
                    Imperial
                  </ToggleButton>
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
      selectedLocationName: "",
      unitsystem: "imperial",
      currentWeather: null,
      forecastWeather: null,
    };
  }
  handleLocationChange(action, loc) {
    const locations = this.state.locations.slice();
    if (action === "add") {
      if (
        locations.filter((location) => {
          return loc.cityid === location.cityid;
        }).length === 0
      ) {
        loc.selected = false;
        this.setState({ locations: locations.concat([loc]) });
      }
    } else {
      for (let i = 0; i < locations.length; i++) {
        if (locations[i].cityid === loc.cityid) {
          if (action === "delete") {
            const is_selected = locations[i].selected;
            locations.splice(i, 1);
            if (is_selected && locations.length > 0)
              locations[0].selected = true;
          } else if (action === "select") {
            locations[i].selected = true;
          }
        } else if (action === "select") {
          locations[i].selected = false;
        }
      }
      this.setState({ locations: locations });
      this.getLocation();
    }
  }
  getLocation() {
    let coords = { latitude: 51.476852, longitude: -0.0005, selected: true };
    if (this.state.locations.length === 0) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (positions) => {
            coords.latitude = positions.coords.latitude;
            coords.longitude = positions.coords.longitude;
            this.getWeather(coords);
          },
          (error) => {
            const that = this;
            axios
              .get("https://ipapi.co/json")
              .then(function (response) {
                const data = response.data;
                coords.latitude = Number(data.latitude);
                coords.longitude = Number(data.longitude);
                that.getWeather(coords);
              })
              .catch(function (error) {
                alert(
                  "When retrieving IP location: " +
                    error +
                    ". " +
                    (error.response ? error.response.data.message : ""),
                );
                that.getWeather(coords);
              });
          },
        );
      }
    } else {
      let selected = false;
      for (let i = 0; i < this.state.locations.length; i++) {
        if (this.state.locations[i].selected) {
          coords.latitude = this.state.locations[i].latitude;
          coords.longitude = this.state.locations[i].longitude;
          coords.timezone = this.state.locations[i].timezone;
          this.setState({
            selectedLocationName: this.state.locations[i].shortname,
          });
          selected = true;
          break;
        }
      }
      if (selected) {
        this.getWeather(coords);
      }
    }
  }
  getWeather(coords) {
    const unitsystem =
      this.unitSystem === null ? this.state.unitsystem : this.unitSystem;
    const that = this;
    axios
      .get("https://api.open-meteo.com/v1/forecast", {
        params: {
          latitude: coords.latitude,
          longitude: coords.longitude,
          forecast_days: 16,
          wind_speed_unit: unitsystem === "metric" ? undefined : "mph",
          temperature_unit: unitsystem === "metric" ? undefined : "fahrenheit",
          precipitation_unit: unitsystem === "metric" ? undefined : "inch",
          timezone: coords.timezone,
          daily: [
            "temperature_2m_max",
            "temperature_2m_min",
            "wind_speed_10m_min",
            "wind_speed_10m_max",
            "precipitation_probability_max",
          ].join(","),
          hourly: [
            "temperature_2m",
            "weather_code",
            "precipitation_probability",
            "wind_speed_10m",
          ].join(","),
          current: [
            "weather_code",
            "temperature_2m",
            "apparent_temperature",
            "wind_gusts_10m",
            "wind_speed_10m",
          ].join(","),
        },
      })
      .then((res) => {
        const response = res.data;
        let daily = {};
        for (let i = 0; i < response.daily.time.length; i++) {
          if (
            moment(response.daily.time[i]).format("dddd Do") ===
            moment().format("dddd Do")
          ) {
            for (const key in response.daily) {
              daily[key] = response.daily[key][i];
            }
            break;
          }
        }
        that.setState({
          unitsystem: unitsystem,
          currentWeather: response.current,
          dayWeather: daily,
          forecastWeather: { hourly: response.hourly, daily: response.daily },
        });
      })
      .catch(function (error) {
        alert(
          "When retrieving weather: " +
            error +
            ". " +
            (error.response ? error.response.data.message : ""),
        );
      });
  }
  handleUnitChange(newUnit) {
    this.unitSystem = newUnit;
    this.getLocation();
  }

  render() {
    return (
      <div className="App">
        <Settings
          locations={this.state.locations}
          onUnitChange={(newUnit) => this.handleUnitChange(newUnit)}
          unit={this.state.unitsystem}
          onLocationChange={(action, location) =>
            this.handleLocationChange(action, location)
          }
        />
        <div className="Current container-fluid">
          <header>
            <Clock state={this.state.unitsystem} />
            <Weather
              className="col-6 text-right"
              dayWeather={this.state.dayWeather}
              currentWeather={this.state.currentWeather}
              getLocation={() => this.getLocation()}
              selectedLocationName={this.state.selectedLocationName}
              unit={this.state.unitsystem}
            />
          </header>
        </div>
        <div className="Forecast container-fluid">
          <WeatherForecast
            forecastWeather={this.state.forecastWeather}
            getLocation={() => this.getLocation()}
            unit={this.state.unitsystem}
          />
        </div>
        <div className="text-muted small">
          Nightstand icon, made from{" "}
          <a href="http://www.onlinewebfonts.com/icon">Icon Fonts</a>, is
          licensed by CC BY 3.0.  
          <a target="_blank" href="https://icons8.com/icon/5JFKFoWQfT74/fog"> Fog</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
        </div>
      </div>
    );
  }
}

export default App;
