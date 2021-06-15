# Hidden Input Inside Form
After inspecting the page source we can notice the form element inside it there's a hidden input containing the webmaster's email as a value.
# Vulnerability
- We can change the value of that hidden input to our own email.
- Its also vulnerable for email bombing attacks.
# Fix
- Avoid using hidden inputs alltogether.