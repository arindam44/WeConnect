import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editUserDetails } from "../../Redux/Actions/userActions";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

//ICONS
import EditIcon from "@material-ui/icons/Edit";

const styles = (theme) => ({
  ...theme.spreadThis,
  button: {
    float: "right",
  },
});
class EditDetails extends Component {
  state = {
    bio: "",
    website: "",
    location: "",
    open: false,
  };

  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }
  handleOpen = () => {
    this.setState({
      open: true,
    });
    this.mapUserDetailsToState(this.props.credentials);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
    });
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location,
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Tooltip title="Edit Details" placement="top">
          <IconButton onClick={this.handleOpen} className={classes.button}>
            <EditIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your Details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                fullWidth
                placeholder="A short bio about yourself"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
              />
              <br />
              <TextField
                name="website"
                type="text"
                label="Website"
                rows="3"
                placeholder="Your personal/professional website"
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
                style={{ marginRight: "20px" }}
              />
              <TextField
                name="location"
                type="text"
                label="Location"
                rows="3"
                placeholder="Your location"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={this.handleClose}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={this.handleSubmit}
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetails)
);