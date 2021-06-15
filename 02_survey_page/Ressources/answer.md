# Insufficient Form Validation
After inspecting the page source we can notice a form element inside __Make your choice__ table.
- the first input is hidden and the second has name **valeur** with an onchange event to post the form after changing one of the selects. 

# Vulnerability
- If we POST the form data using postman with a value more than 10 to this page we would get the flag.
  
# Fix
- Form data must be validated and sanitized so we can prevent undesired behavior. 
