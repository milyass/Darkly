# User-agent and Referer
After visiting the bornToSec footer link, that takes us into a albatros page with __AronChupa - I'm an Albatraoz__ playing in the background.
It appears in the source that theres a long comment with two hints
- 1 >  __"You must cumming from : "https://www.nsa.gov/" to go to the next step"__ refrences the **Referer** HTTP request header.
- 2 > __"Let's use this browser : "ft_bornToSec". It will help you a lot."__ refrences the **User-Agent** HTTP request header.

# Vulnerability
- Using Postman we can edit these infos and look at the response
    User-Agent:ft_bornToSec
    Referer:https://www.nsa.gov/
- Which gives us the flag: f2a29020ef3132e01dd61df97fd33ec8d7fcd1388cc9601e7db691d17d4d6188
  
# Fix
- It's bad to leave comments containing sensitive info on the page source especially if you're working with the NSA.