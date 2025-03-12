console.log("Before!");
getUserData(1, getUserCallback);
console.log("After!");

// Callbacks
function getUserCallback(user) {
  getUserRepositories(user.githubUsername, getRepoCallback);
}

function getRepoCallback(repos) {
  getCommits(repos[0], displayCommits);
}

function displayCommits(commits) {
  console.log("Commits", commits);
}

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

function getCommits(repo, callback) {
  setTimeout(() => {
    console.log("Fetching commits............");
    callback([repo + 1, repo + 2, repo + 3]);
  }, 2000);
}
