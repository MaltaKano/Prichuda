import * as React from "react"
import Script from "next/script";
import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import { DrupalBlock, DrupalNode } from "next-drupal"
import classNames from "classnames"
import Services from "components/Services"
import IntroWithSlider from "components/Intro-with-slider"
import { drupal } from "lib/drupal"
import { getParams } from "lib/get-params"
import { Layout, LayoutProps } from "components/layout"
import { NodeArticleCardAlt } from "components/node--article--card-alt"
var $ = require("jquery");
if (typeof window !== "undefined") {
  window.$ = window.jQuery = require("jquery");
}
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

const state= {
  responsive: {
    0: {
      items: 1,
      margin: 30,
    },
    768: {
      items: 1,
      margin: 50,
    },
    980: {
      items: 2,
    },
    1240: {
      items: 3,
    },
  },
}

interface IndexPageProps extends LayoutProps {
  promotedArticles: DrupalNode[]
}

export default function IndexPage({
  promotedArticles,
}: IndexPageProps, subBG) {

		const fixedSlider = React.useRef(null);
  const MainContent = React.useRef(null);
  React.useEffect(() => {
    setInterval(() => {
      if (fixedSlider.current) {
        var slidHeight = fixedSlider.current.offsetHeight;
      }
      if (MainContent.current) {
        MainContent.current.style.marginTop = slidHeight + "px";
      }
    }, 1000);
}, [fixedSlider, MainContent]);
  return (
    
    <Layout>	
	    <IntroWithSlider sliderRef={fixedSlider} />
		<main ref={MainContent} className="main-content">
		<Services />
      <section className={`blog-grid section-padding ${subBG ? "sub-bg" : ""}`}>
      <div className="container mx-auto">
        <div className="sec-head custom-font text-center">
          <h6 className="wow fadeIn" data-wow-delay=".5s">
            Последние записи
          </h6>
          <h3 className="wow" data-splitting>
            мой блог.
          </h3>
          <span className="tbg">Читай</span>
        </div>
        <OwlCarousel
                        responsive={state.responsive}
                        responsiveBaseElement='body'
                        navElement='div'
                        dots={false}
                        navContainer='.owl-nav-custom-works'
                        nav={true}
                        navText={[
                          "<i class='ion-chevron-left'></i>",
                          "<i class='ion-chevron-right'></i>",
                        ]}
                      >
          {promotedArticles?.length
            ? promotedArticles.map((node, index) => (
                <NodeArticleCardAlt
                  node={node}
                  key={node.id}
                  className={classNames({
                    "item active bg-img": index === 1,
                    "item bg-img": index !== 1,
                  })
                 }
                />
              ))
            : null}
		   </OwlCarousel>
		  	<div className="divider-m-2 h-[25px] md:h-[50px]"></div>
            <div className="owl-nav-custom-works"></div>
        <div className="divider-m-2 h-[25px] md:h-[50px]"></div>
        </div>
      </section>
	  </main>
    </Layout>
  )
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<IndexPageProps>> {
  const promotedArticles = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--article", context, {
    params: getParams("node--article", "card")
      .addFilter("promote", "1")
      .addPageLimit(6)
      .addSort("created", "DESC")
      .addFields("user--user", ["display_name"])
      .getQueryObject(),
  })


  return {
    props: {
      promotedArticles,
    },
  }
}
