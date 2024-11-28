$(document).ready(function() {
    if (user) {
        $('#username').val(user.username);
        if (user.perfilImageChecked) {
            $('#userImage').attr('src', `assets/images/user-${user.perfilImageChecked}.png`);
        }
    }
})

const onLogin = () => {
    if($('#password').val() === user.password) {
        window.location.href = "catalog.html";
    } else {
        alert('Contraseñas incorrectas');
    }
}