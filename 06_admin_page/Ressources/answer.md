# Admin access page
- After running nmap command to enumerate the server we can notice the following
__nmap -sV -p 80 --script http-enum 192.168.1.38__
| http-enum:
|   /admin/: Possible admin folder
|   /admin/index.php: Possible admin folder
|   /test.php: Test page
|_  /robots.txt: Robots file
|_http-server-header: nginx/1.8.0
- There is an admin page that need username and password to access.
- There is a robots file.
  
# Vulnerability
- After opening **robots.txt** file by accessing http://192.168.1.38/robots.txt we can notice that there are two directories, the __/whatever__ directory contains a file named htpasswd.
- The __htpasswd__ file contains **root:8621ffdbc5698829397d97767ac13db3**
- we can decrypt '8621ffdbc5698829397d97767ac13db3' from md5 to plaintext which gives us __dragon__
- After using the credentials above __root__:__dragon__ we can find our flag.
- - That GIF was worth it XD
  
# Fix
- You can protect your directories by an .htaccess
