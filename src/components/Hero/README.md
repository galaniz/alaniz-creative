# Hero  

**<code>Hero(args: HeroArgs): string</code>**  

Output hero section.

## Parameters  
- **`args`** <code><a href="#heroargs">HeroArgs</a></code> required

## Returns  

<code>string</code> HTMLSectionElement

## Types

### HeroWave  

**Type:** <code>&#39;one&#39; | &#39;two&#39; | &#39;three&#39; | &#39;four&#39; | &#39;five&#39;</code>

### Hero  

**Type:** <code>object</code>

#### Properties  
- **`type`** <code>&#39;media-text&#39; | &#39;minimal&#39; | &#39;profile&#39; | &#39;error&#39;</code> optional  
Default: `'media-text'`  
- **`title`** <code>string</code> optional  
- **`text`** <code>string</code> optional  
- **`wave`** <code><a href="#herowave">HeroWave</a></code> optional  
- **`blob`** <code><a href="/src/config/README.md#configblob">ConfigBlob</a></code> optional  
- **`border`** <code>boolean</code> optional  
Default: `false`

### HeroArgs  

**Type:** <code>object</code>  

**Augments:** <code><a href="/src/global/README.md#item">Item</a> | <a href="#hero">Hero</a></code>

#### Properties  
- **`image`** <code>RenderFile</code> optional  
- **`action`** <code><a href="/src/objects/Button/README.md#buttonargs">ButtonArgs</a></code> optional