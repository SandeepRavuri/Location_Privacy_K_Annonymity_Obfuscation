import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import RS1 from "../assets/rs1.jpeg";
import RS2 from "../assets/rs2.jpeg";
import RS3 from "../assets/rs3.jpeg";
import RS4 from "../assets/rs4.jpeg";
import RS5 from "../assets/rs5.jpeg";
import RS6 from "../assets/rs6.jpeg";
import RS7 from "../assets/rs7.jpeg";
import RS8 from "../assets/rs8.jpeg";
import RS9 from "../assets/rs9.jpeg";
import RS10 from "../assets/rs10.jpeg";
import WEHAVEMOVED from "../assets/wehavemoved.webp";
import NOSearch from "../assets/noSearch.svg";
import GIF1 from "../assets/gif1.gif";
import GIF2 from "../assets/gif2.gif";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Country, State, City } from "country-state-city";
import myData from "../assets/restaurants.json";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import loaderlogo from "../assets/threecircles.gif";
import MapChart from "./MapChart";
import axios from "axios";
import Drawer from "@mui/material/Drawer";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { ToastContainer, toast } from "react-toastify";
import Paper from "@mui/material/Paper";
import CancelIcon from '@mui/icons-material/Cancel';
import LinearProgress from '@mui/material/LinearProgress';


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const users = [
  "sdds",
  "sdds",
  "sdds",
  "sdds",
  "sdds",
  "sdds",
  "sdds",
  "sdds",
  "sdds",
  "sdds",
  "sdds",
  "sdds",
  "sdds",
  "sdds",
  "sdds",
  "sdds",
];

var randomToken = require("random-token").create("Aa0");

