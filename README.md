# drag-image
A plugin for jQuery that expands an image within its container and allows for dragging using mouse and touch.

##Demo
[plugins.getdans.info/drag-image](http://plugins.getdans.info/drag-image)

##Installation
Download from GitHub

###Requirements
jQuery

###Use
```javascript
<script>
$(document).ready(function(){
    $('.image-container img').dragImage();
});
</script>
```
###Description

Some minor CSS is required. The plugin is called directly on the image, and immediately expands it.
You will most likely want to call the plugin on a click event as opposed to on load.
i.e.
```javascript
<div>
    <img src="SOME_IMAGE.jpg" />
    <a href="javascript:void(0)" class="plus">Zoom</a>
</div>

<script>
    $('.plus').click(function() {
        if ($(this).hasClass('zoomed')) {
            $(this).removeClass('zoomed').siblings('img').dragImage('destroy');
        } else {
            $(this).addClass('zoomed').siblings('img').dragImage({
                maxImageWidth: '500%'
            });
        }
    });
</script>
```

