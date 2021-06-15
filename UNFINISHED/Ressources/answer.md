# Hidden Directory
- After running nmap command to enumerate the server we can notice the following
__nmap -sV -p 80 --script http-enum 192.168.1.38__
| http-enum:
|   /admin/: Possible admin folder
|   /admin/index.php: Possible admin folder
|   /test.php: Test page
|_  /robots.txt: Robots file
|_http-server-header: nginx/1.8.0
- There is a robots file.

# Vulnerability
- After opening **robots.txt** file byt accessing http://192.168.1.38/robots.txt we can notice that there are two directories, the __/.hidden/__ directory contains multiple subdirectories.
- After using __dirhunt__ with this command
 **dirhunt http://192.168.1.38/ -f README --to-file results.json**
We can notice a README file with the flag from the results.json.
# Fix
- You can protect your directories by an .htaccess
# Tools
- Dirhunt docs: https://docs.nekmo.org/dirhunt/usage.html

