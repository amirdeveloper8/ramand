import * as React from "react";
import Modal from "@mui/material/Modal";
import { Grid, TextField, Button, Box } from "@mui/material";

import classes from "./edit.module.css";

export default function EditPost(props) {
  const { open, handleClose, updateValues } = props;

  const submitHandler = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get("title");
    const body = data.get("body");
    props.updateHandler(updateValues.id, title, body);
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          onSubmit={submitHandler}
          className={classes.modal}
          component="form"
        >
          <Grid className={classes.grid} container flexDirection="column">
            <TextField
              id="Title"
              label="Title"
              name="title"
              color="primary"
              focused
              defaultValue={updateValues.title}
              sx={{ mb: 3 }}
            />
            <TextField
              id="Body"
              label="Body"
              name="body"
              color="primary"
              focused
              multiline
              rows={4}
              defaultValue={updateValues.body}
              sx={{ mb: 3 }}
            />
            <Grid
              item
              container
              justifyContent="space-around"
              direction="row"
              className={classes.stack}
            >
              <Button type="submit" variant="contained" color="success">
                Submit
              </Button>
              <Button onClick={handleClose} variant="contained" color="error">
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
