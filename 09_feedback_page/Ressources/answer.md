# XSS in Feedback Page
- In the feedback page you can comment and sign a guestbook.
- we can test if its vulnerable to an xss attack.
# Vulnerability
- If we inject a script tag in comment it will filter it.
- But if we type script or alert in the comments or name it shows us a flag
# Fix
- if its an xss attack we can sanitize the input using regex or escape functions