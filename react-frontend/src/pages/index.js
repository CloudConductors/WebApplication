<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Homepage</title>
    <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="css/nav-bar-style.css" />

</head>
<body>
    <div id="navBar" class="main">
        <nav>
          <!-- all images from https://www.iconfinder.com/search?price=free -->
          <a href="/"><img id="logo" src="images/cloud-conductors-logo.svg" alt="logo"></a>
          <a href="dashboard.html"><img src="images/hamburger_icon.png" alt="dashboard" /></a>
          <a href="inProgess.html"><img src="images/pie-chart.webp" alt="analytics" /></a>
          <a href="schedule.html"><img src="images/schedule.png" alt="schedule" /></a>
          <a href="inProgess.html"><img src="images/alert.webp" alt="alert" /></a>
          <a href="inProgess.html"><img src="images/team.png" alt="team" /></a>
        </nav>
     </div>
    <header>
        <div class="top-bar">
            <div class="logo-container">
                <a href=""><img class="logo-image" src="images/cloud-conductors-logo.svg" alt="logo"></a>
                <div class="logo-text">
                    <p class="team-name">Cloud Conductors</p>
                </div>
            </div>

            <div class="search-container">
                <div class="search-box">
                    <input
                        id="search-box"
                        type="text"
                        class="form-control"
                        placeholder="Search anything"
                        >
                    <button class="search-btn" onclick="location.href='/search'">
                            <img src="images/magnify.svg" alt="search-icon" class="search-icon">
                    </button>
                </div>
            </div>

            <div class="access-account-buttons">
                <div class="button-1">
                    <button class="login-button" onclick="location.href='login.html'">Login</button>
                </div>

                <div class="button-2">
                    <button class="sign-up-button" onclick="location.href='signup.html'">Sign Up</button>
                </div>
            </div>

        </div>

    </header>

    <div class="hero-banner">
        <div class="hero-container">
            <h1 id="title-1">Smart</h1>
            <h1 id="title-2">Maintenance</h1>
            <p id="paragraph-one">Predicting and Preventing Failures in Transportation Systems Using IoT and AI</p>
        </div>

        <div class="button-3">
            <button id="explore-button">Explore</button>
        </div>
    </div>
    
<footer>
    <div class="footer">
        <p>About</p>
        <p>Developers</p>
        <p>©Cloud Conductors</p>
    </div>

</footer>
</body>
</html>
