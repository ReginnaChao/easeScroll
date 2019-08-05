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
var es = $("html").easeScroll({
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

Destroy easeScroll
```
es.destroy();
```

Rebuild easeScroll (after destroy)
```
es.build();
```

---

### Use Javascript
```
<script type="text/javascript" src="/path/to/src/javascript.easeScroll.js"></script>
```

Basic initialization:
 
```
var options = { /* ... */}
var es = new EaseScroll(options);
```

Destroy easeScroll
```
es.destroy();
```

Rebuild easeScroll (after destroy)
```
es.build();
```

---

### Use ES Module

In case you use it as an ES module make sure:
* you have enabled Babel or Buble to transpile it to ES5 syntax

```
import EaseScroll from '/path/to/src/module.easeScroll.js'
```

Basic initialization:
 
```
var options = { /* ... */ }
var es = new EaseScroll(options);
```

Destroy easeScroll
```
es.destroy();
```

Rebuild easeScroll (after destroy)
```
es.build();
```