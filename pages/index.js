import React, { useEffect } from "react";
import Router from 'next/router'

const Home = () => {
  useEffect(() => {
    const { pathname } = Router
    if (pathname == '/') {
      Router.push('/nofoodaftermidnight')
    }
  });

  return (
    <></>
  )
}

export default Home
