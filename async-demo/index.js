console.log("Before!");
getUserData(1, (user) => {
  //get user repositories
  getUserRepositories(user.githubUsername, (repos) => {
    console.log("User Repos", repos);
  });
});
console.log("After!");

function getUserData(id, callback) {
  setTimeout(() => {
    console.log("Reading user data from db.................");
    callback({
      id: id,
      githubUsername: "wumicodes",
    });
  }, 2000);
}

function getUserRepositories(username, callback) {
  setTimeout(() => {
    console.log("Fetching user Repositories............");
    callback([username + 1, username + 2, username + 3]);
  }, 2000);
}
