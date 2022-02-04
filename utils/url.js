export const updateQueryString = (router, loadout, pathname) => {
  const query = {};

  Object.keys(loadout).forEach((item) => {
    if (loadout[item]) {
      if (loadout[item].normalizedName) {
        query[item] = loadout[item].normalizedName;
      } else {
        query[item] = loadout[item];
      }
    }
  });

  router.push(
    {
      pathname,
      query,
    },
    undefined,
    { shallow: true }
  );
};
