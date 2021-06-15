# Cookie Tampering
- We can notice that this website uses a cookie by the name **I_am_admin**, which could be an indication that the currrent user is an admin.
# Vulnerability
- The value of that cookie is __68934a3e9455fa72420237eb05902327__ which is an md5 hashed **false** boolean value.
- We can change this value by encrypting **true** with md5.
- After we access another page the website shows an alert: 
__Good job! Flag : df2eb4ba34ed059a1e3e89ff4dfc13445f104a1a52295214def1c4fb1693a5c3__
# Fix
- Cookies should not contain sensitive information.
