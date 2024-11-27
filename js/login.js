$(document).ready(function() {
    $('#username').val(user.username);
    if (user.perfilImageChecked) {
        $('#userImage').attr('src', `assets/images/user-${user.perfilImageChecked}.png`);
    }
})

const onLogin = () => {
    if($('#password').val() === user.password) {
        window.location.href = "services.html";
    } else {
        alert('Contraseñas incorrectas');
    }
}