# XSS Object Image
- By visiting the url __/index.php?page=media&src=nsa__
# Vulnerability
- Looking at the source the website uses __<object>__ tag to show the nsa image and not validating the GET request.
- if we modify **src** in the get request to a encoded script tag to base64 we can find the flag.
-  __/index.php?page=media&src=data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4=__

# Fix
- To embed a picture, it is better to use the <img> tag, with image name in database.
- Never display user input.
- Sanitize user input.