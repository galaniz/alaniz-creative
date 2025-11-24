# Posts

## postsData  

Items by content type.  

**Type:** <code>Object&lt;string, <a href="/src/global/README.md#item">Item</a>&gt;[]</code>

## Posts  

**<code>Posts(props: PostsProps): string</code>**  

Output posts.

### Parameters  
- **`props`** <code><a href="#postsprops">PostsProps</a></code> required

### Returns  

<code>string</code> HTMLElement

## Types

### PostsArgs  

**Type:** <code>object</code>

#### Properties  
- **`contentType`** <code>string</code> optional  
- **`display`** <code>number</code> optional  
Default: `1`  
- **`order`** <code>&#39;date&#39; | &#39;title&#39;</code> optional  
Default: `'date'`  
- **`headingLevel`** <code><a href="/src/config/README.md#configheadinglevel">ConfigHeadingLevel</a></code> optional  
Default: `3`  
- **`layout`** <code>&#39;text&#39; | &#39;minimal&#39; | &#39;alternate&#39; | &#39;cascade&#39;</code> optional  
Default: `'minimal'`

### PostsProps  

**Type:** <code>object</code>  

**Augments:** <code>RenderFunctionArgs</code>

#### Properties  
- **`args`** <code><a href="#postsargs">PostsArgs</a></code> required  
- **`itemData`** <code><a href="/src/global/README.md#item">Item</a></code> optional