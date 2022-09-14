import Document, { Html, Head, Main, NextScript } from "next/document"
import Script from "next/script";

export default class MyDocument extends Document {
  
  render() {
    return (
      <Html lang="ru">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Scope+One&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript /> 
    <Script id="wow" strategy="beforeInteractive" src="/js/wow.min.js"></Script>
    <Script
      strategy="beforeInteractive"
      id="splitting"
      src="/js/splitting.min.js"
    ></Script>
    <Script id="simpleParallax" src="/js/simpleParallax.min.js"></Script>
    <Script
      id="isotope"
      strategy="beforeInteractive"
      src="/js/isotope.pkgd.min.js"
    ></Script>
    <Script id="initWow" strategy="lazyOnload">{`new WOW().init();`}</Script>
        </body>
      </Html>
    )
  }
}
