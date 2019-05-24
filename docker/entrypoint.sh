#!/bin/sh
echo "hello"
cp /usr/share/nginx/html/index.html /tmp/
sed -i "s|{{{{data}}}}|$DATA_ENDPOINT|g" /tmp/index.html
sed -i "s|{{{{socket}}}}|$SOCKET_ENDPOINT|g" /tmp/index.html
sed -i "s|<base href=\"/\">|<base href=\"${BASE_HREF:-/}\">|g" /tmp/index.html
cp /tmp/index.html /usr/share/nginx/html/index.html
nginx -g 'daemon off;'
