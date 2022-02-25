import * as React from "react";
import { useState, useEffect } from "react";
import { Text, Button, View, Image } from "react-native";

const Weather = ({ navigation }) => {
  const [weather, setWeather] = useState({
    city: "",
    description: "",
    temperature: 0,
    windSpeed: 0,
    icon: "",
    lon: 0,
    lat: 0
  });

  const [inputValue, setInputValue] = useState("");

  const imageUriBase = "https://openweathermap.org/img/wn/";

  const fetchData = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6c433438776b5be4ac86001dc88de74d`
      );
      const weatherObject = await response.json();
      setWeather({
        city: weatherObject.name,
        description: weatherObject.weather[0].main,
        temperature: weatherObject.main.temp,
        windSpeed: weatherObject.wind.speed,
        icon: weatherObject.weather[0].icon,
        lon: weatherObject.coord.lon,
        lat: weatherObject.coord.lat
      });
    } catch (err) {
      setWeather({
        city: "No city found!",
        description: "",
        temperature: 0,
        windSpeed: 0,
        icon: "",
      });
      console.log(err);
      console.log(weather.city)
    }
  };

  const handleInputChange = (event) => {
    let inputValue = event.target.value;
    setInputValue(inputValue);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center " }}>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <Text style={{ fontSize: 40 }}>{weather.city}</Text>
      <Image
        source={{ uri: imageUriBase + weather.icon + ".png" }}
        style={{ width: 100, height: 100 }}
      ></Image>
      <Text style={{ fontSize: 25 }}>{weather.description}</Text>
      <Text style={{ fontSize: 25 }}>
        {Math.round(weather.temperature - 273)} C
      </Text>
      <Text style={{ fontSize: 25 }}>{weather.windSpeed} m/s</Text>
      <Text>{"\n"}</Text>
      <Button
        title="Get weather data"
        onPress={() => fetchData(inputValue)}
      ></Button>
      <Text>{"\n"}</Text>
      <Button
        title="Temperature for last 8 hours"
        onPress={() => navigation.navigate("Last 8 hours", {lat: weather.lat, lon: weather.lon})}
      />
    </View>
  );
};

export default Weather;
