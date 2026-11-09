# Namgo's ports

Things not in FreeBSD ports, things I will try to upstream eventually

## UIDs/GIDs setup

I don't know if there's a better way to set up a service UID for ports usage outside of the primary ports trees than the script `SETUP_UIDs.sh`.

490 (unused otherwise): seerr

## References/notes

The bulk of Seerr work was from [daemonless/seerr](https://github.com/daemonless/seerr/) and I inherited the post-build patch approach with scripts. I don't know if there is a better way to patch `dist/` but if you have ideas please leave an issue or a PR.
