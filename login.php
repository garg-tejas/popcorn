<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login</title>
    <link rel="stylesheet" href="css/login-style.css" />
</head>

<body>
    <div class="container">
        <form action="systuum/login.php" method="post" class="login-form">
            <h1>Login</h1>
            <div class="form-group">
                <input type="text" name="login" id="login" placeholder="Username or Email" required />
            </div>
            <div class="form-group">
                <input type="password" name="password" id="password" placeholder="Password" required />
            </div>
            <button type="submit">Login</button>
            <br>
            <a href="signup.php">Create A New Account</a>
        </form>
    </div>
</body>

</html>