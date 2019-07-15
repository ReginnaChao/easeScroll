# easeScroll
Jquery/Javascript plugin to make mouse wheel smooth scroll 

This plugin make the html element scrollable with smooth.


## Install and init

### Use jQuery
```
<script type="text/javascript" src="/path/to/src/jquery.easeScroll.min.js"></script>
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
  pulseAlgorithm: !0,
  pulseScale: 8,
  pulseNormalize: 1,
  accelerationDelta: 20,
  accelerationMax: 1,
  keyboardSupport: !0,
  arrowScroll: 50
});
```

---

### Use Javascript
```
<script type="text/javascript" src="/path/to/src/javascript.easeScroll.min.js"></script>
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

### Use Module
```
import EaseScroll from '/path/to/src/module.easeScroll.js'
```

Basic initialization:
 
```
var options = { /* ... */}
var easeScroll = new EaseScroll(options);
```

Destroy easeScroll
```
es.destroy();
```

Rebuild easeScroll (after destroy)
```
es.build();
```