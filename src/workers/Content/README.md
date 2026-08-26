# Content

## mcpHandler  

Serve the MCP endpoint Claude talks to, statelessly.  

**Type:** <code>object</code>

## contentHandler  

Serve everything a person, rather than Claude, reaches.  

**Type:** <code>object</code>

## mediaStyles  

Styles for the library, inlined into every page it renders.  

**Type:** <code>string</code>

## slugArg  

Identifier of a content file, as used throughout the site to reference one
page from another.  

**Type:** <code>z.ZodString</code>

## imageMetaKey  

Key the image metadata is stored under.  

**Type:** <code>string</code>

## imageMaxSize  

Largest upload accepted.  

**Type:** <code>number</code>

## imageFormats  

Formats the media library accepts, mapped to the extension they are stored
under.  

**Type:** <code>Object&lt;string, string&gt;</code>

## githubUserAgent  

User agent sent on every GitHub request.  

**Type:** <code>string</code>

## githubJwtAlgorithm  

The algorithm GitHub requires for app tokens.  

**Type:** <code>string</code>

## githubTokenKey  

Where the installation token is cached between requests.  

**Type:** <code>string</code>

## githubTokenTtl  

How long an installation token is cached, short of the hour it lasts.  

**Type:** <code>number</code>

## contentDir  

Directory holding the content files, relative to the repo root.  

**Type:** <code>string</code>

## contentTypes  

Content types the editing tools own.  

**Type:** <code>string[]</code>

## diffMaxLines  

Most changed lines shown before the diff is replaced by a summary.  

**Type:** <code>number</code>

## diffContext  

Lines of unchanged content kept either side of a change.  

**Type:** <code>number</code>

## contentScope  

Scope the connector is granted.  

**Type:** <code>string</code>

## accessKeysKey  

Where the Access signing keys are cached between requests.  

**Type:** <code>string</code>

## accessJwtAlgorithm  

The algorithm Cloudflare Access signs its assertions with.  

**Type:** <code>string</code>

## getMediaPage  

**<code>getMediaPage(env: ContentEnv, images: ContentImage[], message?: string): string</code>**  

Render the library.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required  
- **`images`** <code><a href="#contentimage">ContentImage</a>[]</code> required  
- **`message`** <code>string</code> optional

### Returns  

<code>string</code>

## getMediaError  

**<code>getMediaError(error: unknown): Response</code>**  

Render a failure as a page, without going back to the network.

### Parameters  
- **`error`** <code>unknown</code> required

### Returns  

<code>Response</code>

## getFormText  

**<code>getFormText(form: FormData, name: string): string</code>**  

Read a text field from a submitted form.

### Parameters  
- **`form`** <code>FormData</code> required  
- **`name`** <code>string</code> required

### Returns  

<code>string</code>

## handleMedia  

**<code>handleMedia(request: Request, env: ContentEnv): Promise&lt;Response&gt;</code>**  

Serve the media library, and the uploads and deletions it submits.

### Parameters  
- **`request`** <code>Request</code> required  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required

### Returns  

<code>Promise&lt;Response&gt;</code>

## handleImageMeta  

**<code>handleImageMeta(env: ContentEnv): Promise&lt;Response&gt;</code>**  

Serve the image metadata the build renders from.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required

### Returns  

<code>Promise&lt;Response&gt;</code>

## renderMedia  

**<code>renderMedia(env: ContentEnv, message?: string): Promise&lt;Response&gt;</code>**  

Render the library with the current contents.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required  
- **`message`** <code>string</code> optional

### Returns  

<code>Promise&lt;Response&gt;</code>

## toolText  

**<code>toolText(text: string): object</code>**  

Wrap a tool result as text.

### Parameters  
- **`text`** <code>string</code> required

### Returns  

<code>object</code>

## toolError  

**<code>toolError(error: unknown): object</code>**  

Wrap a tool failure as text, so the editor sees what went wrong.

### Parameters  
- **`error`** <code>unknown</code> required

### Returns  

<code>object</code>

## getPublishedPage  

