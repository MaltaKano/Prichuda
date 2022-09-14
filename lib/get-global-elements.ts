import { GetServerSidePropsContext, GetStaticPropsContext } from "next"
import { DrupalBlock, DrupalTaxonomyTerm } from "next-drupal"

import { drupal } from "lib/drupal"
import { getParams } from "lib/get-params"
import { LayoutProps } from "components/layout"

type GlobalElements = LayoutProps

// This is a helper function to fetch global elements for layout.
// This is going to be run for every pages on build.
// To make this fast, you could cache the results example on Redis.

