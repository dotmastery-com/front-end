#!/bin/sh
sed -i "s|{{{{data}}}}|$DATA_ENDPOINT|g" /usr/share/nginx/html/index.html
sed -i "s|{{{{socket}}}}|$SOCKET_ENDPOINT|g" /usr/share/nginx/html/index.html
sed -i "s|<base href=\"/\">|<base href=\"${BASE_HREF:-/}\">|g" /usr/share/nginx/html/index.html
nginx -g 'daemon off;'