**<code>getPublishedPage(env: ContentEnv, id: string): Promise&lt;(SchemaPage|undefined)&gt;</code>**  

Read a page as it stands on the published branch, if it is there at all.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required  
- **`id`** <code>string</code> required

### Returns  

<code>Promise&lt;(<a href="/src/schema/README.md#schemapage">SchemaPage</a>|undefined)&gt;</code>

## getPagePath  

**<code>getPagePath(page: SchemaPage): string</code>**  

Where the page ends up on the site.

### Parameters  
- **`page`** <code><a href="/src/schema/README.md#schemapage">SchemaPage</a></code> required

### Returns  

<code>string</code>

## getPreviewUrl  

**<code>getPreviewUrl(env: ContentEnv, number: number, page: SchemaPage): string | undefined</code>**  

Where the preview of a staged page lives.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required  
- **`number`** <code>number</code> required  
- **`page`** <code><a href="/src/schema/README.md#schemapage">SchemaPage</a></code> required

### Returns  

<code>string | undefined</code>

## getPreview  

**<code>getPreview(env: ContentEnv, id: string): Promise&lt;ContentPreview&gt;</code>**  

State of the preview build for a staged page.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required  
- **`id`** <code>string</code> required

### Returns  

<code>Promise&lt;<a href="#contentpreview">ContentPreview</a>&gt;</code>

## getMcpServer  

**<code>getMcpServer(env: ContentEnv, actor: ContentProps): McpServer</code>**  

Register the editing tools on an MCP server.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required  
- **`actor`** <code><a href="#contentprops">ContentProps</a></code> required

### Returns  

<code>McpServer</code>

## getImageKey  

**<code>getImageKey(value: string): string</code>**  

Turn a file name into a media library key.

### Parameters  
- **`value`** <code>string</code> required

### Returns  

<code>string</code>

## getImageMetaJson  

**<code>getImageMetaJson(env: ContentEnv): Promise&lt;string&gt;</code>**  

Read the image metadata as stored.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required

### Returns  

<code>Promise&lt;string&gt;</code>

## getImageMeta  

**<code>getImageMeta(env: ContentEnv): Promise&lt;ContentImageMeta&gt;</code>**  

Read the image metadata.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required

### Returns  

<code>Promise&lt;<a href="#contentimagemeta">ContentImageMeta</a>&gt;</code>

## putImageMeta  

**<code>putImageMeta(env: ContentEnv, meta: ContentImageMeta): Promise&lt;void&gt;</code>**  

Replace the image metadata, sorted and indented for reading.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required  
- **`meta`** <code><a href="#contentimagemeta">ContentImageMeta</a></code> required

### Returns  

<code>Promise&lt;void&gt;</code>

## listImages  

**<code>listImages(env: ContentEnv, prefix?: string): Promise&lt;ContentImage&gt;[]</code>**  

List the media library, newest metadata first.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required  
- **`prefix`** <code>string</code> optional

### Returns  

<code>Promise&lt;<a href="#contentimage">ContentImage</a>&gt;[]</code>

## getImageUses  

**<code>getImageUses(env: ContentEnv, key: string): Promise&lt;string&gt;[]</code>**  

Find the content files that use an image.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required  
- **`key`** <code>string</code> required

### Returns  

<code>Promise&lt;string&gt;[]</code>

## putImage  

**<code>putImage(env: ContentEnv, args: object): Promise&lt;ContentImage&gt;</code>**  

Store an image and record what the build needs to know about it.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required  
- **`args`** <code>object</code> required

### Returns  

<code>Promise&lt;<a href="#contentimage">ContentImage</a>&gt;</code>

## deleteImage  

**<code>deleteImage(env: ContentEnv, key: string): Promise&lt;void&gt;</code>**  

Remove an image, refusing while a page still points at it.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required  
- **`key`** <code>string</code> required

### Returns  

<code>Promise&lt;void&gt;</code>

## importAppKey  

**<code>importAppKey(pem: string): Promise&lt;CryptoKey&gt;</code>**  

Import the app private key for signing.

### Parameters  
- **`pem`** <code>string</code> required

### Returns  

