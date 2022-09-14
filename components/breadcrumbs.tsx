
import Link from "next/link"

export interface BreadcrumbsProps {
  items: {
    title: string
    url?: string
  }[]
}

export function Breadcrumbs({ items, ...props }: BreadcrumbsProps) {

  if (!items?.length) {
    return null
  }

  items.unshift({
    title: "Главная",
    url: "/",
  })

  return (
    <nav className="crumb-menu" role="navigation" aria-labelledby="system-breadcrumb" {...props}>
      <ul itemScope itemType="http://schema.org/BreadcrumbList" className="crumb futuris-bold">
        {items.map((item, index) => (
          <li key={index} className="break-word" itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
            {item.url ? (
              <Link href={item.url} passHref>
                <a itemScope itemType="http://schema.org/Thing" itemProp="item" ><span itemProp="name">{item.title}</span>
                </a>
              </Link>
            ) : (
              item.title
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
