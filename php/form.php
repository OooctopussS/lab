<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $filename = '../data/regData.txt';

    $FirstName = $_POST['firstname'];
    if (empty($_POST['middlename'])) $MiddleName = '-';
    else $MiddleName = $_POST['middlename'];
    $SecondName = $_POST['secondname'];

    $Email = $_POST['email'];
    $Password = $_POST['password'];
    $Telephone = $_POST['tel'];

    $UserRole = $_POST['roleUser'];
    $Reputation = $_POST['reputation'];
    $BirthDay = $_POST['birthday'];

    $Signature = $_POST['signature'];

    if (empty($_POST['toEmail'])) $SendToEmail = 'No';
    else $SendToEmail = 'Yes';
    $Feedback = $_POST['feedback'];
    $LikeSite = $_POST['likeSite'];

    if ($_FILES["avatar"]["error"] > 0) echo "Error: " . $_FILES["avatar"]["error"] . "<br />";
    else
    {
        $tmp_name = $_FILES["avatar"]["tmp_name"];
        $name = basename($_FILES["avatar"]["name"]);
        move_uploaded_file($tmp_name, "../data/$name");
    }

    if ($LikeSite == 'Yes') $LikeSite = 'Yes';
    else $LikeSite = 'No';

    $text = "FirstName: " . $FirstName . "\n" . "MiddleName: " . $MiddleName . "\n" . "LastName: " . $SecondName . "\n" ."Email: " . $Email . "\n"
    . "Password: " . $Password . "\n" . "Telephone: " . $Telephone . "\n" . "User role: " . $UserRole . "\n" . "Reputation: " . $Reputation . "\n"
    . "BirthDay: " . $BirthDay . "\n" .  "Signature: " . $Signature . "\n"
    . "Send login and password to Email: " . $SendToEmail . "\n" . "Feedback: " . $Feedback . "\n" . "Liked the site: " . $LikeSite . "\n";
    

    $handler = fopen($filename, "w");
    if (flock($handler, LOCK_EX)) {
        fwrite($handler, $text);
        flock($handler, LOCK_UN);
    }

    echo '
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Registration</title>
            <link rel="stylesheet" href="../css/reset.css">
            <link rel="stylesheet" href="../css/regForm.css">
        </head>
        <body>
            <header class="header">
                <div class="container">
                    <div class="header-row">
                        <div class="header-row-logo"><a href="../index.html" class="header-row-logo-link">Lab1</a></div>
                        <nav class="header-row-nav">
                            <a href="../index.html" class="header-row-nav-item"><span>Статья</span></a>
                            <a href="../statistic.html" class="header-row-nav-item"><span>Статистика</span></a>
                            <a href="../note.html" class="header-row-nav-item"><span>Заметки</span></a>
                            <a href="../RegistrForm.html" class="header-row-nav-item"><span>Анкета</span></a>
                        </nav>
                 </div>
             </div>
            </header>
        </body>
        <div id="main" class="main">
            <div class="container">
                <div class="main-content">
                <a href="../data/regData.txt" class="linkToFile">Ссылка на файл.</a>
                <img src="../data/'. $name. '" alt="Содержимое файла" class="imageForm" width = "200" height = "160">
                </div>
            </div>
        </div>
    ';
}
