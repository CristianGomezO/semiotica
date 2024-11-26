$(document).ready(function() {
    const path = document.location.pathname;
    const currentHTMLFile = path.substring(path.lastIndexOf('/') + 1);

    $.validator.addMethod("birthDateValidation", function(value, element) {
        const birthDate = new Date(value);
        return birthDate < new Date();
    }, "La fecha de nacimiento debe ser antes de la fecha actual.");

    $.validator.addMethod("passwordStrength", function(value, element) {
        return this.optional(element) || /^(?=(.*\d.*\d))(.*[A-Z])(?=.*[\W_]).{8,}$/.test(value);
    }, "La contraseña debe tener al menos 2 números, una letra mayúscula y un carácter especial.");

    function calculateAge(birthDate) {
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }
        ageCalculate = age;
        return age;
    }

    $("#registrationForm").validate({
        errorClass: "is-invalid",
        validClass: "is-valid",
        errorElement: "label",
        rules: {
            firstName: {
                required: true,
            },
            lastName: {
                required: true,
            },
            birthDate: {
                required: true,
                date: true,
                birthDateValidation: true
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 8,
                passwordStrength: true
            },
            confirmPassword: {
                required: true,
                equalTo: "#password"
            },
            age: {
                required: true,
                min: 18,
                max: 90
            }
        },
        messages: {
            firstName: {
                required: "Por favor, ingresa tu nombre.",
            },
            lastName: {
                required: "Por favor, ingresa tu apellido.",
            },
            birthDate: {
                required: "Por favor, ingresa tu fecha de nacimiento.",
                date: "Por favor, ingresa una fecha válida."
            },
            email: {
                required: "Por favor, ingresa tu correo electrónico.",
                email: "Por favor, ingresa un correo electrónico válido."
            },
            password: {
                required: "La contraseña es obligatoria.",
                minlength: "La contraseña debe tener al menos 8 caracteres.",
                regex: "La contraseña debe contener al menos 2 números, una letra mayúscula y un carácter especial."
            },
            confirmPassword: {
                required: "Por favor, confirme la contraseña.",
                equalTo: "Las contraseñas no coinciden."
            },
            age: {
                min: "Debes tener al menos 18 años.",
                max: "No puedes tener más de 90 años."
            }
        },
        submitHandler: function(form, event) {
            event.preventDefault();
            onSubmitForm(form);
        }
    });

    $("input[name='birthDate']").on("change", function() {
        const birthDate = $(this).val();
        const age = calculateAge(birthDate);
        $("input[name='age']").val(age);
    });

    $('#cleanForm').click(function() {
        $('#registrationForm')[0].reset();
        $('#registrationForm').validate().resetForm();
        $('#registrationForm .is-invalid').removeClass('is-invalid');
        $('#registrationForm .is-valid').removeClass('is-valid');
    });

    if (currentHTMLFile === "sing-up.html") {
        $('#firstName, #lastName, #birthDate').on('change input', function() {
            updateUsernameField();
        });
    }

    function updateUsernameField() {
        const name = $('#firstName').val().trim()
            apellido = $('#lastName').val().trim()
            birthDate = $('#birthDate').val();
    
        if (name && apellido && birthDate) {
            const firstName = name.charAt(0).toLowerCase(),
                lastName = apellido.toLowerCase();
                birthDate = new Date(birthDate)
                dayMonthYearOnBorn = ('0' + birthDate.getDate()).slice(-2) +
                                        ('0' + (birthDate.getMonth() + 1)).slice(-2) +
                                        birthDate.getFullYear(),
                usuario = firstName + lastName + dayMonthYearOnBorn;
            $('#username').val(usuario);
        }
    }

    function onSubmitForm(form) {
        const perfilImageChecked = $('input[name="perfilImage"]:checked').val();
        const formData = $(form).serializeArray().reduce((acc, field) => {
            acc[field.name] = field.value;
            return acc;
          }, {});
        const finalData = { ...formData, perfilImageChecked };
        sessionStorage.setItem("user", JSON.stringify(finalData));
        if (currentHTMLFile == "profile.html") {
            location.reload();
        } else {
            window.location.href = "login.html";
        }
    }
});
