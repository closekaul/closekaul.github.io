---
layout: default
---

<section class="hero">
    <img src="https://github.com/identicons/yash.png" alt="Yash's Avatar" class="avatar">
    <div class="hero-text">
        <h1>Hi, I'm Yash.</h1>
        <p>I’m a data, Analytics and AI leader in the life-insurance space, building enterprise-grade data and AI platforms across Snowflake, AWS, DBT, and modern ML systems. I lead enterprise analytics and applied AI projects that power underwriting, operations, and customer experience, with a focus on turning generative AI into real business leverage through automation, governance-first design, and product-driven thinking. Outside of work, I’m always travelling, cooking delicious food, spend time with family and friends</p>
    </div>
</section>

<div id="projects">
    <h2 class="section-title">Select Projects</h2>
    <ul class="content-list">
        {% for project in site.data.projects %}
        <li class="content-item">
            <a href="{{ project.link }}" class="item-title">{{ project.title }}</a>
            <span class="item-meta">{{ project.description }} // {{ project.year }}</span>
        </li>
        {% endfor %}
    </ul>
</div>

<div id="about" style="margin-top: 4rem;">
    <h2 class="section-title">About Me</h2>
    <div class="content-list" style="padding: 2rem;">
        <p>
            I'm a developer based in... well, wherever the wifi is good. I like simplicity in code and chaos in design.
            This site is a reflection of that. 
        </p>
        <br>
        <p>
            <strong>Stack:</strong> Jekyll, HTML5, CSS3, GitHub Pages.
        </p>
    </div>
</div>
