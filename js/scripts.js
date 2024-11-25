const user = JSON.parse(sessionStorage.getItem('user'));
$(document).ready(function() {
    $('#username').text(user.username);
    if (user.perfilImageChecked) {
        $('#userImage').attr('src', `assets/images/user-${user.perfilImageChecked}.png`);
    }
})

const onLogout = () => {
    sessionStorage.clear();
}