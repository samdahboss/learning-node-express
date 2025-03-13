console.log("Before!");

// Promise Approach
// getUserData(1)
//   .then((user) => getUserRepositories(user.githubUsername))
//   .then((repos) => getCommits(repos[0]))
//   .then((commits) => console.log("Commits", commits))
//   .catch((err) => console.log("Error", err.message));

// Callbacks Approach
function getUserCallback(user) {
  getUserRepositories(user.githubUsername, getRepoCallback);
}

function getRepoCallback(repos) {
  getCommits(repos[0], displayCommits);
}

function displayCommits(commits) {
  console.log("Commits", commits);
}

//Async/Await Approach
(async () => {
  try {
    const user = await getUserData(1);
    const repos = await getUserRepositories(user.githubUsername);
    const commits = await getCommits(repos[0]);
    console.log("Commits", commits);
  } catch (err) {
    console.log("Error", err.message);
  }
})();
console.log("After!");

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
      // resolve([repo + 1, repo + 2, repo + 3]);
      reject(new Error("Could not get commits"));
    }, 2000);
  });
}
