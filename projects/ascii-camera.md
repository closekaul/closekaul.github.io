---
layout: default
title: ASCII Art Camera
---

<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/ascii-camera.css">

<div class="ascii-camera">
    <div class="ascii-camera__header">
        <a href="{{ site.baseurl }}/#feed-section" class="ascii-camera__back">&larr; Back to Feed</a>
        <h1 class="ascii-camera__title">ASCII ART CAMERA</h1>
        <p class="ascii-camera__subtitle">REAL-TIME WEBCAM → ASCII CONVERTER</p>
    </div>

    <div class="ascii-camera__viewport">
        <div class="ascii-camera__scanlines"></div>
        <div class="ascii-camera__output-wrap">
            <pre id="ascii-output" class="ascii-camera__output">[ CAMERA OFFLINE ]</pre>
            <canvas id="ascii-canvas" class="ascii-camera__canvas" style="display:none;"></canvas>
        </div>
        <video id="ascii-video" autoplay playsinline style="display:none;"></video>
        <canvas id="ascii-sample" style="display:none;"></canvas>
    </div>

    <div class="ascii-camera__controls">
        <div class="ascii-camera__control-group">
            <label class="ascii-camera__label">RESOLUTION</label>
            <input type="range" id="ascii-resolution" class="ascii-camera__slider" min="40" max="200" value="100">
            <span id="ascii-res-value" class="ascii-camera__value">100</span>
        </div>

        <div class="ascii-camera__control-group">
            <label class="ascii-camera__label">COLOR</label>
            <button id="ascii-color-toggle" class="ascii-camera__toggle" data-active="false">OFF</button>
        </div>

        <div class="ascii-camera__control-group">
            <label class="ascii-camera__label">CHARSET</label>
            <select id="ascii-charset" class="ascii-camera__select">
                <option value="standard">Standard</option>
                <option value="detailed">Detailed</option>
                <option value="blocks">Blocks</option>
                <option value="minimal">Minimal</option>
            </select>
        </div>

        <div class="ascii-camera__control-group ascii-camera__actions">
            <button id="ascii-screenshot" class="ascii-camera__btn">SCREENSHOT</button>
            <button id="ascii-copy" class="ascii-camera__btn">COPY TEXT</button>
        </div>
    </div>

    <button id="ascii-start" class="ascii-camera__start-btn">▶ START CAMERA</button>
</div>

<script src="{{ site.baseurl }}/assets/js/ascii-camera.js"></script>
