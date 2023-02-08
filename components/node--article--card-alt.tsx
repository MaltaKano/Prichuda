import React, { useState, useEffect }  from "react"
import Link from "next/link"
import Image from "next/image"
import { DrupalNode } from "next-drupal"
import classNames from "classnames"
import { FormattedText } from "components/formatted-text"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { absoluteURL, formatDate, formatDateDay, formatDateShort, formatDateYear } from "lib/utils"
import useModal from "use-react-modal"
import { Breadcrumbs } from "components/breadcrumbs"
import addParlx from "common/addParlx"

interface NodeArticleCardAltProps extends React.HTMLProps<HTMLElement> {
  node: DrupalNode
}

 
export function NodeArticleCardAlt ({
  node,
  className,
  ...props
}: NodeArticleCardAltProps): JSX.Element {
	const { targetRef, openModal, closeModal, isOpen, Modal } = useModal()
	 
  let style = {
    backgroundImage: "url(" + absoluteURL(node.field_media_image.field_media_image.uri.url) + ")",
}

 const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30
    };
	 const SliderOwerlay = ({ sliderRef }) => {
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
	    <div className="flex flex-wrap">
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
    <div className="basis-full"
      {...props}
    >
      
        <div className="wow fadeInUp" data-wow-delay=".3s">
          <div className={classNames(
        "item bg-img",
        className
      )} style={style}>
            <div className="cont">
                  <div className="date custom-font">
                    <span className="font-extrabold">
                    <i>{formatDateDay(node.created)}</i> {formatDateShort(node.created)}<span className="pl-2.5">{formatDateYear(node.created)}</span> 
                    </span>
                  </div>
                <div className="info custom-font">
				<a href="#0" className="author">
                  {node.uid?.display_name ? (
                  <span className="font-bold">
				  {"Автор: "} {node.uid.display_name}
				  </span>
					) : null}
                  </a>
                  <svg className="w-[6px] h-[6px] opacity-60 text-link" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="currentColor"></circle></svg>
                  {node.field_tags.map((tag) => (
                <Link key={tag.id} href={tag.path.alias} passHref>
                    <a className="tag font-extrabold">
                    <span>{tag.name}</span>
                    </a>
                </Link>
              ))}
                </div>
                <h6 className="font-extrabold">
                  <Link href={node.path.alias} passHref>
                  {node.title}
                  </Link>
                </h6>
                <div className="btn-more custom-font">
                    <a className="simple-btn" type="button" ref={targetRef} onClick={() => openModal()}>Подробнее <div className="arrow__animate">
                    <svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 74.5 7.3"
						xmlSpace="preserve"
					  >
						<path className="arrow__tip" d="M74.3,4.1c0.2-0.2,0.2-0.5,0-0.7l-3.2-3.2c-0.2-0.2-0.5-0.2-0.7,0s-0.2,0.5,0,0.7l2.8,2.8l-2.8,2.8c-0.2,0.2-0.2,0.5,0,0.7
								  s0.5,0.2,0.7,0L74.3,4.1z"></path>
						<rect className="arrow__handle" y="3.1" width="73.4" height="1.1"></rect>
				    </svg>
                </div>
				</a>
		</div>
              </div>            
          </div>
        </div>
		{isOpen && (
        <Modal className="bg-[#0c0f16] fixed min-h-screen inset-0 overflow-x-hidden overflow-y-auto" style={{modalStyle}}>
		  <SliderOwerlay sliderRef={fixedHeader} />
    <main ref={MainContent} className="main-content px-4">
    <div className="container mx-auto">
      <article className="grid gap-8 pb-10 lg:grid-cols-10">
        <div className="md:p-8 md:pt-0 lg:col-span-9 text-base">
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
		
      </article>
	  <div className="basis-full pb-9">
	  <div className="more-wraper-center">
	  <a className="more-button-wrapper">
	  <div className="more-button-bg-center more-button-bg-center-color-rev more-button-circle"></div>
	  <div className="more-button-txt-center more-button-txt-center-color-rev">
	  <span type="button" onClick={closeModal}>Закрыть</span>
	  </div>
	  </a>
	  </div>
	  </div>
    </div>
    </main>
        </Modal>
      )}
      </div>	  
  );
}