export default function Home() {
  const history = useNavigate();
  const [selectedRes, setSelectedRes] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const [loader, setLoader] = React.useState(true);
  const [location, setLocation] = React.useState("");
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [filter, setFilter] = React.useState("false");
  const [kmanual, setKmanual] = React.useState(null);
  const [dmanual, setDmanual] = React.useState();
  const [defaultFilter, setDefaultFilter] = React.useState(false);
  const [nearbyplaces, setNearbyplaces] = React.useState(null);
  const [desiredRaius, setDesiredRadius] = React.useState(0);
  const [kmanulaloc, setKmanulaloc] = React.useState(null);
  const [stats, setStats] = React.useState(null);
  const [orderdata, setOrderdata] = React.useState(null);
  const [aproxutility, setAproxutility] = React.useState(0);

  //const [fetchloader, setFetchloader] = React.useState(false);
  //const [valueLoc, setValueLoc] = React.useState(null);

  const handleFilterClick = () => {
    setDefaultFilter(true);
    if (filter == "false") {
      var requesturl =
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
        location["lat"] +
        "," +
        location["long"] +
        "&type=restaurant&rankby=distance&key=AIzaSyBOJX-TPGCnEAD7l-FmJN8yUdY2-VdDBcs";
      axios({
        method: "GET",
        url: requesturl,
        //url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=39.2780054414,-76.7176513102&type=restaurant&rankby=distance&key=AIzaSyBOJX-TPGCnEAD7l-FmJN8yUdY2-VdDBcs"
        //url: "https://randomuser.me/api/",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      })
        .then((data) => {
          console.log(data["data"]["results"]);
          console.log(data["data"]["results"].length);
          if (data["data"]["results"].length > 0) {
            setNearbyplaces(data["data"]["results"]);
            setDefaultFilter(false);
            var temp = data["data"]["results"];
            console.log("temp");
            console.log(temp);
            if (temp.length >= kmanual) {
              var res = temp[kmanual];
              console.log("res");
              console.log(res);
              setKmanulaloc({
                latitude: res["geometry"]["location"]["lat"],
                longitude: res["geometry"]["location"]["lng"],
              });
              setDesiredRadius(
                distancecalc(
                  location["lat"],
                  location["long"],
                  res["geometry"]["location"]["lat"],
                  res["geometry"]["location"]["lng"]
                )
              );
            } else {
              var res = temp[temp.length - 1];
              setKmanulaloc({
                latitude: res["geometry"]["location"]["lat"],
                longitude: res["geometry"]["location"]["lng"],
              });
              setDesiredRadius(
                distancecalc(
                  location["lat"],
                  location["long"],
                  res["geometry"]["location"]["lat"],
                  res["geometry"]["location"]["lng"]
                )
              );
            }
            setAproxutility((50 - distancecalc(
              location["lat"],
              location["long"],
              res["geometry"]["location"]["lat"],
              res["geometry"]["location"]["lng"]
            )) / 50)
            console.log(temp.length)
            console.log(kmanual)
            console.log(data['data']['results'].slice(0, kmanual+1))
            var rs = []
            if (temp.length>= kmanual){
              for(var i=0; i<kmanual; i++){
                rs.push(temp[i])
              }
            }
            else {
              rs = data["data"]["results"]
            }
            var listtemp = rs
            console.log(listtemp)
            setStats({
              Kvalue: kmanual,
              Dvalue: null,
              radius: distancecalc(
                location["lat"],
                location["long"],
                res["geometry"]["location"]["lat"],
                res["geometry"]["location"]["lng"]
              ),
              LongestKthLocation: {
                latitude: res["geometry"]["location"]["lat"],
                longitude: res["geometry"]["location"]["lng"],
              },
              k_near_by_places: listtemp,
              noOfPlacesinDdistance: null,
              centerPointForDistanceDlocations: null,
            });
          } else {
            setDefaultFilter(false);
            toast.info("There are no places found within the given K value.", {
              position: "top-right",
              pauseOnHover: true,
              draggable: true,
              autoClose: false,
            });
            toast.dark("🚀 Please increase or decrease k 🚀", {
              position: "top-right",
              pauseOnHover: true,
              draggable: true,
              autoClose: false,
            });
          }
        })
        .catch((err) => {
          setDefaultFilter(false);
          toast.dark("🚀 GCP error. Unable to fetch the nearby places 🚀", {
            position: "top-right",
            pauseOnHover: true,
            draggable: true,
            autoClose: false,
          });
        });
    } else {
      var requesturl =
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
        location["lat"] +
        "," +
        location["long"] +
        "&type=restaurant&radius=" +
        dmanual +
        "&key=AIzaSyBOJX-TPGCnEAD7l-FmJN8yUdY2-VdDBcs";
      axios({
        method: "GET",
        url: requesturl,
        //url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=39.2780054414,-76.7176513102&type=restaurant&radius=500&key=AIzaSyBOJX-TPGCnEAD7l-FmJN8yUdY2-VdDBcs"
        //url: "https://randomuser.me/api/",
      })
        .then((data) => {
          if (data["data"]["results"].length > 0) {
            setNearbyplaces(data["data"]["results"]);
            var temp = data["data"]["results"];
            var lstlonglist = [];
            for (var i = 0; i < temp.length; i++) {
              var ltlo = [];
              ltlo.push(temp[i]["geometry"]["location"]["lat"]);
              ltlo.push(temp[i]["geometry"]["location"]["lng"]);
              lstlonglist.push(ltlo);
            }
            var centerpoint = getLatLngCenter(lstlonglist);
            setKmanulaloc({
              latitude: centerpoint[0],
              longitude: centerpoint[1],
            });
            setDesiredRadius(
              distancecalc(
                location["lat"],
                location["long"],
                centerpoint[0],
                centerpoint[1]
              )
            );
            setAproxutility((50 -  distancecalc(
              location["lat"],
              location["long"],
              centerpoint[0],
              centerpoint[1]
            )) / 50)
            setStats({
              Kvalue: null,
              Dvalue: dmanual,
              radius: distancecalc(
                location["lat"],
                location["long"],
                centerpoint[0],
                centerpoint[1]
              ),
              LongestKthLocation: null,
              near_by_places_in_d_distance: data["data"]["results"],
              noOfPlacesinDdistance: temp.length,
              centerPointForDistanceDlocations: centerpoint,
            });
            setDefaultFilter(false);
          } else {
            setDefaultFilter(false);
            toast.info(
              "There is no nearby bussinesses within the specified radius☹️",
              {
                position: "top-right",
                pauseOnHover: true,
                draggable: true,
                autoClose: false,
              }
            );
            toast.dark("🚀 Try to increase the radius value 🚀", {
              position: "top-right",
              pauseOnHover: true,
              draggable: true,
              autoClose: false,
            });
          }
        })
        .catch((err) => {
          setDefaultFilter(false);
          toast.error("Error in fetching Nearby Places.Please try later🙂", {
            position: "top-right",
            pauseOnHover: true,
            draggable: true,
            autoClose: false,
          });
        });
    }
  };

  function distancecalc(lat1, lon1, lat2, lon2, unit) {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") {
        dist = dist * 1.609344;
      }
      if (unit == "N") {
        dist = dist * 0.8684;
      }
      return dist * 0.621371;
    }
  }

  function rad2degr(rad) {
    return (rad * 180) / Math.PI;
  }
  function degr2rad(degr) {
    return (degr * Math.PI) / 180;
  }
  function getLatLngCenter(latLngInDegr) {
    var LATIDX = 0;
    var LNGIDX = 1;
    var sumX = 0;
    var sumY = 0;
    var sumZ = 0;

    for (var i = 0; i < latLngInDegr.length; i++) {
      var lat = degr2rad(latLngInDegr[i][LATIDX]);
      var lng = degr2rad(latLngInDegr[i][LNGIDX]);
      // sum of cartesian coordinates
      sumX += Math.cos(lat) * Math.cos(lng);
      sumY += Math.cos(lat) * Math.sin(lng);
      sumZ += Math.sin(lat);
    }

    var avgX = sumX / latLngInDegr.length;
    var avgY = sumY / latLngInDegr.length;
    var avgZ = sumZ / latLngInDegr.length;

    // convert average x, y, z coordinate to latitude and longtitude
    var lng = Math.atan2(avgY, avgX);
    var hyp = Math.sqrt(avgX * avgX + avgY * avgY);
    var lat = Math.atan2(avgZ, hyp);

    return [rad2degr(lat), rad2degr(lng)];
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    setLoader(true);
    var saved = localStorage.getItem("orders");
    if(saved == null){
      saved = JSON.stringify({"orders":[]})
      setOrderdata(JSON.parse(saved))
    }else{
     setOrderdata(JSON.parse(saved))
    }
    navigator.geolocation.getCurrentPosition(function (position) {
      var temp = {};
      temp["lat"] = position.coords.latitude;
      temp["long"] = position.coords.longitude;
      //temp["lat"] = "39.3846149";
      //temp["long"] = "-77.4865312";
      setLocation(temp);
      setTimeout(5000)
      setLoader(false);
    });
  }, []);

  const handleRequest = async () => {
    if (desiredRaius != 0) {
      if (name != "" && email != "") {
        var rt = randomToken.gen(
          "abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        );
        var token = rt(16);
        var temp = selectedRes;
        temp["name"] = name;
        temp["email"] = email;
        temp["orderId"] = token;
        temp["userLat"] = location["lat"];
        temp["userLong"] = location["long"];
        var counter = 0;
        var radius = desiredRaius ? desiredRaius : 0.5;
        console.log("radius");
        console.log(desiredRaius);
        var valueLoc = null;
        while (valueLoc == "error" || valueLoc == null) {
          var valueLoc = await getNoisedLocation(
            location["lat"],
            location["long"],
            radius
          );
          console.log("inside");
          console.log(valueLoc);
          counter = counter + 1;
          if (counter > 2) {
            radius = radius + 0.5;
            counter = 0;
          }
          if (radius > 3) {
            var result = jitter(location["lat"], location["long"], radius);
            valueLoc = {
              //latitude: location["lat"],
              latitude: result["lat"],
              longitude: result["lng"]
              //longitude: location["long"],
            };
          }
        }
        console.log(valueLoc);
        console.log("outside");
        console.log(valueLoc);
        temp["noiceLat"] = valueLoc["latitude"];
        temp["noiceLong"] = valueLoc["longitude"];
        var utility = (
          (distancecalc(location['lat'], location['long'], selectedRes['lat'], selectedRes['log'])
          -distancecalc(location['lat'], location['long'], valueLoc['latitude'], valueLoc['longitude'])
          ) * 100) / distancecalc(location['lat'], location['long'], selectedRes['lat'], selectedRes['log'])
        temp['utiliy'] = utility
        temp["stats"] = stats;
        setSelectedRes(temp)
        var od = orderdata
        od['orders'].push(temp)
        // ordersData.writeFile('../assets/restaurants.json', JSON.stringify(ordersData), (err) => {
        //   if (err) console.log('Error writing file:', err);
        // })
        localStorage.setItem('orders', JSON.stringify(od))
        history("/order", {
          state: selectedRes,
        });
      } else {
        toast.error("💀 Please enter Name and Email🤖", {
          position: "top-right",
          pauseOnHover: true,
          draggable: true,
          autoClose: false,
        });
      }
    } else {
      toast.dark("💀 Please set K or D value in the side menu 🤖", {
        position: "top-right",
        pauseOnHover: true,
        draggable: true,
        autoClose: false,
      });
    }
  };

  const getNoisedLocation = (lati, longi, radius) => {
    console.log(lati)
    console.log(longi)
    return new Promise((resolve) => {
      var result = jitter(lati, longi, radius);
      var requesturl =
        "https://roads.googleapis.com/v1/snapToRoads?path=" +
        result["lat"] +
        "," +
        result["lng"] +
        "&key=AIzaSyBOJX-TPGCnEAD7l-FmJN8yUdY2-VdDBcs";
      axios({
        method: "GET",
        url: requesturl,
        //url: "https://randomuser.me/api/"
      })
        .then((data) => {
          console.log("response");
          console.log(data["data"]["snappedPoints"][0]);
          if (data.data.hasOwnProperty("snappedPoints")) {
            resolve(data["data"]["snappedPoints"][0]["location"]);
          }
          resolve("error");
        })
        .catch((err) => {
          console.log(err);
          // toast.error("Error in finding the noiced location for the given location🙂", {
          //   position: "top-right",
          //   pauseOnHover: true,
          //   draggable: true,
          //   autoClose: false,
          // });
          resolve("error");
        });
    });
  };

  const getNearestRoad = (lati, longi) => {
    var requesturl =
      "https://roads.googleapis.com/v1/snapToRoads?path=" +
      lati +
      "," +
      longi +
      "&key=AIzaSyBOJX-TPGCnEAD7l-FmJN8yUdY2-VdDBcs";
    axios({
      method: "GET",
      url: requesturl,
    })
      .then((data) => {
        console.log("response");
        console.log(data);
        if (data.data.hasOwnProperty("snappedPoints")) {
          return data["data"]["snappedPoints"][0];
        }
        return "error";
      })
      .catch((err) => {
        console.log(err);
        return "error";
      });
  };

  var rad_Earth = 6378.16;
  var one_degree = (2 * Math.PI * rad_Earth) / 360;
  var one_km = 1 / one_degree;

  function randomInRange(from, to, fixed) {
    fixed = fixed || 10;
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
  }

  function jitter(lat, lng, kms, fixed) {
    return {
      lat: randomInRange(lat - kms * one_km, lat + kms * one_km, fixed),
      lng: randomInRange(lng - kms * one_km, lng + kms * one_km, fixed),
    };
  }

  const today = new Date(Date.now());

  return loader ? (
    <Backdrop style={{ backgroundColor: "white" }} open={loader}>
      <img src={GIF2} />
    </Backdrop>
  ) : (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Location privacy
          </Typography>
        </Toolbar>
      </AppBar>

      <Grid container spacing={2} style={{ padding: "5px 10px 10px 5px" }}>
        {myData["Restaurants"].map((val, key) => {
          const RS = val.img;
          return (
            <Grid item xs={3}>
              <Card style={{ paddingBottom: "10px" }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={
                    val.img == "RS1"
                      ? RS1
                      : val.img == "RS2"
                      ? RS2
                      : val.img == "RS3"
                      ? RS3
                      : val.img == "RS4"
                      ? RS4
                      : val.img == "RS5"
                      ? RS5
                      : val.img == "RS6"
                      ? RS6
                      : val.img == "RS7"
                      ? RS7
                      : val.img == "RS8"
                      ? RS8
                      : val.img == "RS9"
                      ? RS9
                      : RS10
                  }
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{
                      "text-overflow": "ellipsis",
                      width: "100%",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {val.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles,with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
                <CardActions class="justify-center">
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => {
                      setSelectedRes({
                        resName: val.name,
                        name: "Karthik",
                        email: "dattu.sai4@gmi.com",
                        price: val.price,
                        lat: val.lat,
                        log: val.long,
                        orderId: "qwer-tyuq-wert-frte",
                        date: Date.now(),
                        desc: val.description,
                      });
                      handleClickOpen();
                      // history("/order", {state:{
                      // "resName": val.name,
                      // "name": "Karthik",
                      // "email": "dattu.sai4@gmi.com",
                      // "price": "$24.56",
                      // "lat": val.lat,
                      // "log": val.long,
                      // "orderId": "qwer-tyuq-wert-frte",
                      // "date": Date.now(),
                      // "desc": val.description
                      // }})
                    }}
                  >
                    Order From here
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Dialog open={open} keepMounted>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent dividers>
          <Grid container style={{ width: "500px" }} spacing={1}>
            <Grid item xs={12}>
              <Typography
                style={{ fontSize: 14, color: "grey", fontWeight: "bold" }}
              >
                {selectedRes.resName}
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: 7 }}>
              <TextField
                size="small"
                label="Name"
                variant="outlined"
                fullWidth
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} style={{ marginTop: 7 }}>
              <TextField
                size="small"
                label="Email"
                variant="outlined"
                fullWidth
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6} style={{ marginTop: 7 }}>
              <TextField
                disabled
                size="small"
                value={selectedRes.price}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6} style={{ marginTop: 7 }}>
              <TextField
                disabled
                size="small"
                value={today.toDateString()}
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            color="error"
            variant="contained"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button color="success" variant="contained" onClick={handleRequest}>
            Order
          </Button>
        </DialogActions>
      </Dialog>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <Grid
          container
          style={{ width: "800px"}}
          justifyContent="center"
          spacing={1}
        >
          <Grid xs={12} style={{height:64, backgroundColor:"#1876d1"}}>
            <Grid container style={{paddingTop:13}}>
              <Grid item xs={11} style={{textAlign:"center"}}>
                <Typography style={{color:"white", fontSize: 20, fontWeight:"bold", marginTop: 9}}>
                  Playground
                </Typography>
              </Grid>
              <Grid item xs={1}>
              <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerClose}
            style={{color:"white"}}
          >
            <CancelIcon />
          </IconButton>
              </Grid>
            </Grid>
          
          
          
          </Grid>
          <Grid item xs={6} style={{ paddingLeft: 20 }}>
            <Paper
              elevation={3}
              style={{
                marginTop: 30,
                borderRadius: 10,
                padding: "10px 0px 10px 0px",
                height: 480,
              }}
            >
              <Grid container justifyContent="center">
                <Grid item xs={9}>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Choose the Filter
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="false"
                      name="radio-buttons-group"
                      onChange={(event) => {
                        setFilter(event.target.value);
                        console.log(event.target.value);
                      }}
                    >
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        checked={filter === "false"}
                        label="Select K-Value Manually"
                      />
                      <FormControlLabel
                        value="true"
                        checked={filter === "true"}
                        control={<Radio />}
                        label="Enter distance Manually"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    size="small"
                    value={kmanual}
                    variant="outlined"
                    fullWidth
                    placeholder="K-Value"
                    disabled={filter != "false" ? true : false}
                    onChange={(event) => {
                      setKmanual(event.target.value);
                    }}
                  />
                  <TextField
                    style={{ marginTop: 10 }}
                    size="small"
                    value={dmanual}
                    variant="outlined"
                    fullWidth
                    placeholder="Distance d"
                    disabled={filter == "false" ? true : false}
                    onChange={(event) => {
                      setDmanual(event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="warning"
                    style={{ marginTop: 20 }}
                    onClick={handleFilterClick}
                  >
                    Set Filter
                  </Button>
                  <img src={GIF1} style={{width:200, marginTop:20}}></img>
                </Grid>
                <Grid item xs={12}></Grid>
                {defaultFilter ? (
                  <Grid
                    item
                    xs={4}
                    style={{ marginTop: 30, textAlign: "center" }}
                  >
                    <CircularProgress />
                  </Grid>
                ) : null}
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={11}>
                <Paper
                  elevation={4}
                  style={{
                    width: "100%",
                    height: "500px",
                    marginTop: 30,
                    borderRadius: 10,
                  }}
                >
                  {stats ? (
                    defaultFilter ? (
                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          style={{ textAlign: "center", marginTop: 10 }}
                        >
                          <Typography style={{ fontSize: 16, color: "grey" }}>
                            Calculated Results
                          </Typography>
                          <CircularProgress />
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          style={{ textAlign: "center", marginTop: 10 }}
                        >
                          <Typography style={{ fontSize: 16, color: "grey" }}>
                            Calculated Results
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <div style={{ width: "100%", textAlign: "center" }}>
                            <img
                              src={WEHAVEMOVED}
                              style={{ width: "100", height: 150 }}
                            ></img>
                          </div>
                          <div style={{ paddingLeft: 20 }}>
                            <Typography
                              style={{ fontSize: 12, fontWeight: "bold" }}
                            >
                              From:
                            </Typography>
                            <Typography style={{ fontSize: 12, color: "grey" }}>
                              latitude: {location['lat']}&nbsp;&nbsp;&nbsp;longitude:
                              &nbsp;{location['long']}
                            </Typography>
                            <Typography
                              style={{ fontSize: 12, fontWeight: "bold" }}
                            >
                              To:
                            </Typography>
                            <Typography style={{ fontSize: 12, color: "grey" }}>
                              latitude: {kmanulaloc['latitude']}&nbsp;&nbsp;&nbsp;longitude:
                              &nbsp;{kmanulaloc['longitude']}
                            </Typography>
                            <br></br>
                            <Typography
                              style={{ fontSize: 12, fontWeight: "bold" }}
                            >
                              Facts:
                            </Typography>
                            <Typography style={{ fontSize: 12, color: "grey" }}>
                              You need to walk approximately {desiredRaius.toFixed(2)} miles to receive the order
                            </Typography>
                            <br></br>
                            {/* <Typography
                              style={{ fontSize: 12, fontWeight: "bold" }}
                            >
                              Facts:
                            </Typography> */}
                            <Typography
                              style={{
                                fontSize: 12,
                                color: "grey",
                                paddingRight: 25,
                              }}
                            >
                              {filter == "false"
                                ? "For the given K, We found " + kmanual + " houses in the radius of " + desiredRaius.toFixed(2) + "miles"
                                : "For the given D, we have found " + nearbyplaces.length + " houses near you."}
                            </Typography>
                            <br></br>
                            <Typography
                              style={{ fontSize: 12, fontWeight: "bold" }}
                            >
                              Loss:
                            </Typography>
                          </div>
                          <div>
                            <Grid container justifyContent="center" style={{marginTop:5}}>
                              <Grid item xs={10}>
                                <LinearProgress variant="determinate" color="error" value={aproxutility} style={{height:15, borderRadius:10}}/>
                                <Typography style={{marginTop:5,fontSize: 12, fontStyle:"italic", color:"grey"}}>
                                  utility loss: {aproxutility}%
                                </Typography>
                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                      </Grid>
                    )
                  ) : (
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        style={{ textAlign: "center", marginTop: 10 }}
                      >
                        <Typography style={{ fontSize: 16, color: "grey" }}>
                          Calculated Results
                        </Typography>
                        <img src={NOSearch}></img>
                      </Grid>
                    </Grid>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item xs={12} style={{padding:30}}>
            <Typography style={{fontSize:12, color:"red", fontStyle:"italic"}}>Note: The above results are Calculated before selecting of restaurant, Results may change once you select atleast one Restaurant</Typography>
          </Grid> */}
        </Grid>
      </Drawer>
    </Box>
  );
}

// var result  = jitter(location['lat'], location['long'], radius)
// start: while(true) {
// var requesturl = "https://roads.googleapis.com/v1/snapToRoads?path=" + result['lat'] + "," + result['lng'] + "&key=AIzaSyDK7NsYBPgvD_T-3ciipJjgmzfAvMtnVN8"
// axios({
//   method: "GET",
//   url: "https://randomuser.me/api/"
// }).then((data) => {
//   console.log("response")
//   console.log(data);
//   if(!data.data.hasOwnProperty('snappedPoints')){
//      //return data['data']['snappedPoints'][0]
//      valueLoc = data
//   }
//   valueLoc = "error"
// }).catch((err)=> {
//   console.log(err)
//   valueLoc = "error"
// })
// counter = counter + 1
// if(counter >= 1){
//   radius = radius + 0.5
//   counter = 0
// }
// if(radius >= 1){
//   valueLoc = "sasdsad"
// }
//   if(valueLoc == "error" || valueLoc == null){
//     continue start;
//   }
//   else {
//     break;
//   }
// }
