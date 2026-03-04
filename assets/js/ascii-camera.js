(function () {
    'use strict';

    const CHARSETS = {
        standard:  ' .:-=+*#%@',
        detailed:  " .',:;clodxkO0KXN",
        blocks:    ' ░▒▓█',
        minimal:   ' .oO@'
    };

    // DOM refs
    const video       = document.getElementById('ascii-video');
    const sampleCanvas = document.getElementById('ascii-sample');
    const sampleCtx   = sampleCanvas.getContext('2d', { willReadFrequently: true });
    const output      = document.getElementById('ascii-output');
    const colorCanvas = document.getElementById('ascii-canvas');
    const colorCtx    = colorCanvas.getContext('2d');
    const startBtn    = document.getElementById('ascii-start');
    const resSlider   = document.getElementById('ascii-resolution');
    const resValue    = document.getElementById('ascii-res-value');
    const colorToggle = document.getElementById('ascii-color-toggle');
    const charsetSel  = document.getElementById('ascii-charset');
    const screenshotBtn = document.getElementById('ascii-screenshot');
    const copyBtn     = document.getElementById('ascii-copy');

    let running = false;
    let stream  = null;
    let colorMode = false;
    let cols = 100;
    let charset = CHARSETS.standard;
    let lastAscii = '';
    let animId = null;

    // Controls
    resSlider.addEventListener('input', function () {
        cols = parseInt(this.value, 10);
        resValue.textContent = cols;
    });

    colorToggle.addEventListener('click', function () {
        colorMode = !colorMode;
        this.textContent = colorMode ? 'ON' : 'OFF';
        this.dataset.active = colorMode;

        if (colorMode) {
            output.style.display = 'none';
            colorCanvas.style.display = 'block';
        } else {
            output.style.display = 'block';
            colorCanvas.style.display = 'none';
        }
    });

    charsetSel.addEventListener('change', function () {
        charset = CHARSETS[this.value];
    });

    startBtn.addEventListener('click', function () {
        if (running) {
            stopCamera();
        } else {
            startCamera();
        }
    });

    screenshotBtn.addEventListener('click', saveScreenshot);
    copyBtn.addEventListener('click', copyText);

    // Camera
    async function startCamera() {
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } }
            });
            video.srcObject = stream;
            await video.play();
            running = true;
            startBtn.textContent = '■ STOP CAMERA';
            startBtn.classList.add('active');
            output.textContent = '';
            renderLoop();
        } catch (err) {
            output.textContent = '[ CAMERA ACCESS DENIED ]\n\nPlease allow camera\npermissions and try again.';
        }
    }

    function stopCamera() {
        running = false;
        if (animId) cancelAnimationFrame(animId);
        if (stream) {
            stream.getTracks().forEach(function (t) { t.stop(); });
            stream = null;
        }
        video.srcObject = null;
        startBtn.textContent = '▶ START CAMERA';
        startBtn.classList.remove('active');
        output.style.display = 'block';
        colorCanvas.style.display = 'none';
        output.textContent = '[ CAMERA OFFLINE ]';
    }

    // Render loop
    function renderLoop() {
        if (!running) return;

        var vw = video.videoWidth;
        var vh = video.videoHeight;
        if (!vw || !vh) {
            animId = requestAnimationFrame(renderLoop);
            return;
        }

        var aspectRatio = vh / vw;
        var rows = Math.floor(cols * aspectRatio * 0.45);

        sampleCanvas.width = cols;
        sampleCanvas.height = rows;
        sampleCtx.drawImage(video, 0, 0, cols, rows);

        var imageData = sampleCtx.getImageData(0, 0, cols, rows);
        var pixels = imageData.data;

        if (colorMode) {
            renderColor(pixels, cols, rows);
        } else {
            renderMono(pixels, cols, rows);
        }

        animId = requestAnimationFrame(renderLoop);
    }

    function renderMono(pixels, w, h) {
        var lines = [];
        var len = charset.length;
        for (var y = 0; y < h; y++) {
            var line = '';
            for (var x = 0; x < w; x++) {
                var i = (y * w + x) * 4;
                var brightness = (pixels[i] * 0.299 + pixels[i + 1] * 0.587 + pixels[i + 2] * 0.114) / 255;
                var charIdx = Math.floor(brightness * (len - 1));
                line += charset[charIdx];
            }
            lines.push(line);
        }
        lastAscii = lines.join('\n');
        output.textContent = lastAscii;
    }

    function renderColor(pixels, w, h) {
        var charSize = 8;
        colorCanvas.width = w * charSize;
        colorCanvas.height = h * charSize;
        colorCanvas.style.display = 'block';
        output.style.display = 'none';

        colorCtx.fillStyle = '#0a0a0f';
        colorCtx.fillRect(0, 0, colorCanvas.width, colorCanvas.height);
        colorCtx.font = charSize + 'px Fira Code, monospace';
        colorCtx.textBaseline = 'top';

        var len = charset.length;
        var lines = [];
        for (var y = 0; y < h; y++) {
            var line = '';
            for (var x = 0; x < w; x++) {
                var i = (y * w + x) * 4;
                var r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
                var brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
                var charIdx = Math.floor(brightness * (len - 1));
                var ch = charset[charIdx];
                line += ch;
                colorCtx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
                colorCtx.fillText(ch, x * charSize, y * charSize);
            }
            lines.push(line);
        }
        lastAscii = lines.join('\n');
    }

    // Export
    function saveScreenshot() {
        if (!lastAscii && !colorMode) return;

        if (colorMode && colorCanvas.width > 0) {
            colorCanvas.toBlob(function (blob) {
                var url = URL.createObjectURL(blob);
                downloadFile(url, 'ascii-art.png');
                URL.revokeObjectURL(url);
            });
        } else {
            // Render mono text to a temp canvas for download
            var tempCanvas = document.createElement('canvas');
            var ctx = tempCanvas.getContext('2d');
            var lines = lastAscii.split('\n');
            var charW = 6, charH = 8;
            tempCanvas.width = (lines[0] || '').length * charW + 20;
            tempCanvas.height = lines.length * charH + 20;
            ctx.fillStyle = '#0a0a0f';
            ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
            ctx.font = charH + 'px Fira Code, monospace';
            ctx.fillStyle = '#00ff00';
            ctx.textBaseline = 'top';
            for (var i = 0; i < lines.length; i++) {
                ctx.fillText(lines[i], 10, 10 + i * charH);
            }
            tempCanvas.toBlob(function (blob) {
                var url = URL.createObjectURL(blob);
                downloadFile(url, 'ascii-art.png');
                URL.revokeObjectURL(url);
            });
        }
    }

    function downloadFile(url, filename) {
        var a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    function copyText() {
        if (!lastAscii) return;
        navigator.clipboard.writeText(lastAscii).then(function () {
            var orig = copyBtn.textContent;
            copyBtn.textContent = 'COPIED!';
            setTimeout(function () { copyBtn.textContent = orig; }, 1500);
        });
    }
})();
