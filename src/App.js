import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [componentData, setComponentData] = useState();

  const [idData, setIdData] = useState();

  const [menu, setMenu] = useState(0);

  var key = "508ab21d1d779c46f1ac0e70d12df02e";
  const id = "4072702673999819";
  // const lat = "";
  // const log = "";

  useEffect(() => {
    axios
      .get(
        `https://api.documenu.com/v2/restaurants/search/geo?lat=40.688072&lon=-73.997385&distance=1&key=${key}&fullmenu=true"`
      )
      .then((res) => {
        setComponentData(res.data.data);
        console.log("Api result", res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCallHotel = (resid) => {
    var key = "508ab21d1d779c46f1ac0e70d12df02e";
    const id = resid;
    console.log("param id", id);
    axios
      .get(`https://api.documenu.com/v2/restaurant/${id}?key=${key}`)
      .then((res) => {
        setIdData(
          res.data.result.menus[0].menu_sections[(0, 1, 3, 4, 5, 6, 7)]
        );
        console.log("id ka  result", res);
      })
      .catch((err) => {
        console.log(err);
      });
    return (
      <>
        <div>{idData}</div>
      </>
    );
  };

  return (
    <div>
      <div>
        <form
          style={{
            margin: "10px",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            placeholder="search Restaurant"
            autoComplete="off"
          ></input>
          <input type="submit" value="search" />
        </form>
      </div>
      {componentData !== undefined &&
        componentData &&
        componentData.map((item, index) => (
          <>
            <div
              style={{
                margin: "10px",
                padding: "2px",
                backgroundColor: "#96b1e7",
                display: "inline-block",
                borderRadius: "10px",
                border: "2px solid blue",
                boxShadow: "3px 4px 3px 4px",
              }}
              key={index}
              onClick={() => handleCallHotel(item.restaurant_id)}
            >
              <p>name - {item.restaurant_name}</p>
              <p>id - {item.restaurant_id}</p>
              <p>phone no - {item.restaurant_phone}</p>
            </div>
          </>
        ))}
    </div>
  );
};

export default App;
