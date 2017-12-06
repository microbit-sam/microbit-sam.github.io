(function() {
    if (window.ksRunnerInit) return;

    // This line gets patched up by the cloud
    var pxtConfig = {
    "relprefix": "/microbit-sam.github.io/",
    "workerjs": "/microbit-sam.github.io/worker.js",
    "tdworkerjs": "/microbit-sam.github.io/tdworker.js",
    "monacoworkerjs": "/microbit-sam.github.io/monacoworker.js",
    "pxtVersion": "0.14.5",
    "pxtRelId": "",
    "pxtCdnUrl": "/microbit-sam.github.io/",
    "commitCdnUrl": "/microbit-sam.github.io/",
    "blobCdnUrl": "/microbit-sam.github.io/",
    "cdnUrl": "/microbit-sam.github.io/",
    "targetVersion": "0.0.0",
    "targetRelId": "",
    "targetUrl": "",
    "simUrl": "/microbit-sam.github.io/simulator.html",
    "partsUrl": "/microbit-sam.github.io/siminstructions.html",
    "runUrl": "/microbit-sam.github.io/run.html",
    "docsUrl": "/microbit-sam.github.io/docs.html",
    "isStatic": true
};

    var scripts = [
        "/microbit-sam.github.io/highlight.js/highlight.pack.js",
        "/microbit-sam.github.io/bluebird.min.js",
        "/microbit-sam.github.io/typescript.js",
        "/microbit-sam.github.io/semantic.js",
        "/microbit-sam.github.io/marked/marked.min.js",
        "/microbit-sam.github.io/lzma/lzma_worker-min.js",
        "/microbit-sam.github.io/blockly/blockly_compressed.js",
        "/microbit-sam.github.io/blockly/blocks_compressed.js",
        "/microbit-sam.github.io/blockly/msg/js/en.js",
        "/microbit-sam.github.io/pxtlib.js",
        "/microbit-sam.github.io/pxtcompiler.js",
        "/microbit-sam.github.io/pxtblocks.js",
        "/microbit-sam.github.io/pxteditor.js",
        "/microbit-sam.github.io/pxtsim.js",
        "/microbit-sam.github.io/target.js",
        "/microbit-sam.github.io/pxtrunner.js"
    ]

    if (typeof jQuery == "undefined")
        scripts.unshift("/microbit-sam.github.io/jquery.js")

    var pxtCallbacks = []

    window.ksRunnerReady = function(f) {
        if (pxtCallbacks == null) f()
        else pxtCallbacks.push(f)
    }

    window.ksRunnerWhenLoaded = function() {
        pxt.docs.requireHighlightJs = function() { return hljs; }
        pxt.setupWebConfig(pxtConfig || window.pxtWebConfig)
        pxt.runner.initCallbacks = pxtCallbacks
        pxtCallbacks.push(function() {
            pxtCallbacks = null
        })
        pxt.runner.init();
    }

    scripts.forEach(function(src) {
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
    })

} ())
