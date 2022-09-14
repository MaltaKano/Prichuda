import Link from "next/link"
import { DrupalNode } from "next-drupal"
import classNames from "classnames"
import { absoluteURL, formatDateDay, formatDateShort } from "lib/utils"
import { MediaImage } from "components/media--image"

interface NodeArticleCardProps extends React.HTMLProps<HTMLElement> {
  node: DrupalNode
}

export function NodeArticleCard({ node, ...props }: NodeArticleCardProps): JSX.Element {

  return (
    <article
      className="relative flex flex-col mt-4 overflow-hidden group"
      {...props}
    >
            <div
              className="item list md-mb50 wow fadeInUp"
              data-wow-delay=".3s"
            >
              <div className="img">
              <MediaImage media={node.field_media_image} width={335} height={225} />
              </div>
              <div className="cont">
                  <div className="date custom-font">
                    <span>
                      <i>{formatDateDay(node.created)}</i> {formatDateShort(node.created)}
                    </span>
                  </div>

                <div className="info custom-font">
                  <a href="#0" className="author">
                    Автор: <span className="font-bold">
                     MaltaKANO</span>
                  </a>
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
        </div></a>
                  </Link>
                </div>
              </div>
            </div>
    </article>
  )
}
