const getAPIData = (url) => {
  return fetch(url)
    .then(response => {
      if (response.status !== 200) {
        console.log(`Error with the request! ${response.status}`);
        return "error";
      }
      return response.json();
    });
};

module.exports = getAPIData;