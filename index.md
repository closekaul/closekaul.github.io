---
layout: default
---

<section class="hero">
    <img src="{{ site.author.avatar }}" alt="{{ site.author.name }}'s Avatar" class="avatar">
    <div class="hero-text">
        <h1>Hi, I'm Yash.</h1>
        <p>I’m a data, Analytics and AI leader in the life-insurance space, building enterprise-grade data and AI platforms across Snowflake, AWS, DBT, and modern ML systems.</p>
        <p>I lead enterprise analytics and applied AI projects that power underwriting, operations, and customer experience, with a focus on turning generative AI into real business leverage through automation, governance-first design, and product-driven thinking.</p>
        <p>Outside of work, I’m always traveling, cooking delicious food and spending time with my family and friends. I'm based in... well, wherever the wifi is good.</p>
    </div>
</section>

<div id="feed-section">
    <div class="filters">
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="projects">Projects</button>
        <button class="filter-btn" data-filter="blog">Blog</button>
        <button class="filter-btn" data-filter="research">Research</button>
    </div>

    <ul class="content-list" id="feed-list">
        {% for item in site.data.content %}
        <li class="content-item" data-category="{{ item.category }}">
            <a href="{{ item.link }}" class="item-title">{{ item.title }}</a>
            <span class="item-meta">
                <span class="category-tag">[{{ item.category | upcase }}]</span> 
                {{ item.description }} // {{ item.year }}
            </span>
        </li>
        {% endfor %}
    </ul>
</div>