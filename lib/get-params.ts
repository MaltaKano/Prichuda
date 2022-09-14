import { DrupalJsonApiParams } from "drupal-jsonapi-params"

// A helper function to build params for a resource type.
export function getParams(
  name: string,
  mode: string = null
): DrupalJsonApiParams {
  const params = new DrupalJsonApiParams()

  name = mode ? `${name}--${mode}` : name

  if (name === "node--page") {
    return params
      .addFilter("status", "1")
      .addFields("node--page", ["title", "body", "status"])
  }

  if (name === "node--article--card") {
    return params
    .addFilter("status", "1")
    .addInclude(["field_media_image.field_media_image", "field_tags"])
    .addFields("node--article", ["title", "path", "field_media_image", "status", "created", "uid", "field_tags"])
    .addFields("file--file", ["uri", "resourceIdObjMeta"])
    .addFields("user--user", ["display_name"])
    .addFields("taxonomy_term--tags", ["name", "path"])
  } 
  
  if (name === "node--article") {
    return params
      .addInclude([
        "field_media_image.field_media_image",
        "uid.user_picture",
        "field_tags",
      ])
      .addFields("node--article", [
        "title",
        "status",
        "path",
        "field_media_image",
        "body",
        "created",
        "uid",
        "field_tags",
      ])
      .addFields("user--user", ["display_name", "user_picture"])
      .addFields("media--image", ["field_media_image"])
      .addFields("file--file", ["uri", "resourceIdObjMeta"])
      .addFields("taxonomy_term--tags", ["name", "path"])
  }
  
  if (name === "menu_link_content--menu_link_content") {
    return params.addFields("menu_link_content--menu_link_content", [
      "title,url",
    ])
  }

  if (name === "taxonomy_term--tags") {
    return params.addFields("taxonomy_term--tags", ["name", "path"])
  }
}