<code>Promise&lt;CryptoKey&gt;</code>

## getAppJwt  

**<code>getAppJwt(env: ContentEnv): Promise&lt;string&gt;</code>**  

Mint a short lived app JWT, used only to buy an installation token.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required

### Returns  

<code>Promise&lt;string&gt;</code>

## getInstallationToken  

**<code>getInstallationToken(env: ContentEnv): Promise&lt;string&gt;</code>**  

Get an installation token, from cache where possible.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required

### Returns  

<code>Promise&lt;string&gt;</code>

## encodeBase64  

**<code>encodeBase64(text: string): string</code>**  

Encode text as base64 for the contents API.

### Parameters  
- **`text`** <code>string</code> required

### Returns  

<code>string</code>

## decodeBase64  

**<code>decodeBase64(value: string): string</code>**  

Decode base64 from the contents API back into text.

### Parameters  
- **`value`** <code>string</code> required

### Returns  

<code>string</code>

## githubRequest  

**<code>githubRequest(env: ContentEnv, path: string, init?: RequestInit): Promise&lt;Response&gt;</code>**  

Call the GitHub API as the installed app.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required  
- **`path`** <code>string</code> required  
- **`init`** <code>RequestInit</code> optional

### Returns  

<code>Promise&lt;Response&gt;</code>

## githubFetch  

**<code>githubFetch(env: ContentEnv, path: string, init?: RequestInit): Promise&lt;T&gt;</code>**  

Call the GitHub API and parse the result.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required  
- **`path`** <code>string</code> required  
- **`init`** <code>RequestInit</code> optional

### Returns  

<code>Promise&lt;T&gt;</code>

## getContentPath  

**<code>getContentPath(id: string): string</code>**  

Path in the repo for a content id such as `page--about`.

### Parameters  
- **`id`** <code>string</code> required

### Returns  

<code>string</code>

## getContentBranch  

**<code>getContentBranch(id: string): string</code>**  

Branch a staged edit to a page lives on. One branch per page.

### Parameters  
- **`id`** <code>string</code> required

### Returns  

<code>string</code>

## serializePage  

**<code>serializePage(page: SchemaPage): string</code>**  

Serialise a page the way the repo stores it.

### Parameters  
- **`page`** <code><a href="/src/schema/README.md#schemapage">SchemaPage</a></code> required

### Returns  

<code>string</code>

## getRepoPath  

**<code>getRepoPath(env: ContentEnv): string</code>**  

Repo prefix for API paths.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required

### Returns  

<code>string</code>

## getBaseSha  

**<code>getBaseSha(env: ContentEnv): Promise&lt;string&gt;</code>**  

Head commit of the branch pages are published to.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required

### Returns  

<code>Promise&lt;string&gt;</code>

## readPage  

**<code>readPage(env: ContentEnv, id: string, ref?: string): Promise&lt;ContentPageFile&gt;</code>**  

Read a page from the repo, with the blob sha needed to update it later.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required  
- **`id`** <code>string</code> required  
- **`ref`** <code>string</code> optional

### Returns  

<code>Promise&lt;<a href="#contentpagefile">ContentPageFile</a>&gt;</code>

## listPages  

**<code>listPages(env: ContentEnv): Promise&lt;ContentPageSummary&gt;[]</code>**  

List every page the editing tools can change, cached against the head commit.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required

### Returns  

<code>Promise&lt;<a href="#contentpagesummary">ContentPageSummary</a>&gt;[]</code>

## getOpenPull  

**<code>getOpenPull(env: ContentEnv, id: string): Promise&lt;(ContentGithubPull|undefined)&gt;</code>**  

Find the open pull request for a page, if there is one.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required  
- **`id`** <code>string</code> required

### Returns  

<code>Promise&lt;(<a href="#contentgithubpull">ContentGithubPull</a>|undefined)&gt;</code>

## setBranch  

**<code>setBranch(env: ContentEnv, branch: string, sha: string): Promise&lt;void&gt;</code>**  

Point a branch at a commit, creating it if it does not exist.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required  
- **`branch`** <code>string</code> required  
- **`sha`** <code>string</code> required

