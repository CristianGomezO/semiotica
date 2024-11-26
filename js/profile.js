$(document).ready(function() {
    const user = JSON.parse(sessionStorage.getItem('user')),
        profileContainer = document.querySelector('.perfil-image-selection')
        radioToSelect = profileContainer.querySelector(`input[type="radio"][value="${user.perfilImageChecked}"]`);

    if (radioToSelect) {
        radioToSelect.checked = true;
    }
    $('#firstName').val(user.firstName);
    $('#lastName').val(user.lastName);
    $('#birthDate').val(user.birthDate);
    $('#age').val(user.age);
    $('#email').val(user.email);
    $('#username').val(user.username);
    $('#password').val(user.password);
    $('#confirmPassword').val(user.confirmPassword);
})