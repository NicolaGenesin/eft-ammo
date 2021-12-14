const getResults = async () => {
  const results = fetch("/api/data", {
    "method": "GET",
  });

  return results
}

export default getResults