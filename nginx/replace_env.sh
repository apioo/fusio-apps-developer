#/bin/bash
envsubst < /usr/share/index.html > /usr/share/nginx/html/index.html
sed -i 's/developer\///g' /usr/share/nginx/html/index.html
