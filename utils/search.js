const searchFilter = (currentSearch, target) => {
  if (currentSearch.slice(-1) === "." || currentSearch[0] === ".") {
    return target.toLowerCase().includes(currentSearch.toLowerCase());
  } else {
    return target
      .replaceAll(".", "")
      .toLowerCase()
      .includes(currentSearch.replaceAll(".", "").toLowerCase());
  }
};

export default searchFilter;
