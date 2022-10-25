#/bin/bash
sed -i 's/developer\///g' /usr/share/index.html > /usr/share/nginx/html/index.html
envsubst < /usr/share/index.html > /usr/share/nginx/html/index.html
