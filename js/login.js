$(document).ready(function() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    $('#username').val(user.username);
    if (user.perfilImageChecked) {
        $('#userImage').attr('src', `assets/images/user-${user.perfilImageChecked}.png`);
    }
})

const onLogin = () => {
    sessionStorage.setItem('email', $('#email').val());
    window.location.href = "services-managment.html";
}