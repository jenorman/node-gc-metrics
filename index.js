const perf = require('perf_hooks')
const prometheus = require('prom-client');

const gcHistogram = new prometheus.Histogram({
  name: 'nodejs_gc_duration',
  help: 'Duration of gc pauses in ms',
  labelNames: ['gc_type'],
  buckets: [0.5, 1, 5, 10, 15, 25, 50, 100]
});


const perfObserver = new perf.PerformanceObserver((l) => {
  l.getEntries().forEach((entry) => {
    gcHistogram.observe({'gc_type': getGCType(entry.kind)}, entry.duration)
  });
})

function getGCType(kind) {
    let gc = 'all'
    switch (kind) {
      case perf.constants.NODE_PERFORMANCE_GC_INCREMENTAL:
        gc = 'incremental'
        break;
      case perf.constants.NODE_PERFORMANCE_GC_MINOR:
        gc = 'minor'
        break;
      case perf.constants.NODE_PERFORMANCE_GC_MAJOR:
        gc = 'major'
        break;
      case perf.constants.NODE_PERFORMANCE_GC_WEAKCB:
        gc = 'weakcb'
        break;
    }
    return gc
}

perfObserver.observe({ entryTypes: ['gc']})