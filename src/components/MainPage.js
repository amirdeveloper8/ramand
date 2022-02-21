import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../store/posts";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import classes from "./main.module.css";

const MainPage = () => {
  const dispatch = useDispatch();
  const postDetails = useSelector((state) => state.posts.list);

  const [pageNumber, setpageNumber] = useState(3);
  const [posts, setPosts] = useState([]);

  //   let posts = postDetails.slice(0, 9);

  useEffect(() => {
    dispatch(getPosts());
    console.log("postsssss", posts);
  }, [dispatch]);

  useEffect(() => {
    if (postDetails.length > 0) {
      setPosts(postDetails.slice(0, 9));
    }
    console.log("postsssss", posts);
  }, [postDetails]);

  const paginationCount = Math.ceil(postDetails.length / 9);

  console.log(paginationCount);

  const handleChangePage = (event, newPage) => {
    setpageNumber(newPage);
    const filterPosts = postDetails.slice((newPage - 1) * 9 + 1, newPage * 9);
    setPosts(filterPosts);

    console.log((newPage - 1) * 9, newPage * 9);
  };
  return (
    <section>
      <Grid
        container
        justifyContent="space-around"
        sx={{ width: "90%", m: "auto" }}
      >
        {posts.map((post) => (
          <Grid xs={4} item key={post.id} className={classes.post}>
            <Typography variant="h2" align="center">
              {post.title}
            </Typography>
            <Typography align="justify">{post.body}</Typography>
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} className={classes.pagination}>
        <Pagination
          variant="outlined"
          shape="rounded"
          color="primary"
          count={paginationCount}
          page={pageNumber}
          onChange={handleChangePage}
          renderItem={(item) => (
            <PaginationItem
              components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Stack>
    </section>
  );
};

export default MainPage;
