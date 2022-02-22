import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, postsActions } from "../store/posts";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import classes from "./main.module.css";
import EditPost from "./EditPost";
import Notification from "./UI/Notification";

const MainPage = () => {
  const dispatch = useDispatch();
  const postDetails = useSelector((state) => state.posts.list);
  const searchDetails = useSelector((state) => state.posts.searchList);

  const [pageNumber, setpageNumber] = useState(1);
  const [posts, setPosts] = useState([]);
  const [showNotif, setShowNotif] = useState(false);

  const [open, setOpen] = useState(false);
  const [updateValues, setUpdateValues] = useState({
    id: 0,
    title: "",
    body: "",
  });

  const handleOpen = (postId, postTitle, postBody) => {
    setOpen(true);
    setUpdateValues({ id: postId, title: postTitle, body: postBody });
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, posts]);

  const updateHandler = async (postId, postTitle, postBody) => {
    setShowNotif(true);

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          title: postTitle,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const data = await response.json();

    if (data) {
      dispatch(postsActions.updateHandler(data));
      dispatch(
        postsActions.notifHandler({
          status: "success",
          title: "Success",
          message: "Message sent successfully!",
        })
      );
      setTimeout(() => {
        handleClose();
        setShowNotif(false);
      }, 1000);
    } else {
      dispatch(
        postsActions.notifHandler({
          status: "error",
          title: "Error",
          message: "Something went wrong",
        })
      );
    }
  };

  useEffect(() => {
    if (postDetails.length > 0 && searchDetails.length === 0) {
      setPosts(postDetails.slice(0, 9));
    }
    if (searchDetails.length > 0) {
      setPosts(searchDetails.slice(0, 9));
    }
  }, [postDetails, searchDetails]);

  const paginationCount =
    searchDetails.length > 0
      ? Math.ceil(searchDetails.length / 9)
      : Math.ceil(postDetails.length / 9);

  const handleChangePage = (event, newPage) => {
    setpageNumber(newPage);
    const filterPosts = postDetails.slice((newPage - 1) * 9, newPage * 9);
    setPosts(filterPosts);
  };
  return (
    <section>
      <Grid
        container
        justifyContent="space-around"
        sx={{ width: "90%", m: "auto" }}
      >
        {posts.map((post) => (
          <Grid
            onClick={() => handleOpen(post.id, post.title, post.body)}
            xs={4}
            item
            key={post.id}
            className={classes.post}
          >
            <Typography variant="h2" align="center">
              #{post.id}
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
      <EditPost
        open={open}
        handleClose={handleClose}
        updateHandler={updateHandler}
        updateValues={updateValues}
      />
      {showNotif && <Notification />}
    </section>
  );
};

export default MainPage;
