import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-215437685-1"
          />
          <script async src="https://www.google-analytics.com/analytics.js" />
          <script
            async
            src="https://cdnjs.cloudflare.com/ajax/libs/autotrack/2.4.1/autotrack.js"
          />
          <link rel="stylesheet" type="text/css" href="/fonts/style.css" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                      window.ga=window.ga||function()
                      {(ga.q = ga.q || []).push(arguments)}
                      ;ga.l=+new Date;
                      ga('create', 'G-3C5D78NVYW', 'auto');
                      ga('require', 'eventTracker');
                      ga('require', 'outboundLinkTracker');
                      ga('require', 'urlChangeTracker');
                      ga('send', 'pageview');

                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'UA-215437685-1');
                      `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
