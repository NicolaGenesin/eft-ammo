import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { url } from "../../utils/env";

const BuildRedirectPage = () => {
  const router = useRouter();
  const { query } = router;

  useEffect(async () => {
    if (query.uuid) {
      const { result } = await (
        await fetch(`${url}/api/urlShortener/?code=${query.uuid}`, {
          method: "GET",
        })
      ).json();

      router.push(result);
    }
  }, [query]);

  return <></>;
};

export default BuildRedirectPage;
