import React, { useState, useEffect } from "react";
import { StyledEngineProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import {
  FormControl,
  InputLabel,
  NativeSelect,
  Grid,
  Typography,
} from "@mui/material";
import Loading from "../Loading";
import Product from "../Product";
import Ad from "../Ad";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    overflow: "auto",
    height: "100%",
  },
  content: {
    marginTop: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
  card: {
    cursor: "pointer",
    "& > :hover": {
      boxShadow: "0 0 10px 0",
    },
  },
  end: {
    margin: "50px auto",
  },
}));

const Products = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [limit] = useState(15);
  const [sort, setSort] = useState("");
  const [finished, setFinished] = useState(false);

  // eslint-disable-next-line
  useEffect(() => FetchData(), [sort]);

  const handleScroll = ({ target }) => {
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      FetchData();
    }
  };

  const FetchData = async () => {
    if (!loading && !finished) {
      setLoading(true);
      const products = await fetch(
        `/products?_page=${page + 1}&_limit=${limit}&_sort=${sort}`,
      ).then((res) => res.json());
      if (products.length) {
        setProducts((state) => [...state, ...products]);
        setPage(page + 1);
      } else {
        setFinished(true);
      }
      setLoading(false);
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <div onScroll={handleScroll} className={classes.root}>
        <header>
          <Typography variant="h1">Creatella Challenge</Typography>
          <Typography>
            Here you're sure to find a bargain on some of the finest ascii
            available to purchase. Be sure to peruse our selection of ascii
            faces in an exciting range of sizes and prices.
          </Typography>
        </header>
        <div className={classes.content}>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="select-label">Order By</InputLabel>
            <NativeSelect
              id="select-label"
              value={sort}
              onChange={({ target }) => {
                setProducts([]);
                setPage(0);
                setFinished(false);
                setSort(target.value);
              }}
            >
              <option value=""></option>
              <option value={"size"}>Size</option>
              <option value={"price"}>Price</option>
              <option value={"id"}>ID</option>
            </NativeSelect>
          </FormControl>
          <Grid container spacing={3}>
            {products.map((product, i) => (
              <React.Fragment key={i}>
                <Grid
                  className={classes.card}
                  item
                  lg={3}
                  md={4}
                  sm={6}
                  xs={12}
                >
                  <Product product={product} />
                </Grid>
                {/* After Every 20 Products Display an Advertisement */}
                {(i + 1) % 20 === 0 && (
                  <Grid
                    className={classes.card}
                    item
                    lg={3}
                    md={4}
                    sm={6}
                    xs={12}
                  >
                    <Ad />
                  </Grid>
                )}
              </React.Fragment>
            ))}
          </Grid>
          {finished && (
            <Typography align="center" className={classes.end}>
              ~ end of catalogue ~
            </Typography>
          )}
          {loading && <Loading />}
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default Products;
