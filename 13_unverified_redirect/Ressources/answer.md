# Hidden Input Inside Form
- In the main page source footer, there are links to social media.
- The website uses "index.php?page=redirect&site=facebook" to redirect the user.
  
# Vulnerability
- We can inject other websites in the __site__ GET variable, by doing that we get the flag.
  
# Fix
- Avoid redirecting using POST or GET.
- Protect GET variables by validation.
