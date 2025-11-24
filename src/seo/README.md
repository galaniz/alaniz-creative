# Seo

## seoSitemap  

Sitemap objects by content type.  

**Type:** <code>Map&lt;string, <a href="#seositemapitem">SeoSitemapItem</a>&gt;[]</code>

## seoSchema  

Additional schema data.  

**Type:** <code><a href="#seoschema">SeoSchema</a></code>

## createSeoSitemapFiles  

**<code>createSeoSitemapFiles(): Promise&lt;void&gt;</code>**  

Create sitemap files from map items.

### Returns  

<code>Promise&lt;void&gt;</code>

## setSeoSitemapItem  

**<code>setSeoSitemapItem(itemData: Item): boolean</code>**  

Append to sitemap.

### Parameters  
- **`itemData`** <code><a href="/src/global/README.md#item">Item</a></code> required

### Returns  

<code>boolean</code>

## Seo  

**<code>Seo(meta: RenderMeta, itemData: Item, assetsLink: string, home?: boolean): string</code>**  

Output head link and meta tags.

### Parameters  
- **`meta`** <code>RenderMeta</code> required  
- **`itemData`** <code><a href="/src/global/README.md#item">Item</a></code> required  
- **`assetsLink`** <code>string</code> required  
- **`home`** <code>boolean</code> optional  
Default: `false`

### Returns  

<code>string</code>

## Types

### SeoSitemapItem  

**Type:** <code>object</code>

#### Properties  
- **`loc`** <code>string</code> required  
Absolute entry url.  
- **`lastMod`** <code>string</code> required  
Last modified date of the entry.  
- **`imageLoc`** <code>string</code> required  
Absolute featured image url.

### SeoSchemaBreadcrumb  

**Type:** <code>object</code>

#### Properties  
- **`'@type'`** <code>&#39;ListItem&#39;</code> required  
- **`position`** <code>number</code> required  
- **`name`** <code>string</code> required  
- **`item`** <code>string</code> optional

### SeoSchema  

**Type:** <code>Map&lt;string, &ast;&gt;[]</code>

#### Properties  
- **`breadcrumbs`** <code><a href="#seoschemabreadcrumb">SeoSchemaBreadcrumb</a>[]</code> optional