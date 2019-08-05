# easeScroll
Jquery/Javascript plugin to make mouse wheel smooth scroll 

This plugin make the html element scrollable with smooth.


## Install and init

### Use jQuery
```
<script type="text/javascript" src="/path/to/src/jquery.easeScroll.js"></script>
```

Basic initialization:
 
```
$("html").easeScroll();
```

Custom options:

```
$("html").easeScroll({
  frameRate: 60,
  animationTime: 1000,
  stepSize: 120,
  pulseAlgorithm: true,
  pulseScale: 8,
  pulseNormalize: 1,
  accelerationDelta: 20,
  accelerationMax: 1,
  keyboardSupport: true,
  arrowScroll: 50,
  touchpadSupport: true,
  fixedBackground: true,

  // Browser Setting Control
  browser: {
    Chrome: true,
    FireFox: true,
    Safari: true,
    IE: true,
    Edge: true
  }
  
});
```

---

### Use Javascript
```
<script type="text/javascript" src="/path/to/src/javascript.easeScroll.js"></script>
```

Basic initialization:
 
```
var options = { /* ... */}
var easeScroll = new EaseScroll(options);
```

Destroy easeScroll
```
easeScroll.destroy();
```

Rebuild easeScroll (after destroy)
```
easeScroll.build();
```

---

### Use ES Module
```
import EaseScroll from '/path/to/src/module.easeScroll.js'
```

Basic initialization:
 
```
var options = { /* ... */ }
var easeScroll = new EaseScroll(options);
```

Destroy easeScroll
```
easeScroll.destroy();
```

Rebuild easeScroll (after destroy)
```
easeScroll.build();
```