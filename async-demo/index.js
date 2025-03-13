console.log("Before!");
getUserData(1);
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

function getUserData(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading user data from db.................");
      resolve({
        id: id,
        githubUsername: "wumicodes",
      });
    }, 2000);
  });
}

function getUserRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Fetching user Repositories............");
      resolve([username + 1, username + 2, username + 3]);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Fetching commits............");
      resolve([repo + 1, repo + 2, repo + 3]);
    }, 2000);
  });
}
