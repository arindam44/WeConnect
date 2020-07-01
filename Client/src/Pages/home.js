import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts } from "../Redux/Actions/dataActions";
import Grid from "@material-ui/core/Grid";
import PostCard from "../Components/Post/PostCard";
import Profile from "../Components/Profile/Profile";
import PropTypes from "prop-types";

export class home extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.data;
    let recentPostsMarkUp = !loading ? (
      posts.map((post) => <PostCard key={post._id} post={post} />)
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentPostsMarkUp}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile history={this.props.history} />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getPosts })(home);