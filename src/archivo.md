---
title: "Archivo"
layout: "layouts/feed.html"
pagination:
    data: shows
    size: 5
permalink: "shows{% if pagination.pageNumber > 0 %}/page/{{ pagination.pageNumber }}{% endif %}/index.html"
paginationPrevText: "Más recientes"
paginationNextText: "Más antiguos"
paginationAnchor: "#post-list"
---
