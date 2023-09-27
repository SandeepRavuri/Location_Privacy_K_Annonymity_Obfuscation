import React from "react";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import myData from "../assets/restaurants.json";
import ordersData from "../assets/orders.json";
import ReactJson from 'react-json-view'

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

export default function MapOrders() {

  return (
    <Box sx={{ flexGrow: 1 }} style={{textAlign:"left"}}>
      <Grid container>
        <Grid item xs={12}>
        <ReactJson src={myData} theme="harmonic" displayDataTypes={true}/>
        </Grid>
      </Grid>
    </Box>
  );
};

//<ComposableMap
    //   projection="geoEqualEarth"
    //   projectionConfig={{
    //     scale: 420,
    //     center: [-40, 30]
    //   }}
    // >
    //   <Graticule stroke="#DDD" />
    //   <Geographies
    //     geography={geoUrl}
    //     fill="#D6D6DA"
    //     stroke="#FFFFFF"
    //     strokeWidth={0.5}
    //   >
    //     {({ geographies }) =>
    //       geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
    //     }
    //   </Geographies>
    //   <Line
    //     from = {[ -76.22422732885555, 38.78649504670335]}
    //     to = {[ -76.6992494, 39.25970]}
    //     //from={[2.3522, 48.8566]}
    //     //to={[-74.006, 40.7128]}
    //     stroke="#FF5533"
    //     strokeWidth={4}
    //     strokeLinecap="round" 
    //     />
    // </ComposableMap>