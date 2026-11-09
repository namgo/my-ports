#!/bin/sh

echo "Patching /usr/ports/UIDs and /usr/ports/GIDs with ports users"
grep -q 'seerr:\*:490:' /usr/ports/GIDs || echo 'seerr:*:490:' >> /usr/ports/GIDs
grep -q 'seerr:\*:490:' /usr/ports/UIDs || echo 'seerr:*:490:490::0:0:Seerr user:/usr/local/share/seerr:/usr/sbin/nologin' >> /usr/ports/UIDs

