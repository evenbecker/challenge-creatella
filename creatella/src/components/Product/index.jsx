import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Grid,
  CardActions,
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";

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
  ellipsis: {
    margin: 0,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  actions: {
    margin: 0,
  },
  statsItem: {
    display: "flex",
    alignItems: "center",
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1),
  },
}));

const Product = ({ product = {} }) => {
  const classes = useStyles();

  const formatDate = (date) => {
    const now = new Date();
    const minute = 60 * 1000; // Milliseconds in Minute
    const hour = minute * 60; // Milliseconds in Hour
    const day = hour * 24; // Milliseconds in Day

    let diff = now - new Date(date); // Calculate Difference

    if (diff < minute) {
      return Math.floor(diff / 1000) + " seconds ago";
    } else if (diff < hour) {
      return Math.floor(diff / minute) + " minutes ago";
    } else if (diff < day) {
      return Math.floor(diff / hour) + " hours ago";
    } else if (diff < day * 8) {
      return Math.floor(diff / day) + " days ago";
    } else {
      // Older than 1 Week
      return new Date(date).toDateString();
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Avatar
          variant="square"
          className={classes.avatar}
          style={{ fontSize: product.size }}
        >
          {product.face}
        </Avatar>
        <Typography
          align="center"
          className={classes.ellipsis}
          gutterBottom
          variant="body1"
        >
          Size: {product.size} px
        </Typography>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Grid container justify="space-between">
          <Grid className={classes.statsItem} item>
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography display="inline" variant="body2">
              {formatDate(product.date)}
            </Typography>
          </Grid>
          <Grid className={classes.statsItem} item>
            <Typography display="inline" variant="body2">
              ${product.price / 100}
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default Product;
