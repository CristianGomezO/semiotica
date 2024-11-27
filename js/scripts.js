const user = JSON.parse(sessionStorage.getItem('user'));
$(document).ready(function() {
    $('#usernameSidebar').text(user.username);
    if (user.perfilImageChecked) {
        $('#userImage').attr('src', `assets/images/user-${user.perfilImageChecked}.png`);
    }

    const theme = localStorage.getItem('theme'), 
        fontSize = localStorage.getItem('fontSize');
    document.documentElement.setAttribute('theme', theme);

    let logoSrc = "logo.png";
    if (theme === "dark") {
        logoSrc = "logo-inverted.png";
    }
    $(".logo-container img").attr("src", 'assets/images/' + logoSrc);

    if (fontSize) {
        document.documentElement.style.setProperty("--font-size", fontSize);
    }
})

const onLogout = () => {
    sessionStorage.clear();
}