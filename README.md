# Nightstand App

A simple web app to turn my old little-used tablet into a makeshift clock & weather displayer on my nightstand, to show time and weather.  Many weather apps don't show the time, and many clock apps don't show the weather in large enough fonts, so I created my own! Shows key information in large and bold so one can see the time and weather wherever in the room. Example screenshots are below! Also check it out [here](https://sharonchoong.github.io/nightstand/).

![Nightstand display](/images/nightstand.png)

![Changing settings](/images/settings.png)

I'm using the OpenWeatherMap API for weather data.  Since Github Pages websites are static, it's not possible to completely hide the API key server-side.  As an alternative, to see the weather, the app requires the user to input the API key manually in the settings for first use; a little inconvenient.  [Signing up for a key is free](https://openweathermap.org/api).

This project was written with [React.js](https://reactjs.org/) and has responsive design from [Bootstrap](https://getbootstrap.com). It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), with time and date formatted by [moment.js](https://momentjs.com/).
