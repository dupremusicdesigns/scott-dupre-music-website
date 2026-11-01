# Strapi draft Deploy Preview

The existing Netlify site builds Git pull requests as Deploy Previews. These
preview builds request saved draft versions from Strapi, including unpublished
changes to previously published entries. The production website keeps its
published content.

## Setup

1. Connect `dupremusicdesigns/scott-dupre-music-website` to the existing
   `dupremusicdesigns` Netlify project and set `main` as the production branch.
2. In that project's Netlify environment variables, set `CMS_API_TOKEN` with
   **Builds** scope for the **Deploy Previews** context. The token must be able
   to read draft content from each content type used by the website. Store it
   as a secret.
3. Keep Netlify builds active. `netlify.toml` skips Git builds in every context
   except Deploy Previews. This leaves production deployment under the existing
   process and prevents a Netlify production deploy when `main` changes.

## Review changes

1. Save content in Strapi. Draft & Publish must be enabled for the content type.
2. Open a pull request targeting `main` from a branch in the connected GitHub
   repository. Netlify builds a Deploy Preview at a `deploy-preview-N` URL.
3. To refresh the preview after a later Strapi save, retry the latest Netlify
   preview deploy or push another commit to the pull request branch. The site
   is a static export, so the current preview does not update on its own.

New marching show drafts without a title are skipped because the site cannot
generate a URL for them. They appear after a title is saved and a new preview
build runs.

The preview requests `status=draft` only during its build. Preview HTML includes
`noindex` metadata and the preview `robots.txt` disallows indexing. To restrict
who can see unreleased content, configure Netlify's preview access controls;
search indexing settings do not control access.
