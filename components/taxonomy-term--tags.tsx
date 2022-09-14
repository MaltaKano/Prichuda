import * as React from "react"
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal"
import addParlx from "common/addParlx"
import { Breadcrumbs } from "components/breadcrumbs"
import { NodeArticleCard } from "components/node--article--card"

export interface TaxonomyTermTagsProps {
  term: DrupalTaxonomyTerm
  additionalContent: {
    termContent: DrupalNode[]
  }
}

export function TaxonomyTermTags({
  term,
  additionalContent,
}: TaxonomyTermTagsProps) {
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
                  <span className="lowercase font-extrabold font-serif">Записи</span> из раздела {term.name}
                </h1>
                <Breadcrumbs
                  items={[
                    {
                      title: "Все записи",
                      url: "/articles",
                    },
                    {
                      title: term.name,
                    },
                  ]}
                />
              </div>
                <div className="bactxt custom-font valign">
                      <span className="full-width">{term.name}</span>
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
    <>
    <ContactHeader sliderRef={fixedHeader} />
    <main ref={MainContent} className="main-content px-4">
    <div className="container mx-auto">
      <div className="blog-grid pb-12 grid gap-8  sm:grid-cols-2 lg:grid-cols-3">
        {additionalContent?.termContent.map((node) => (
          <React.Fragment key={node.id}>
            {node.type === "node--article" && <NodeArticleCard node={node} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  </main>
  </>
  )
}
