import * as React from "react";
import { useState } from "react";
import { View, Button } from "react-native";
import moment from "moment";

const Last_8_hours = ({ route, navigation }) => {
  const [data, setData] = useState({
    data: [],
  });

  const fetchData = async () => {
    try {
      var unixTime = Math.floor(Date.now() / 1000) - 10
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${route.params.lat}&lon=${route.params.lon}&dt=${unixTime}&appid=6c433438776b5be4ac86001dc88de74d`
      );
      const weatherObject = await response.json();
      var data = [];
      for (var i = 22; i > 14; i--) {
        data.push(weatherObject.hourly[i])
      }
      var list = data.map((data, index) => (
        <ul key={index}>
          {moment(data.dt * 1000)
            .startOf("hour")
            .fromNow() +
            ": " +
            (Math.round((data.temp - 273) * 10) / 10).toString() +
            " C"}
        </ul>
      ));
      setData({ data: list });
    } catch (err) {
      setData({ data: ["No city found!"] });
      console.log(err);
    }
  };
  return (
    <View>
      <Button title="Get weather data" onPress={() => fetchData()}></Button>
      {data.data}
    </View>
  );
};

export default Last_8_hours;