### Returns  

<code>Promise&lt;void&gt;</code>

## deleteBranch  

**<code>deleteBranch(env: ContentEnv, branch: string): Promise&lt;void&gt;</code>**  

Delete a branch, ignoring one that has already gone.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required  
- **`branch`** <code>string</code> required

### Returns  

<code>Promise&lt;void&gt;</code>

## commitFile  

**<code>commitFile(env: ContentEnv, args: object): Promise&lt;string&gt;</code>**  

Commit a file to a branch, authored by the editor and committed by the app.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required  
- **`args`** <code>object</code> required

### Returns  

<code>Promise&lt;string&gt;</code>

## createPull  

**<code>createPull(env: ContentEnv, args: object): Promise&lt;ContentGithubPull&gt;</code>**  

Open a pull request.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required  
- **`args`** <code>object</code> required

### Returns  

<code>Promise&lt;<a href="#contentgithubpull">ContentGithubPull</a>&gt;</code>

## mergePull  

**<code>mergePull(env: ContentEnv, number: number, title: string): Promise&lt;void&gt;</code>**  

Squash merge a pull request.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required  
- **`number`** <code>number</code> required  
- **`title`** <code>string</code> required

### Returns  

<code>Promise&lt;void&gt;</code>

## closePull  

**<code>closePull(env: ContentEnv, number: number): Promise&lt;void&gt;</code>**  

Close a pull request without merging it.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required  
- **`number`** <code>number</code> required

### Returns  

<code>Promise&lt;void&gt;</code>

## getChecks  

**<code>getChecks(env: ContentEnv, sha: string): Promise&lt;ContentGithubCheck&gt;[]</code>**  

Check runs for a commit.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required  
- **`sha`** <code>string</code> required

### Returns  

<code>Promise&lt;<a href="#contentgithubcheck">ContentGithubCheck</a>&gt;[]</code>

## getCommonLines  

**<code>getCommonLines(a: string[], b: string[]): Array&lt;number&gt;[]</code>**  

Longest common subsequence of two line ranges, as a set of matched pairs.

### Parameters  
- **`a`** <code>string[]</code> required  
- **`b`** <code>string[]</code> required

### Returns  

<code>Array&lt;number&gt;[]</code>

## getPageDiff  

**<code>getPageDiff(before: SchemaPage | undefined, after: SchemaPage): string</code>**  

A unified diff between two versions of a page, compared as formatted JSON.

### Parameters  
- **`before`** <code><a href="/src/schema/README.md#schemapage">SchemaPage</a> | undefined</code> required  
- **`after`** <code><a href="/src/schema/README.md#schemapage">SchemaPage</a></code> required

### Returns  

<code>string</code>

## getConsentPage  

**<code>getConsentPage(clientName: string, email: string, query: string): Response</code>**  

The page asking the editor to confirm a connection.

### Parameters  
- **`clientName`** <code>string</code> required  
- **`email`** <code>string</code> required  
- **`query`** <code>string</code> required

### Returns  

<code>Response</code>

## getAuthError  

**<code>getAuthError(error: AuthorizationError): Response</code>**  

Turn an authorization error into the redirect or page the spec calls for.

### Parameters  
- **`error`** <code>AuthorizationError</code> required

### Returns  

<code>Response</code>

## handleAuthorize  

**<code>handleAuthorize(request: Request, env: ContentEnv): Promise&lt;Response&gt;</code>**  

Run the authorization step of the connector's OAuth flow, identifying the
editor through Cloudflare Access.

### Parameters  
- **`request`** <code>Request</code> required  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required

### Returns  

<code>Promise&lt;Response&gt;</code>

## getAccessKeys  

**<code>getAccessKeys(env: ContentEnv): Promise&lt;ContentAccessKeys&gt;</code>**  

Fetch the Access signing keys, from cache where possible.

### Parameters  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required

### Returns  

<code>Promise&lt;ContentAccessKeys&gt;</code>

## getAccessIdentity  

