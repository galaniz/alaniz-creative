/**
 * Workers - Content Media
 */

/* Imports */

import type { ContentEnv, ContentImage } from './ContentTypes.js'
import { escape } from '@alanizcreative/formation-static/utils/escape/escape.js'
import { getAccessIdentity } from './ContentAccess.js'
import {
  imageMaxSize,
  imageFormats,
  getImageMetaJson,
  listImages,
  putImage,
  deleteImage
} from './ContentImage.js'

/**
 * Styles for the library, inlined into every page it renders.
 *
 * @type {string}
 */
const mediaStyles: string = /* css */`
  :root {
    color-scheme: light dark;
    --edge: color-mix(in srgb, currentcolor 15%, transparent);
    --dim: color-mix(in srgb, currentcolor 60%, transparent);
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 2rem 1.25rem 4rem;
    font: 16px/1.5 system-ui, sans-serif;
    max-width: 68rem;
    margin-inline: auto;
  }
  h1 { font-size: 1.5rem; margin: 0 0 .25rem; }
  p.sub { color: var(--dim); margin: 0 0 2rem; }
  form.upload {
    display: grid;
    gap: .75rem;
    padding: 1.25rem;
    border: 1px solid var(--edge);
    border-radius: .75rem;
    margin-bottom: 2.5rem;
  }
  label { display: grid; gap: .35rem; font-weight: 500; }
  input, button {
    font: inherit;
    padding: .5rem .65rem;
    border-radius: .4rem;
    border: 1px solid var(--edge);
    background: transparent;
    color: inherit;
  }
  small { color: var(--dim); font-weight: 400; }
  button { cursor: pointer; font-weight: 500; }
  button.primary { background: currentcolor; border-color: currentcolor; }
  button.primary span { color: Canvas; }
  ul.grid {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 1.25rem;
    grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
  }
  li.item { display: grid; gap: .4rem; align-content: start; }
  li.item img {
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: contain;
    background: color-mix(in srgb, currentcolor 6%, transparent);
    border-radius: .5rem;
  }
  code {
    font-size: .8rem;
    overflow-wrap: anywhere;
    user-select: all;
  }
  li.item p { margin: 0; font-size: .8rem; color: var(--dim); }
  li.item form { margin: 0; }
  [role="alert"] {
    padding: .75rem 1rem;
    border-radius: .5rem;
    border: 1px solid var(--edge);
    margin-bottom: 1.5rem;
  }
`

/**
 * Render the library.
 *
 * @param {ContentEnv} env
 * @param {ContentImage[]} images
 * @param {string} [message]
 * @return {string}
 */
const getMediaPage = (env: ContentEnv, images: ContentImage[], message?: string): string => {
  const items = images.map(image => /* html */`
    <li class="item">
      <img src="${escape(`${env.CONTENT_ASSETS_URL}/${image.path}`)}?w=400" alt="" loading="lazy">
      <code>${escape(image.key)}</code>
      <p>${image.width}&times;${image.height} &middot; ${Math.round(image.size / 1024)} KB</p>
      <form method="post" action="/media/delete" onsubmit="return confirm('Delete ${escape(image.key)}?')">
        <input type="hidden" name="key" value="${escape(image.key)}">
        <button type="submit">Delete</button>
      </form>
    </li>
  `).join('')

  return /* html */`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>Media library</title>
  <style>${mediaStyles}</style>
</head>
<body>
  <h1>Media library</h1>
  <p class="sub">Upload an image here, then reference it by its key in the chat.</p>
  ${message ? `<div role="alert">${escape(message)}</div>` : ''}
  <form class="upload" method="post" action="/media/upload" enctype="multipart/form-data">
    <label>
      Image
      <input type="file" name="file" accept="${Object.keys(imageFormats).join(',')}" required>
      <small>JPEG, PNG, WebP or GIF, up to ${imageMaxSize / 1024 / 1024} MB. Sizing happens when the image is served, so upload the original.</small>
    </label>
    <label>
      Description
      <input type="text" name="alt" maxlength="300" placeholder="What the image shows">
      <small>Optional. Carried over as a starting point when the image is placed on a page.</small>
    </label>
    <label>
      Key
      <input type="text" name="key" pattern="[a-z0-9][a-z0-9/-]*" placeholder="citris/hero">
      <small>Optional. Taken from the file name when left empty.</small>
    </label>
    <p><button class="primary" type="submit"><span>Upload</span></button></p>
  </form>
  <ul class="grid">${items || '<li class="item"><p>Nothing here yet.</p></li>'}</ul>
</body>
</html>`
}

/**
 * Render a failure as a page, without going back to the network.
 *
 * @param {unknown} error
 * @return {Response}
 */
const getMediaError = (error: unknown): Response => {
  const message = error instanceof Error ? error.message : 'Something went wrong.'
  const body = /* html */`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>Media library</title>
  <style>${mediaStyles}</style>
</head>
<body>
  <h1>Media library</h1>
  <div role="alert">${escape(message)}</div>
  <p><a href="/media">Try again</a></p>
</body>
</html>`

  return new Response(body, {
    status: 500,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  })
}

/**
 * Read a text field from a submitted form.
 *
 * @param {FormData} form
 * @param {string} name
 * @return {string}
 */
const getFormText = (form: FormData, name: string): string => {
  const value = form.get(name)

  return typeof value === 'string' ? value : ''
}

/**
 * Serve the media library, and the uploads and deletions it submits.
 *
 * @param {Request} request
 * @param {ContentEnv} env
 * @return {Promise<Response>}
 */
const handleMedia = async (request: Request, env: ContentEnv): Promise<Response> => {
  const { pathname } = new URL(request.url)

  try {
    const identity = await getAccessIdentity(request, env)

    if (!identity) {
      return new Response('Not authorised', { status: 403 })
    }

    if (request.method === 'GET' && pathname === '/media') {
      return await renderMedia(env)
    }

    if (request.method !== 'POST') {
      return new Response('Not found', { status: 404 })
    }

    const form = await request.formData()

    if (pathname === '/media/upload') {
      const file = form.get('file')

      if (file === null || typeof file === 'string') {
        throw new Error('No file was attached.')
      }

      const image = await putImage(env, {
        file,
        key: getFormText(form, 'key'),
        alt: getFormText(form, 'alt'),
        actor: identity
      })

      return await renderMedia(env, `Uploaded as ${image.key}. It can be referenced in the chat now.`)
    }

    if (pathname === '/media/delete') {
      const key = getFormText(form, 'key')

      await deleteImage(env, key)

      return await renderMedia(env, `Deleted ${key}.`)
    }

    return new Response('Not found', { status: 404 })
  } catch (error) {
    /* Render rather than throw — an uncaught throw reaches the browser as a
       worker exception with a ray id and nothing else */

    return getMediaError(error)
  }
}

/**
 * Serve the image metadata the build renders from.
 *
 * @param {ContentEnv} env
 * @return {Promise<Response>}
 */
const handleImageMeta = async (env: ContentEnv): Promise<Response> => {
  return new Response(await getImageMetaJson(env), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=60'
    }
  })
}

/**
 * Render the library with the current contents.
 *
 * @param {ContentEnv} env
 * @param {string} [message]
 * @return {Promise<Response>}
 */
const renderMedia = async (env: ContentEnv, message?: string): Promise<Response> => {
  const images = await listImages(env)

  return new Response(getMediaPage(env, images, message), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  })
}

/* Exports */

export {
  getMediaPage, // Exported so the page can be rendered without auth or network
  handleImageMeta,
  handleMedia
}
