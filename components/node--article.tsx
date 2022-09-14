import React from "react"
import Image from "next/image"
import Link from "next/link"
import { DrupalNode } from "next-drupal"
import { absoluteURL, formatDate } from "lib/utils"
import { FormattedText } from "components/formatted-text"
import { Breadcrumbs } from "components/breadcrumbs"
import { NodeArticleCard } from "components/node--article--card"
import addParlx from "common/addParlx"

export interface NodeArticleProps {
  node: DrupalNode
  additionalContent: {
    featuredArticles: DrupalNode[]
  }
}

export function NodeArticle({ node, additionalContent }: NodeArticleProps) {
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
          <div className="basis-full lg:basis-9/12 md:basis-11/12 static">
            <div className="capt mt-50">
              <div className="parlx">
                <h1 className="text-3xl lg:text-5xl uppercase font-extrabold tracking-wide mb-4">
                  <span className="lowercase font-extrabold font-serif">{formatDate(node.created)}</span>{node.title}
                </h1>
                <Breadcrumbs
                  items={[
                    {
                      title: "Все записи",
                      url: "/articles",
                    },
                    {
                      title: node.title,
                    },
                  ]}
                />
              </div>
                {node.field_tags?.length ? (
                <div className="bactxt custom-font valign">
                    {node.field_tags.map((tag) => ( 
                      <span key={tag.id} className="full-width">{tag.name}</span>
                    ))}
                </div>
                ) : null}
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
      <article className="grid gap-8 pb-12 lg:grid-cols-10">
        <div className="md:p-8 md:pt-0 lg:col-span-7 text-text">
          <div className="flex items-center my-4 space-x-2 text-sm">
            {node.uid?.display_name ? (
              <span className="font-extrabold">
                {"Автор: "} {node.uid.display_name}
              </span>
            ) : null}
            <svg
              className="w-[6px] h-[6px] opacity-60 text-link"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="12" fill="currentColor" />
            </svg>
            {node.field_tags?.length ? (
            <span className="text-malta">
              {node.field_tags.map((tag) => (
                <Link key={tag.id} href={tag.path.alias} passHref>
                  <a className="font-extrabold uppercase transition-colors text-link">
                    {tag.name}
                  </a>
                </Link>
              ))}
            </span>
          ) : null}
          </div>
          {node.field_media_image && (
            <figure className="mb-10">
              <Image
                src={absoluteURL(
                  node.field_media_image.field_media_image.uri.url
                )}
                alt={
                  node.field_media_image.field_media_image.resourceIdObjMeta.alt
                }
                width={1200}
                height={525}
                layout="responsive"
                objectFit="cover"
              />
            </figure>
          )}
          {node.body && (
            <div className="prose prose-p:text-text max-w-none prose-headings:font-serif prose-headings:text-text">
              <FormattedText text={node.body.processed} />
            </div>
          )}

        </div>
        {additionalContent?.featuredArticles && (
          <div className="blog-grid flex flex-col lg:col-span-3">
            <h2 className="text-3xl uppercase font-extrabold">
              {"Другие записи"}
            </h2>
            {additionalContent.featuredArticles.map((node) => (
              <NodeArticleCard key={node.id} node={node} />
            ))}
          </div>
        )}
      </article>
    </div>
    </main>
    </>
  )
}
