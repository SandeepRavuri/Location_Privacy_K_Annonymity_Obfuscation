import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Grid";
import RS1 from "../assets/rs1.jpeg";
import IT1 from "../assets/item.jpeg";
import VISA from "../assets/visa.png";
import OR1 from "../assets/order.webp";
import ReceiptIcon from '@mui/icons-material/Receipt';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { useNavigate } from 'react-router-dom';
import {useLocation} from 'react-router-dom';


export default function Order(props) {
    const history = useNavigate();
    const location = useLocation();
    const [orderder, setOrderder] = React.useState("");

    React.useEffect(()=>{
        console.log(props)
        console.log(location)
        setOrderder(location.state)
    },[])
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Order Details
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container justifyContent="center" style={{marginTop:"20px"}}>
          <Grid item xs={6}>
          <Card style={{ paddingBottom: "10px" }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={OR1}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {orderder.resName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" style={{textAlign:"left"}}>
                    {orderder.desc}
                  </Typography>
                  <Typography variant="h5" component="div" style={{textAlign:"right", marginTop:20}}>
                    <Button  variant="contained" color="error" >
                        <ReceiptIcon style={{fontSize:12}} onClick={()=>{
                            window.print();
                        }}></ReceiptIcon>
                    </Button> &nbsp;&nbsp;
                    <a
                    href={ "https://www.google.com/maps/dir/" + 
                    orderder.userLat + "," + orderder.userLong + 
                    "/" +
                    orderder.lat + "," + orderder.log + 
                    "/@39.0082589,-76.3842522,10z/data=!3m1!4b1!4m13!1m7!3m6!1s0x0:0xc028390ab4797e76!2zMzjCsDQ3JzExLjQiTiA3NsKwMTMnMjcuMiJX!3b1!8m2!3d38.786495!4d-76.2242273!4m4!1m1!4e1!1m0!3e0"}
                    >
                    <Button  variant="contained">
                        <MyLocationIcon style={{fontSize:12}}></MyLocationIcon>
                    </Button></a> &nbsp;&nbsp;
                    <a
                    href={ "https://www.google.com/maps/dir/" + 
                    orderder.userLat + "," + orderder.userLong + 
                    "/" +
                    orderder.noiceLat + "," + orderder.noiceLong + 
                    "/@39.0082589,-76.3842522,10z/data=!3m1!4b1!4m13!1m7!3m6!1s0x0:0xc028390ab4797e76!2zMzjCsDQ3JzExLjQiTiA3NsKwMTMnMjcuMiJX!3b1!8m2!3d38.786495!4d-76.2242273!4m4!1m1!4e1!1m0!3e0"}
                    >
                    <Button variant="contained" color="success">
                        <MyLocationIcon style={{fontSize:12}}></MyLocationIcon>
                    </Button></a>
                  </Typography>
                  <Typography variant="h6" component="div" style={{textAlign:"left"}}>
                    Order ID : <span style={{color:"grey"}}>{orderder.orderId}</span>
                  </Typography>
                  <Typography component="div" style={{textAlign:"left", fontSize:12, color:"grey"}}>
                    Ordered Date : Feb 12, 2022 | <span style={{color:"green"}}>Estimated Delivery: Today</span>
                  </Typography>
                  <hr style={{color:"grey"}}></hr>
                  <Grid container>
                      <Grid item xs={3}>
                          <img src={IT1} style={{height: 100, borderRadius: 20}}></img>
                      </Grid>
                      <Grid item xs={7} style={{paddingRight: 5, textAlign:"left"}}>
                      <Typography variant="body2" color="text.secondary">
                            {orderder.desc}
                        </Typography>
                      </Grid>
                      <Grid item xs={2} style={{paddingLeft: 5}}>
                        <Typography style={{textAlign:"left", fontSize:16, color:"black", marginTop: 0, fontWeight: "bold"}}>
                            {orderder.price}
                        </Typography>
                        <Typography style={{textAlign:"left", fontSize:12, color:"grey", marginTop: 0, fontWeight: "bold"}}>
                            Qty: 1
                        </Typography>
                      </Grid>
                  </Grid>
                  <hr style={{color:"grey"}}></hr>
                  <Grid container>
                      <Grid item xs={3}>
                        <Typography style={{textAlign:"left", fontSize:16, color:"black", marginTop: 0, fontWeight: "bold"}}>
                            Payment
                        </Typography>
                        <Typography style={{textAlign:"left", fontSize:10, color:"grey", marginTop: 0, fontWeight: "bold"}}>
                            **** **** **** 4321 <img src={VISA} style={{height:20, marginLeft: 20}}></img>
                        </Typography>
                      </Grid>
                  </Grid>
                </CardContent>
                <CardActions class="justify-center">
                  <Button size="small" variant="contained" onClick={()=>{
                      //history("/map")
                      history("/")
                  }}>
                    Go Back
                  </Button>
                </CardActions>
              </Card>
          </Grid>
      </Grid>
    </Box>
  );
}
