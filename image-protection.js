// Enhanced Image Protection Script
// Makes it significantly harder to download/copy images

(function() {
    'use strict';

    // 1. Enhanced overlay protection - blocks direct image access
    function addOverlayProtection() {
        const style = document.createElement('style');
        style.textContent = `
            .photo, .pane, .product-card, .panel-image {
                position: relative;
            }
            .photo::after, .pane::after, .product-card::after, .panel-image::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 999;
                background: transparent;
                pointer-events: auto;
                cursor: default;
            }
            .home-circle {
                z-index: 10000 !important;
                pointer-events: auto !important;
            }
            .photo img, .pane img, .product-image, .panel-image img {
                pointer-events: none;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }
        `;
        document.head.appendChild(style);
    }

    // 2. Disable all context menus on images
    document.addEventListener('contextmenu', function(e) {
        if (e.target.tagName === 'IMG' || 
            e.target.closest('.photo') || 
            e.target.closest('.pane') ||
            e.target.closest('.product-card') ||
            e.target.closest('.panel-image')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }, true);

    // 3. Disable drag and drop
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG' || 
            e.target.closest('.photo') ||
            e.target.closest('.pane') ||
            e.target.closest('.product-card') ||
            e.target.closest('.panel-image')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }, true);

    // 4. Disable copy/paste
    document.addEventListener('copy', function(e) {
        if (window.getSelection().toString().length > 0) {
            e.preventDefault();
            return false;
        }
    });

    // 5. Disable keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Disable Save (Ctrl+S, Cmd+S)
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            return false;
        }
        // Disable Print (Ctrl+P, Cmd+P)
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            return false;
        }
        // Disable Select All (Ctrl+A, Cmd+A)
        if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
            e.preventDefault();
            return false;
        }
        // Disable View Source (Ctrl+U, Cmd+U)
        if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
            e.preventDefault();
            return false;
        }
        // Disable Inspect (F12, Ctrl+Shift+I, Cmd+Option+I)
        if (e.key === 'F12' || 
            ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') ||
            ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C')) {
            e.preventDefault();
            return false;
        }
        // Disable Screenshot (Print Screen, Cmd+Shift+3, etc.)
        if (e.key === 'PrintScreen' || 
            (e.metaKey && e.shiftKey && (e.key === '3' || e.key === '4'))) {
            e.preventDefault();
            return false;
        }
    });

    // 6. Disable text selection on images
    document.addEventListener('selectstart', function(e) {
        if (e.target.tagName === 'IMG' || 
            e.target.closest('.photo') ||
            e.target.closest('.pane') ||
            e.target.closest('.product-card') ||
            e.target.closest('.panel-image')) {
            e.preventDefault();
            return false;
        }
    });

    // 7. Disable image saving via mouse
    document.addEventListener('mousedown', function(e) {
        if (e.target.tagName === 'IMG' || 
            e.target.closest('.photo') ||
            e.target.closest('.pane') ||
            e.target.closest('.product-card') ||
            e.target.closest('.panel-image')) {
            if (e.button === 1 || e.button === 2) { // Middle or right mouse button
                e.preventDefault();
                return false;
            }
        }
    });

    // 8. Blur page when dev tools detected (optional - can be annoying)
    let devToolsOpen = false;
    setInterval(function() {
        if (window.outerHeight - window.innerHeight > 200 || 
            window.outerWidth - window.innerWidth > 200) {
            if (!devToolsOpen) {
                devToolsOpen = true;
                document.body.style.filter = 'blur(5px)';
            }
        } else {
            if (devToolsOpen) {
                devToolsOpen = false;
                document.body.style.filter = 'none';
            }
        }
    }, 500);

    // 9. Disable image loading via direct URL (add referrer check)
    // Note: This requires server-side support, but we can add a client-side check
    document.addEventListener('DOMContentLoaded', function() {
        const images = document.querySelectorAll('img');
        images.forEach(function(img) {
            // Add onerror handler to prevent direct access
            img.onerror = function() {
                this.style.display = 'none';
            };
            
            // Prevent direct image access
            Object.defineProperty(img, 'src', {
                get: function() {
                    return this.getAttribute('src');
                },
                set: function(value) {
                    this.setAttribute('src', value);
                }
            });
        });
    });

    // 10. Add watermark overlay (optional - uncomment to enable)
    /*
    function addWatermark() {
        const watermark = document.createElement('div');
        watermark.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9998;
            background-image: repeating-linear-gradient(
                45deg,
                transparent,
                transparent 100px,
                rgba(0,0,0,0.03) 100px,
                rgba(0,0,0,0.03) 200px
            );
        `;
        document.body.appendChild(watermark);
    }
    addWatermark();
    */

    // Initialize protection
    addOverlayProtection();

    // Console warning
    console.log('%cStop!', 'color: red; font-size: 50px; font-weight: bold;');
    console.log('%cThis is a browser feature intended for developers. Do not paste any code here.', 'color: red; font-size: 16px;');
})();

