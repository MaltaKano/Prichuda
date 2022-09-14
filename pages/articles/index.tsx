import React from "react"
import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import { DrupalNode } from "next-drupal"
import addParlx from "common/addParlx"
import { Breadcrumbs } from "components/breadcrumbs"
import { drupal } from "lib/drupal"
import { getParams } from "lib/get-params"
import { Layout, LayoutProps } from "components/layout"
import { NodeArticleCard } from "components/node--article--card"

interface ArticlePageProps extends LayoutProps {
  articles: DrupalNode[]
}

export default function ArticlesPage({
  articles,
}: ArticlePageProps) {
  const ContactHeader = ({ sliderRef }) => {
    const [pageLoaded, setPageLoaded] = React.useState(false);
    React.useEffect(() => {
      setPageLoaded(true);
      if (pageLoaded) {
        addParlx()
      }
    }, [pageLoaded])
    return (
      <header ref={sliderRef} className="works-header px-4 fixed-slider hfixd valign">
      <div className="container mx-auto">
        <div className="flex flex-wrap content-center">
          <div className="col-lg-9 col-md-11 static">
            <div className="capt mt-50">
              <div className="parlx">
                <h1 className="text-4xl lg:text-5xl uppercase font-extrabold tracking-wide mb-4">
                  <span className="lowercase font-extrabold font-serif">Все записи</span>в моем блоге
                </h1>
                <Breadcrumbs
                  items={[
                    {
                      title: "Все записи",
                    },
                  ]}
                />
              </div>
                <div className="bactxt custom-font valign">
                    <span className="full-width">Мой блог</span>
                </div>
            </div>
          </div>
        </div>
      </div>
     </header>
    )
  }
  const fixedHeader = React.useRef(null);
  const MainContent = React.useRef(null);
  React.useEffect(() => {
    setInterval(() => {
      if (fixedHeader.current) {
        var slidHeight = fixedHeader.current.offsetHeight;
      }
      if (MainContent.current) {
        MainContent.current.style.marginTop = slidHeight + "px";
      }
    }, 1000);
  }, []);
  return (
    <Layout>
      <ContactHeader sliderRef={fixedHeader} />
      <main ref={MainContent} className="main-content px-4">
        <div className="container mx-auto">
          <div className="blog-grid pb-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <NodeArticleCard key={article.id} node={article} />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  )
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<ArticlePageProps>> {
  // Fetch all published articles sorted by date.
  const articles = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--article",
    context,
    {
      params: getParams("node--article", "card")
        .addSort("created", "DESC")
        .getQueryObject(),
    }
  )

  return {
    props: {
      articles,
    },
  }
}
