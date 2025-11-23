# PollyJS ESBundle

This project provides a bundled version of [Polly.JS](https://netflix.github.io/pollyjs/) specifically configured for use in Tampermonkey (or Greasemonkey/Violentmonkey) scripts.

It bundles the core PollyJS library along with Fetch and XHR adapters, and a custom In-Memory Persister, making it easy to intercept and mock network requests within userscripts.

## Usage in Tampermonkey

To use this bundle in your userscript, include it via the `@require` directive. We recommend using **jsDelivr** because GitHub's raw file serving (`raw.githubusercontent.com`) frequently returns **429 (Too Many Requests)** errors, even with low traffic (see [this discussion](https://github.com/orgs/community/discussions/177971)).

```javascript
// ==UserScript==
// @name         My Script with PollyJS
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Intercept requests with PollyJS
// @author       You
// @match        https://example.com/*
// @require      https://cdn.jsdelivr.net/gh/rafaelmfonseca/pollyjs-esbundle@main/dist/bundle.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Initialize PollyJS and setup interceptors
    const { pollyInstance, stop } = window.$pollyIntercept({
        request: (req) => {
            console.log('Request:', req.method, req.url);
        },
        response: (req, res) => {
            console.log('Response:', res.statusCode);
        }
    });
})();
```

## API

The bundle exposes the following global variables:

### `window.Polly`

The `Polly` class constructor. You can use this to instantiate Polly manually or access static methods.

### `window.$pollyIntercept(options)`

Initializes PollyJS and registers interceptors.

**Parameters:**

- `options` (Object):
  - `request` (Function): A callback function invoked on every request. Receives `(req, res)`.
  - `response` (Function): A callback function invoked on every response. Receives `(req, res)`.

**Returns:**

- `Object`:
  - `pollyInstance`: The `Polly` instance.
  - `stop` (Function): An async function to flush and stop the Polly instance.

## Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the bundle:**
   ```bash
   npm run build
   ```
   This command uses `esbuild` to bundle the source into `dist/bundle.js`.

## License

MIT
