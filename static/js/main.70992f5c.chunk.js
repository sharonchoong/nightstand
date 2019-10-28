(this.webpackJsonpnightstand=this.webpackJsonpnightstand||[]).push([[0],{109:function(e,t,a){},139:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(11),o=a.n(r),l=(a(90),a(91),a(83)),s=a(28),c=a(29),u=a(32),m=a(30),d=a(33),h=a(20),p=a.n(h),g=(a(109),a(31)),f=a.n(g),v=a(74),y=a.n(v),E=a(36),k=a(84),b=a(34),w=a(82),N=a(52),W=a(54),C=a(21),O=a(53),j=a(81),S=a(42),I=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.timerID=setInterval((function(){return e.tickHour()}),36e5)}},{key:"componentWillUnmount",value:function(){clearInterval(this.timerID)}},{key:"tickHour",value:function(){this.props.getLocation()}},{key:"render",value:function(){var e="metric"===this.props.unit?"\xb0C":"\xb0F",t="metric"===this.props.unit?"m/s":"mph";if(this.props.currentWeather){var a=this.props.currentWeather.weather.map((function(e,t){return i.a.createElement("div",{className:"col-auto",key:e.main},i.a.createElement("div",null,i.a.createElement("img",{className:"weatherIcon",width:"160",alt:e.main,src:"http://openweathermap.org/img/wn/"+e.icon+"@2x.png"})),i.a.createElement("div",{className:"text-capitalize font-weight-bold",style:{lineHeight:"1"}},e.description))}));return i.a.createElement("div",null,i.a.createElement("div",{className:"currentWeather row justify-content-center"},i.a.createElement("div",{className:"col-auto"},i.a.createElement("div",{className:"row"},a),i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"col small"},this.props.currentWeather.name+", "+this.props.currentWeather.sys.country))),i.a.createElement("div",{className:"col-auto"},i.a.createElement("div",{className:"temp",style:{lineHeight:"1"}},this.props.currentWeather.main.temp.toFixed()+e),i.a.createElement("div",{className:"wind",style:{lineHeight:"1"}},this.props.currentWeather.wind.speed+t),i.a.createElement("div",{className:"small"},i.a.createElement("div",{className:"small",style:{fontWeight:"normal"}},"Humidity: ",this.props.currentWeather.main.humidity,"%"),i.a.createElement("div",{className:"small",style:{fontWeight:"normal"}},"Cloudiness: ",this.props.currentWeather.clouds.all,"%")))))}return null}}]),t}(i.a.Component),L=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.timerID=setInterval((function(){return e.tickHour()}),36e5)}},{key:"componentWillUnmount",value:function(){clearInterval(this.timerID)}},{key:"tickHour",value:function(){this.props.getLocation()}},{key:"render",value:function(){var e=this,t="metric"===this.props.unit?"\xb0C":"\xb0F",a="metric"===this.props.unit?"m/s":"mph";if(this.props.forecastWeather){for(var n=[],r=0;r<this.props.forecastWeather.list.length;r++){var o=f.a.unix(this.props.forecastWeather.list[r].dt).format("dddd Do");-1===n.indexOf(o)&&new Date(1e3*this.props.forecastWeather.list[r].dt).getHours()>=8&&new Date(1e3*this.props.forecastWeather.list[r].dt).getHours()<=18&&n.push(o)}var l=n.map((function(n,r){var o=e.props.forecastWeather.list.filter((function(e,t){return new Date(1e3*e.dt).getHours()>=8&&new Date(1e3*e.dt).getHours()<=18&&f.a.unix(e.dt).format("dddd Do")===n})).map((function(e,n){return i.a.createElement("div",{key:e.dt_txt,className:"col flex-shrink-0"},i.a.createElement("div",null,f.a.unix(e.dt).format("h a")),i.a.createElement("div",null,i.a.createElement("img",{className:"weatherIcon",alt:e.weather[0].main,src:"http://openweathermap.org/img/wn/"+e.weather[0].icon+".png"})),i.a.createElement("div",null,e.main.temp.toFixed()+t),i.a.createElement("div",{className:"small"},i.a.createElement("div",{style:{fontWeight:"normal"}},e.wind.speed+a+" wind")))}));return i.a.createElement("div",{key:n,className:"border flex-shrink-0"},i.a.createElement("div",null,n),i.a.createElement("div",{className:"d-flex flex-row flex-nowrap"},o))}));return i.a.createElement("div",{className:"d-flex flex-row flex-nowrap",style:{overflowX:"scroll",overflowScrolling:"touch",WebkitOverflowScrolling:"touch",whiteSpace:"nowrap"}},l)}return null}}]),t}(i.a.Component),x=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).state={date:f()()},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.timerID=setInterval((function(){return e.tickSecond()}),1e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.timerID)}},{key:"tickSecond",value:function(){this.setState({date:f()()})}},{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement("div",null,i.a.createElement("span",{className:"time"},this.state.date.format("h:mm")),i.a.createElement("span",{className:"date"},this.state.date.format(":ss a"))),i.a.createElement("div",{className:"date col-auto"},this.state.date.format("dddd, MMMM Do YYYY")))}}]),t}(i.a.Component),D=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).delayTimer=null,a.state={locationsuggestions:[],location_query:""},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"suggestLocations",value:function(e){if(this.setState({location_query:e}),""!==this.props.apikey&&e.length>3){clearTimeout(this.delayTimer);var t=this;this.delayTimer=setTimeout((function(){p.a.get("https://api.openweathermap.org/data/2.5/find",{params:{q:e,type:"like",sort:"population",cnt:10,appid:t.props.apikey}}).then((function(e){for(var a=[],n=0;n<e.data.list.length;n++)a.push({name:e.data.list[n].name+", "+e.data.list[n].sys.country,cityid:e.data.list[n].id,latitude:e.data.list[n].coord.lat,longitude:e.data.list[n].coord.lon});t.setState({locationsuggestions:a})})).catch((function(e){alert("When retrieving locations: "+e+". "+(e.response?e.response.data.message:""))}))}),500)}else this.setState({locationsuggestions:[]})}},{key:"render",value:function(){var e=this,t=this.state.locationsuggestions.map((function(t,a){return i.a.createElement(S.a.Item,{as:"button",key:"dropdown_"+t.latitude+","+t.longitude,onClick:function(){e.props.onLocationChange("add",t),e.setState({location_query:"",locationsuggestions:[]})}},t.name,"\xa0\xa0\xa0\xa0",i.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",key:"googlemap_"+t.latitude+","+t.longitude,onClick:function(e){return e.stopPropagation()},href:"https://www.google.com/maps/search/?api=1&query="+t.latitude+","+t.longitude},"Check on map"))}));return i.a.createElement("div",null,i.a.createElement(W.a,{value:this.state.location_query,onChange:function(t){return e.suggestLocations(t.target.value)},placeholder:"Add location <City, country code> (e.g. London, UK)","aria-label":"Location"}),i.a.createElement(S.a,{show:this.state.locationsuggestions.length>0},i.a.createElement(S.a.Menu,null,t)))}}]),t}(i.a.Component);function H(e){var t=Object(n.useState)(!1),a=Object(l.a)(t,2),r=a[0],o=a[1],s=""===e.apikey,c=e.apikey,u=e.locations.map((function(t,a){return i.a.createElement(O.a.Item,{as:"div",action:!0,active:t.selected,key:"location_"+t.latitude+","+t.longitude,onClick:function(){return e.onLocationChange("select",t)}},t.name,i.a.createElement(C.a,{as:"div",key:"del_"+t.latitude+","+t.longitude,onClick:function(a){e.onLocationChange("delete",t),a.stopPropagation()},size:"sm",variant:"danger",className:"float-right p-0 pl-2 pr-2"},"Delete"))}));return i.a.createElement("div",{className:"float-right"},i.a.createElement("a",{className:"btn btn-sm",href:"#settings",role:"button",onClick:function(){return o(!0)}},i.a.createElement("img",{className:"settings",src:y.a,alt:"Settings"})),i.a.createElement(E.a,{show:r,onHide:function(){return o(!1)}},i.a.createElement(E.a.Header,{closeButton:!0},i.a.createElement(E.a.Title,null,"Settings")),i.a.createElement(E.a.Body,null,i.a.createElement("div",null,i.a.createElement("h5",null,"OpenWeatherMap API Key"),i.a.createElement(N.a,{className:"mb-3"},i.a.createElement(W.a,{onChange:function(e){return c=e.target.value},disabled:!s,placeholder:"Paste your API key here","aria-label":"OpenWeatherMap API Key"}),i.a.createElement(N.a.Append,null,i.a.createElement(C.a,{variant:"secondary",onClick:function(){return e.onKeySave(c)}},"Save"))),i.a.createElement(j.a,{variant:"warning",show:s},i.a.createElement("a",{href:"https://openweathermap.org/api",target:"_blank",rel:"noopener noreferrer"},"Sign up for a free API key to display weather."))),i.a.createElement("div",{style:{display:s?"none":"block"}},i.a.createElement("div",null,i.a.createElement("h5",null,"Location"),i.a.createElement("div",{className:"mb-2"},i.a.createElement(O.a,null,u)),i.a.createElement(D,{apikey:e.apikey,onLocationChange:e.onLocationChange})),i.a.createElement("div",{className:"mt-3"},i.a.createElement("h5",null,"Unit System"),i.a.createElement(w.a,null,i.a.createElement(k.a,{type:"radio",name:"options",defaultValue:"imperial",onChange:function(t){return e.onUnitChange(t)}},i.a.createElement(b.a,{className:"btn-secondary",value:"metric"},"Metric"),i.a.createElement(b.a,{className:"btn-secondary",value:"imperial"},"Imperial"))))))))}var _=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).unitSystem=null,a.state={locations:[],unitsystem:"imperial",currentWeather:null,apikey:""},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"handleLocationChange",value:function(e,t){var a=this.state.locations.slice();if("add"===e)0===a.filter((function(e){return t.cityid===e.cityid})).length&&(t.selected=!1,this.setState({locations:a.concat([t])}));else{for(var n=0;n<a.length;n++)if(a[n].cityid===t.cityid)if("delete"===e){var i=a[n].selected;a.splice(n,1),i&&a.length>0&&(a[0].selected=!0)}else"select"===e&&(a[n].selected=!0);else"select"===e&&(a[n].selected=!1);this.setState({locations:a}),this.getLocation()}}},{key:"getLocation",value:function(){var e=this,t={latitude:51.476852,longitude:-5e-4,selected:!0};if(0===this.state.locations.length)navigator.geolocation&&navigator.geolocation.getCurrentPosition((function(a){t.latitude=a.coords.latitude,t.longitude=a.coords.longitude,e.getWeather(t)}),(function(a){var n=e;p.a.get("https://ipgeolocation.com/?json=1").then((function(e){var a=e.data.coords;t.latitude=Number(a.split(",")[0]),t.longitude=Number(a.split(",")[1]),n.getWeather(t)})).catch((function(e){p.a.get("https://ipapi.co/json").then((function(e){var a=e.data;t.latitude=Number(a.latitude),t.longitude=Number(a.longitude),n.getWeather(t)})).catch((function(e){alert("When retrieving IP location: "+e+". "+(e.response?e.response.data.message:"")),n.getWeather(t)}))}))}));else{for(var a=0;a<this.state.locations.length;a++)if(this.state.locations[a].selected){t.latitude=this.state.locations[a].latitude,t.longitude=this.state.locations[a].longitude;break}this.getWeather(t)}}},{key:"getWeather",value:function(e){var t=""!==this.state.apikey?this.state.apikey:this.apikey,a=null===this.unitSystem?this.state.unitsystem:this.unitSystem;if(""!==t&&null!==t&&void 0!==t){var n=this;p.a.all([p.a.get("https://api.openweathermap.org/data/2.5/weather",{params:{lat:e.latitude,lon:e.longitude,appid:t,units:a}}),p.a.get("https://api.openweathermap.org/data/2.5/forecast",{params:{lat:e.latitude,lon:e.longitude,appid:t,units:a}})]).then(p.a.spread((function(i,r){var o=n.state.locations.slice();if(0===o.filter((function(e){return e.cityid===i.data.id})).length){var l=e;l.name=i.data.name+", "+i.data.sys.country,l.cityid=i.data.id,o=o.concat([l])}n.setState({locations:o,apikey:t,unitsystem:a,currentWeather:i.data,forecastWeather:r.data})}))).catch((function(e){alert("When retrieving weather: "+e+". "+(e.response?e.response.data.message:""))}))}}},{key:"handleKeySave",value:function(e){this.apikey=e,this.getLocation()}},{key:"handleUnitChange",value:function(e){this.unitSystem=e,this.getLocation()}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{className:"App"},i.a.createElement(H,{locations:this.state.locations,apikey:this.state.apikey,onKeySave:function(t){return e.handleKeySave(t)},onUnitChange:function(t){return e.handleUnitChange(t)},onLocationChange:function(t,a){return e.handleLocationChange(t,a)}}),i.a.createElement("div",{className:"Current container-fluid"},i.a.createElement("header",null,i.a.createElement(x,{state:this.state.unitsystem}),i.a.createElement(I,{className:"col-6 text-right",currentWeather:this.state.currentWeather,getLocation:function(){return e.getLocation()},unit:this.state.unitsystem}))),i.a.createElement("div",{className:"Forecast container-fluid"},i.a.createElement(L,{forecastWeather:this.state.forecastWeather,getLocation:function(){return e.getLocation()},unit:this.state.unitsystem})),i.a.createElement("div",{className:"text-muted small"},"Nightstand icon, made from ",i.a.createElement("a",{href:"http://www.onlinewebfonts.com/icon"},"Icon Fonts"),", is licensed by CC BY 3.0"))}}]),t}(i.a.Component);o.a.render(i.a.createElement(_,null),document.getElementById("root"))},74:function(e,t,a){e.exports=a.p+"static/media/settings_applications.1e7b161a.svg"},85:function(e,t,a){e.exports=a(139)},91:function(e,t,a){}},[[85,1,2]]]);
//# sourceMappingURL=main.70992f5c.chunk.js.map