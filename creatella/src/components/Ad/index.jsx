import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Card,
  CardContent,
  Avatar,
  Divider,
  CardActions,
  Grid,
  Typography,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    margin: "auto 0",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    width: "100%",
    height: "90%",
    minHeight: "200px",
  },
  actions: {
    margin: 0,
  },
  statsItem: {
    display: "flex",
    alignItems: "center",
  },
}));

let lastAd = 0;
const Ad = () => {
  const classes = useStyles();

  const random = () => {
    let number;
    do {
      number = Math.floor(Math.random() * 1000);
    } while (lastAd === number);
    lastAd = number;
    return number;
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Avatar
          variant="square"
          src={`/ads/?r=${random()}`}
          className={classes.avatar}
        />
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Grid container justify="space-between">
          <Grid className={classes.statsItem} item>
            <Typography display="inline" variant="body2">
              Advertisement
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default Ad;
