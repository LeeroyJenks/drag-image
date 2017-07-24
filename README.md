# drag-image
A jQuery plugin that expands an image within its container and allows for dragging using mouse and touch.

## Demo
[plugins.getdans.info/drag-image](http://plugins.getdans.info/drag-image)

## Installation
Download from GitHub

### Requirements
jQuery

### Use
```html
<script>
    $(document).ready(function(){
        $('.image-container img').dragImage();
    });
</script>
```
### Description

Some minor CSS is required. You will need to have a fixed size for the container element and add `overflow: hidden` to the container. The plugin is called directly on the image, and immediately expands it.
You will most likely want to call the plugin on a click event as opposed to on load.

### Example

```html
<style>
    .image-container{
        width: 358px;
        height: auto;
        display: block;
        position: relative;
        overflow: hidden;
    }
    
    .image-container img{
        display: block;
        width: 100%;
        height: auto;
    }
</style>

<div class="image-container">
    <img src="SOME_IMAGE.jpg" />
    <a href="javascript:void(0)" class="plus">Zoom</a>
</div>

<script>
    $(document).ready(function(){
        $('.plus').click(function() {
            if ($(this).hasClass('zoomed')) {
                $(this).removeClass('zoomed').siblings('img').dragImage('destroy');
            } else {
                $(this).addClass('zoomed').siblings('img').dragImage({
                    maxImageWidth: '500%'
                });
            }
        });
    });
</script>
```

### Options

Options          | Definition
---------------- | ----------------------------------------------------------------------------------------------------------- 
`maxWidth`       | Window width at which dragImage is destroyed.<br>Below width, dragImage will be bound again.<br>`default: 0`
`defaultClick`   | function
`offsetX`        | Image offset (x).<br>Do not include units.<br>`default: 0`
`offsetY`        | Image offset (y).<br>Do not include units.<br>`default: 0`
`maxImageWidth`  | Max width of image based on<br>width of container.<br>Include units<br>`default: '200%'` 
 
### Methods
 
Method      | Definition         
----------- | ------------------- 
`'destroy'` | Destroy drag image. 


