const user = require("../../Models/users.model");
const comment = require("../../Models/comments.model");
const post = require("../../Models/posts.model");

const onUserImageChange = () => {
  console.log("image change");
  user.watch().on("change", (data) => {
    if (data.operationType == "update") {
      console.log(data.updateDescription.updatedFields.imageUrl);
      if (data.updateDescription.updatedFields.imageUrl != null) {
        user.findById(data.documentKey).then((userdata) => {
          if (userdata != null) {
            post
              .updateMany(
                { userHandle: userdata.userHandle },
                {
                  $set: {
                    userImage: data.updateDescription.updatedFields.imageUrl,
                  },
                }
              )
              .then(() => {
                console.log("post images updated");
              });
            comment
              .updateMany(
                { userHandle: userdata.userHandle },
                {
                  $set: {
                    userImage: data.updateDescription.updatedFields.imageUrl,
                  },
                }
              )
              .then(() => {
                console.log("comment images updated");
              });
          }
        });
      }
    }
  });
};

module.exports = onUserImageChange;
