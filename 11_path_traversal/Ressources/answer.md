# Path Traversal
We know the website uses nginx, so we can test a UNIX variant path traversal attack.

# Vulnerability
If we test values like ../ in the /page GET request we get alerts trolling us.
After some tries we can get the flag in this request
- http://192.168.1.38/?page=/../../../../../../../etc/passwd
- the alert shows the flag
# Fix
- You can protect by black listing chars to filter ../ and similar strings and whitelisting permitted names.
