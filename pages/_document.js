import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from 'next/script'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="propeller" content="2183486fd7303e413fbc248ec818d37c" />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-3C5D78NVYW"
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
                      gtag('config', 'G-3C5D78NVYW');
                      `,
            }}
          />
          {/* 
          ALTO DESTRA
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(d,z,s){s.src='//'+d+'/400/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('vooculok.com',5185764,document.createElement('script'))
              `,
            }}
          /> */}
          <script
            data-cfasync="false" type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `(function(s,u,z,p){s.src=u,s.setAttribute('data-zone',z),p.appendChild(s);})(document.createElement('script'),'https://inklinkor.com/tag.min.js',5200011,document.body||document.documentElement)`,
            }}
          />
          {/* <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(d,z,x,s,e,o){s.src='//'+d+'/tag.min.js';x.withCredentials=true;x.open('GET','//'+d+'/5/'+z+'/?oo=1&aab=1',!0);s.onerror=x.onerror=E;s.onload=x.onload=g;x.send();(document.body||document.documentElement).appendChild(s);function g(){o=this.response?JSON.parse(this.response):o;o&&window.kkp4a5x5tv&&window.kkp4a5x5tv(o);}function E(){e&&e();e=null;}})('eephaush.com',5190345,new XMLHttpRequest(),document.createElement('script'),_dlenye)
              `,
            }}
          />
          <script src="https://stootsou.net/pfe/current/tag.min.js?z=5185546" data-cfasync="false" async></script> */}
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
