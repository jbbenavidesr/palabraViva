---
title: "Archivo"
layout: "layouts/feed.html"
pagination:
  data: collections.evangelios
  size: 5
permalink: 'archivo{% if pagination.pageNumber > 0 %}/page/{{ pagination.pageNumber }}{% endif %}/index.html'
paginationPrevText: 'Más recientes'
paginationNextText: 'Más antiguos'
paginationAnchor: '#post-list'
---
