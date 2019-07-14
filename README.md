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
  pulseAlgorithm: !0,
  pulseScale: 8,
  pulseNormalize: 1,
  accelerationDelta: 20,
  accelerationMax: 1,
  keyboardSupport: !0,
  arrowScroll: 50
});
```

### Use Javascript
```
<script type="text/javascript" src="/path/to/src/javascript.easeScroll.js"></script>
```

Basic initialization:
 
```
var es = new easeScroll();
```

Custom options:

```
var es = new easeScroll({
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

Destroy easeScroll
```
es.destroy();
```

Rebuild easeScroll (after destroy)
```
es.build();
```