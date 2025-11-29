# Security Headers Implementation

This document describes the security headers implementation for the vibing website.

## Overview

The website implements multiple security headers to protect against common web vulnerabilities including:
- Cross-Site Scripting (XSS)
- Code injection attacks
- Clickjacking
- Data injection attacks
- MIME type confusion attacks
- Information leakage

## Security Headers

All HTML pages include the following security-related meta tags:

### Content Security Policy (CSP)

The CSP policy includes SHA-256 hashes for all JavaScript files to ensure script integrity:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'sha256-[hash]'; style-src 'self'; img-src 'self' data: https://avatars.githubusercontent.com; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self';">
```

Each page includes hashes only for the scripts it uses. The hashes are generated using SHA-256 and added to the `script-src` directive.

### X-Content-Type-Options

```html
<meta http-equiv="X-Content-Type-Options" content="nosniff">
```

Prevents browsers from MIME-sniffing a response away from the declared content-type, protecting against MIME confusion attacks.

### X-Frame-Options

```html
<meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
```

Prevents the page from being embedded in frames/iframes from other origins, protecting against clickjacking attacks.

### Referrer-Policy

```html
<meta name="referrer" content="strict-origin-when-cross-origin">
```

Controls how much referrer information is sent with requests. This policy sends the origin when making cross-origin requests but full URL for same-origin requests.

### Permissions-Policy

```html
<meta http-equiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=()">
```

Restricts browser features like geolocation, microphone, and camera access to prevent unauthorized use.

## CSP Policy Details

- **default-src 'self'**: Only allow resources from the same origin by default
- **script-src 'self' 'sha256-[hash]'**: Only allow scripts from the same origin or scripts matching the specified SHA-256 hashes, blocks inline scripts and eval()
- **style-src 'self'**: Only allow styles from the same origin, blocks inline styles
- **img-src 'self' data: https://avatars.githubusercontent.com**: Allow images from same origin, data URIs, and GitHub avatars
- **font-src 'self'**: Only allow fonts from the same origin
- **connect-src 'self'**: Only allow AJAX/fetch requests to the same origin
- **object-src 'none'**: Disallow all plugins (Flash, Java, etc.)
- **base-uri 'self'**: Prevent base tag injection attacks
- **form-action 'self'**: Only allow form submissions to the same origin

### JavaScript File Hashes

Each JavaScript file has a SHA-256 hash included in the CSP header. This provides an additional layer of security by ensuring that only scripts with the exact expected content can execute:

- **carousel.js**: `sha256-miLfQ8pMGIgQfIOc6HqvpXQYb8nc1hip6cn9tDmNUeE=`
- **csp-test.js**: `sha256-FpyOk+CfqxfAsFfYEI3ruDYaqLItLcbFB1+rqhWTYjY=`
- **data-loader.js**: `sha256-Wr82wZpvgZd76fe9SvRrd0TcGjsnPAovRHNS9/Yahq4=`
- **nav-toggle.js**: `sha256-G6Fl8tlTz9JTbXXKl+6/erUjuj4Im/GpZTpG+DE5wBQ=`
- **news-init.js**: `sha256-a2+7ROhLhCtq8TS6PdosIPpsb8JUTjYa7qDjmiQDnhw=`
- **projects-init.js**: `sha256-BGbCF6SwkgKebwJM7UKa/rZMq5svt9czb9cYpsNy/p0=`
- **year.js**: `sha256-zsfr1IwefeYWI/m653quQJ68QmDW9ax22UtCZdroag0=`

**Note**: If any JavaScript file is modified, its hash must be regenerated and updated in all HTML files that reference it. To regenerate a hash:
```bash
openssl dgst -sha256 -binary filename.js | openssl base64
```

## Security Features

### 1. No Inline Scripts
All JavaScript code is in external files. Inline scripts are blocked by the CSP.

**Before (blocked by CSP):**
```html
<script>
  document.getElementById('test').textContent = 'Hello';
</script>
```

**After (allowed by CSP):**
```html
<script type="module" src="/vibing/js/example.js"></script>
```

### 2. No Inline Event Handlers
Event handlers are attached via JavaScript in external files, not inline in HTML.

**Before (blocked by CSP):**
```html
<button onclick="handleClick()">Click me</button>
```

**After (allowed by CSP):**
```html
<button id="my-button">Click me</button>
<script type="module" src="/vibing/js/button-handler.js"></script>
```

### 3. No eval() or Similar Functions
The CSP blocks eval(), Function(), setTimeout/setInterval with strings, and similar dynamic code execution.

**Blocked by CSP:**
```javascript
eval('console.log("test")'); // Throws EvalError
new Function('return 2 + 2')(); // Throws EvalError
setTimeout('doSomething()', 1000); // Throws EvalError
```

**Allowed alternatives:**
```javascript
console.log("test"); // Direct code execution
const fn = () => 2 + 2; fn(); // Function reference
setTimeout(() => doSomething(), 1000); // Function reference
```

### 4. No Inline Styles
Styles are loaded from external CSS files. Inline styles are blocked by the CSP.

**Before (blocked by CSP):**
```html
<div style="color: red;">Text</div>
```

**After (allowed by CSP):**
```html
<div class="text-danger">Text</div>
```

## JavaScript Files

All JavaScript files use ES6 modules for better encapsulation and security:

- `/vibing/js/carousel.js` - Carousel component
- `/vibing/js/year.js` - Dynamic year in footer
- `/vibing/js/nav-toggle.js` - Mobile navigation toggle
- `/vibing/js/data-loader.js` - Data loading utilities with XSS protection
- `/vibing/js/projects-init.js` - Projects page initialization
- `/vibing/js/news-init.js` - News page initialization

## Testing

A test page is available at `/public/csp-test.html` that verifies:
1. Inline scripts are blocked ✓
2. Inline event handlers are blocked ✓
3. eval() is blocked ✓
4. External scripts work correctly ✓

To run the tests:
1. Serve the public directory with a web server
2. Navigate to `/csp-test.html`
3. Check the browser console for CSP violation reports
4. Verify all tests show PASS status

## Browser Support

This CSP implementation is supported by all modern browsers:
- Chrome 25+
- Firefox 23+
- Safari 7+
- Edge 12+

## Benefits

1. **Prevents XSS attacks**: Inline scripts cannot be injected and executed
2. **Prevents code injection**: eval() and similar functions are blocked
3. **Reduces attack surface**: Only allows resources from trusted sources
4. **Defense in depth**: Multiple security layers working together
5. **Clear security model**: Easy to audit and verify security properties

## Maintenance

When adding new features:
1. **Never use inline scripts** - always use external JavaScript files
2. **Never use inline event handlers** - attach handlers in JavaScript
3. **Never use inline styles** - use CSS classes
4. **Avoid eval()** - use direct code or function references
5. **Test with CSP** - verify new features work with strict CSP

## References

- [MDN: Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/)
- [OWASP: Content Security Policy Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)
