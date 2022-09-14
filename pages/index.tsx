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
        <div className="grid lg:grid-cols-3">
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
          </div>
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
      .addPageLimit(3)
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
