# Container  

**<code>Container(props: ContainerProps): ContainerProps</code>**  

Filter formation container props.

## Parameters  
- **`props`** <code><a href="#containerprops">ContainerProps</a></code> required

## Returns  

<code><a href="#containerprops">ContainerProps</a></code>

## Types

### ContainerLayout  

**Type:** <code>&#39;block&#39; | &#39;col&#39; | &#39;col-s&#39; | &#39;col-m&#39; | &#39;col-l&#39; | &#39;row&#39; | &#39;row-s&#39; | &#39;row-m&#39; | &#39;row-l&#39;</code>

### ContainerArgs  

**Type:** <code>object</code>  

**Augments:** <code>FormationContainerArgs</code>

#### Properties  
- **`maxWidth`** <code><a href="/src/config/README.md#configcontainer">ConfigContainer</a></code> optional  
- **`background`** <code><a href="/src/config/README.md#configbackgroundcolor">ConfigBackgroundColor</a></code> optional  
- **`layout`** <code><a href="#containerlayout">ContainerLayout</a></code> optional  
Default: `'block'`  
- **`paddingTop`** <code><a href="/src/config/README.md#configsize">ConfigSize</a></code> optional  
- **`paddingTopLarge`** <code><a href="/src/config/README.md#configsize">ConfigSize</a></code> optional  
- **`paddingBottom`** <code><a href="/src/config/README.md#configsize">ConfigSize</a></code> optional  
- **`paddingBottomLarge`** <code><a href="/src/config/README.md#configsize">ConfigSize</a></code> optional  
- **`paddingLeft`** <code><a href="/src/config/README.md#configsize">ConfigSize</a></code> optional  
- **`paddingLeftLarge`** <code><a href="/src/config/README.md#configsize">ConfigSize</a></code> optional  
- **`paddingRight`** <code><a href="/src/config/README.md#configsize">ConfigSize</a></code> optional  
- **`paddingRightLarge`** <code><a href="/src/config/README.md#configsize">ConfigSize</a></code> optional  
- **`gap`** <code><a href="/src/config/README.md#configsize">ConfigSize</a></code> optional  
- **`gapLarge`** <code><a href="/src/config/README.md#configsize">ConfigSize</a></code> optional  
- **`justify`** <code><a href="/src/config/README.md#configjustify">ConfigJustify</a></code> optional  
- **`align`** <code><a href="/src/config/README.md#configalign">ConfigAlign</a></code> optional  
- **`border`** <code>&#39;rounded&#39; | &#39;full&#39;</code> optional  
- **`grow`** <code>boolean</code> optional  
Default: `false`  
- **`shrink`** <code>boolean</code> optional  
Default: `true`  
- **`breakout`** <code>boolean</code> optional  
Default: `false`  
- **`richTextStyles`** <code>boolean</code> optional  
Default: `false`

### ContainerProps  

**Type:** <code>object</code>  

**Augments:** <code>RenderFunctionArgs</code>

#### Properties  
- **`args`** <code><a href="#containerargs">ContainerArgs</a></code> required  
- **`itemData`** <code><a href="/src/global/README.md#item">Item</a></code> optional