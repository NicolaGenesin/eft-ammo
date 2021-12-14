const getResults = async () => {
  const results = fetch("http://localhost:3005/", {
    "method": "GET",
  });

  return results
}

export default getResults