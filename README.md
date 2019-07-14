## Install
```
$ npm install node-gc-metrics
```

## Usage
```
require('node-gc-metrics')
```
E.g to use the module, simply import it. The metrics will appear automatically with any other exported metrics. Do note you have to export metrics through a metrics page.

## General
The module uses perf_hooks to attach to GC events. Each gc event is added to a histogram bucket with a label depending on the type of gc performed. The module exports the following metrics:
```
nodejs_gc_duration_bucket{le="0.5",gc_type="minor"} 0
nodejs_gc_duration_bucket{le="1",gc_type="minor"} 1
nodejs_gc_duration_bucket{le="5",gc_type="minor"} 6
nodejs_gc_duration_bucket{le="10",gc_type="minor"} 6
nodejs_gc_duration_bucket{le="15",gc_type="minor"} 6
nodejs_gc_duration_bucket{le="25",gc_type="minor"} 6
nodejs_gc_duration_bucket{le="50",gc_type="minor"} 6
nodejs_gc_duration_bucket{le="100",gc_type="minor"} 6
nodejs_gc_duration_bucket{le="+Inf",gc_type="minor"} 6
nodejs_gc_duration_sum{gc_type="minor"} 6.686006
nodejs_gc_duration_count{gc_type="minor"} 6
```
The available gc_type labels are minor, major, incremental and weakcb.

## License
MIT ©