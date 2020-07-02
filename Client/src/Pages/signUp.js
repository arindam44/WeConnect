import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import propTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import logo from "../Images/logo.png";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

//REDUX IMPORTS
import { connect } from "react-redux";
import { signupUser } from "../Redux/Actions/userActions";

const styles = (theme) => ({
  ...theme.spreadThis,
});

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      userHandle: "",
      password: "",
      confirmPassword: "",
      errors: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const newUserdata = {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      userHandle: this.state.userHandle,
    };
    this.props.signupUser(newUserdata, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img className={classes.logo} src={logo} alt="WeConnect" />
          <Typography variant="h2" className={classes.pageTitle}>
            {" "}
            Signup{" "}
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              onChange={this.handleChange}
              helperText={errors.email}
              error={errors.email ? true : false}
              fullWidth
            />
            <br />

            <TextField
              id="firstName"
              name="firstName"
              type="text"
              label="First Name"
              className={classes.firstNameField}
              onChange={this.handleChange}
              helperText={errors.firstName}
              error={errors.firstName ? true : false}
            />

            <TextField
              id="lastName"
              name="lastName"
              type="text"
              label="Last Name"
              className={classes.lastNameField}
              onChange={this.handleChange}
              helperText={errors.lastName}
              error={errors.lastName ? true : false}
            />
            <br />

            <TextField
              id="userHandle"
              name="userHandle"
              type="text"
              label="Handle"
              className={classes.textField}
              onChange={this.handleChange}
              helperText={errors.userHandle}
              error={errors.userHandle ? true : false}
              fullWidth
            />
            <br />

            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              onChange={this.handleChange}
              helperText={errors.password}
              error={errors.password ? true : false}
              fullWidth
            />
            <br />

            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="text"
              label="Confirm Password"
              className={classes.textField}
              onChange={this.handleChange}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              fullWidth
            />
            <br />

            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              className={classes.button}
            >
              SIGNUP
              {loading && <CircularProgress className={classes.progress} />}
            </Button>
            <br />

            <small>
              Already have an Account? Login <Link to="/login">Here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: propTypes.object.isRequired,
  user: propTypes.object.isRequired,
  UI: propTypes.object.isRequired,
  signupUser: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(signup)
);