**<code>getAccessIdentity(request: Request, env: ContentEnv): Promise&lt;(ContentProps|undefined)&gt;</code>**  

Verify the Cloudflare Access assertion on a request and identify the editor
behind it.

### Parameters  
- **`request`** <code>Request</code> required  
- **`env`** <code><a href="#contentenv">ContentEnv</a></code> required

### Returns  

<code>Promise&lt;(<a href="#contentprops">ContentProps</a>|undefined)&gt;</code>

## Types

### ContentEnv  

**Type:** <code>object</code>

#### Properties  
- **`OAUTH_KV`** <code>KVNamespace</code> required  
- **`CONTENT_KV`** <code>KVNamespace</code> required  
- **`ASSETS_BUCKET`** <code>R2Bucket</code> required  
- **`IMAGES`** <code>ImagesBinding</code> optional  
- **`OAUTH_PROVIDER`** <code>OAuthHelpers</code> required  
- **`GITHUB_APP_ID`** <code>string</code> required  
- **`GITHUB_APP_PRIVATE_KEY`** <code>string</code> required  
- **`GITHUB_INSTALLATION_ID`** <code>string</code> required  
- **`GITHUB_OWNER`** <code>string</code> required  
- **`GITHUB_REPO`** <code>string</code> required  
- **`GITHUB_BASE`** <code>string</code> required  
- **`CF_ACCESS_TEAM_DOMAIN`** <code>string</code> required  
- **`CF_ACCESS_AUD`** <code>string</code> required  
- **`CONTENT_BOT_NAME`** <code>string</code> required  
- **`CONTENT_BOT_EMAIL`** <code>string</code> required  
- **`CONTENT_ASSETS_URL`** <code>string</code> required  
- **`CONTENT_PREVIEW_HOST`** <code>string</code> required

### ContentImage  

An entry in the media library.  

**Type:** <code>object</code>

#### Properties  
- **`key`** <code>string</code> required  
- **`path`** <code>string</code> required  
- **`name`** <code>string</code> required  
- **`type`** <code>string</code> required  
- **`format`** <code>string</code> required  
- **`width`** <code>number</code> required  
- **`height`** <code>number</code> required  
- **`size`** <code>number</code> required  
- **`alt`** <code>string</code> optional

### ContentPreviewStatus  

**Type:** <code>&#39;building&#39; | &#39;ready&#39; | &#39;failed&#39; | &#39;none&#39;</code>

### ContentPreview  

**Type:** <code>object</code>

#### Properties  
- **`status`** <code><a href="#contentpreviewstatus">ContentPreviewStatus</a></code> required  
- **`url`** <code>string</code> optional  
- **`detail`** <code>string</code> optional

### ContentProps  

The authenticated editor, carried on the OAuth grant.  

**Type:** <code>object</code>

#### Properties  
- **`email`** <code>string</code> required  
- **`name`** <code>string</code> required

### ContentImageMeta  

**Type:** <code>Object&lt;string, <a href="#contentimage">ContentImage</a>&gt;</code>

### ContentPageFile  

A content file as it exists on a branch.  

**Type:** <code>object</code>

#### Properties  
- **`id`** <code>string</code> required  
- **`path`** <code>string</code> required  
- **`page`** <code><a href="/src/schema/README.md#schemapage">SchemaPage</a></code> required  
- **`sha`** <code>string</code> required

### ContentPageSummary  

A content file as it appears in a listing.  

**Type:** <code>object</code>

#### Properties  
- **`id`** <code>string</code> required  
- **`slug`** <code>string</code> required  
- **`contentType`** <code>string</code> required  
- **`title`** <code>string</code> required

### ContentGithubPull  

**Type:** <code>object</code>

#### Properties  
- **`number`** <code>number</code> required  
- **`html_url`** <code>string</code> required  
- **`head`** <code>object</code> required

### ContentGithubCheck  

**Type:** <code>object</code>

#### Properties  
- **`name`** <code>string</code> required  
- **`status`** <code>string</code> required  
- **`conclusion`** <code>string | null</code> required  
- **`details_url`** <code>string | null</code> required  
- **`output`** <code>object</code> optional