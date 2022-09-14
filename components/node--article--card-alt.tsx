import Link from "next/link"
import { DrupalNode } from "next-drupal"
import classNames from "classnames"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { absoluteURL, formatDateDay, formatDateShort, formatDateYear } from "lib/utils"

interface NodeArticleCardAltProps extends React.HTMLProps<HTMLElement> {
  node: DrupalNode
}

export function NodeArticleCardAlt({
  node,
  className,
  ...props
}: NodeArticleCardAltProps): JSX.Element {
  let style = {
    backgroundImage: "url(" + absoluteURL(node.field_media_image.field_media_image.uri.url) + ")",
}

  return (
    <article className="basis-4/12"
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
                  Автор: <span className="font-bold">
          MaltaKANO
          </span>
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
                  <Link href={node.path.alias} passHref>
                    <a className="simple-btn">Подробнее <div className="arrow__animate">
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
                  </Link>
                </div>
              </div>            
          </div>
        </div>
      </article>
  )
}
