# Admin access page

- Because we found robots.txt file with hidden directories we can notice that there are mulitple ones with a readme file inside them
- http://<<darkly_ip>>/.hidden

- We can use the command 
__wget -m -r -l inf -k -p -E -e robots=off http://<<darkly_ip>>/.hidden__

- -m: This option turns on recursion and time-stamping.
- -r: Turn on recursive retrieving.
- -k: Conver Links, After the download is complete, convert the links in the document to make them suitable for local viewing. 
- -p: This option causes Wget to download all the files that are necessary to properly display a given HTML page.
- -E: adjust-extension this option will cause the suffix .html to be appended to the local filename.
- -e: Executes Command, robots=off causes it to ignore robots.txt for that domain
- -l: level option we given it **inf** infinite

- Which gives us a folder with Readme directories contents.
we access it
cd <darkly_ip>

and then use find command to get all files named README and then get their content using cat then puting the output to a file named res

__find . -name "README" -exec cat {} + > res__

now we look fora hash using grep

__cat res | grep [0-9]__