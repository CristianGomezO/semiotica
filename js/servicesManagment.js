$(document).ready(() => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  $("#emailSessionStorage").text(sessionStorage.getItem("email"));

  $("#checkoutForm").validate({
    errorClass: "is-invalid",
    validClass: "is-valid",
    errorElement: "label",
    rules: {
      installments: {
        required: true,
        min: 1,
        max: 10,
      },
      fullName: {
        required: true,
      },
      creditCardNumber: {
        required: true
      },
      securityCode: {
        required: true,
        digits: true,
        minlength: 4,
        maxlength: 4,
      },
      expirationMonth: {
        required: true,
      },
      expirationYear: {
        required: true,
      },
      address: {
        required: true,
      },
      city: {
        required: true,
      },
    },
    messages: {
      installments: "Por favor, ingrese un número de cuotas válido (1-10).",
      fullName: "Por favor, ingrese su nombre completo.",
      creditCardNumber:
        "Por favor, ingrese un número de tarjeta válido (XXXX-XXXX-XXXX-XXXX).",
      securityCode:
        "Por favor, ingrese un código de seguridad válido (4 dígitos).",
      expirationMonth: "Por favor, seleccione un mes de expiración.",
      expirationYear: "Por favor, seleccione un año de expiración.",
      address: "Por favor, ingrese su dirección.",
      city: "Por favor, ingrese su ciudad.",
    },
    submitHandler: function (form, event) {
      event.preventDefault();
      const formData = $(form)
        .serializeArray()
        .reduce((acc, field) => {
          acc[field.name] = field.value;
          return acc;
        }, {});
      form.reset();
      $('#checkoutForm').validate().resetForm();
      paymentSummary(formData);
    },
  });

  $("#payModal").on("shown.bs.modal", function () {
    $("#paymentSummary").attr("hidden", true);
    $("#checkoutFormContainer").removeAttr("hidden");
    $("#fullName").val(`${user.firstName} ${user.lastName}`);
  });

  $('#creditCardNumber').on('input', function () {
    let value = $(this).val();
    value = value.replace(/\D/g, '');
    value = value.match(/.{1,4}/g)?.join('-') || '';
    $(this).val(value);
});
});

const buildStarsElement = (starsIndex) => {
  let starsElement =
    '<p class="classification-stars" style="direction: ltr !important;">';
  const radioSelected = document.querySelector(
    `input[name="stars${starsIndex}"]:checked`
  );
  if (radioSelected) {
    for (let index = 0; index < 5; index++) {
      const element = `<input type="radio">
                          <label style="color: ${
                            index + 1 <= radioSelected.value ? "orange" : "grey"
                          };">★</label>`;
      starsElement += element;
    }
    starsElement += "</p>";
    return starsElement;
  } else {
    alert('Seleccione una calificación');
    return false;
  }
};

const addPlanToTable = (planName, serviceCost, starsIndex) => {
  const qtyService = $(`#${planName}Qty`).val(),
    totalService = qtyService * serviceCost,
    starsElement = buildStarsElement(starsIndex);
    
  if(starsElement) {
    const newRow = `<tr>
        <td>${planName}</td>
        <td>${serviceCost}</td>
        <td>${qtyService}</td>
        <td>${totalService}</td>
        <td>${starsElement}</td>
    </tr>`;

    $("#servicesTableBody").append(newRow);
    $(`#${planName}Qty`).val("");

    let subTotalVal = $("#subTotal").text() ? parseInt($("#subTotal").text()) : 0;
    subTotalVal += totalService;
    $("#subTotal").text(subTotalVal);

    const iva = subTotalVal * 0.19,
    total = subTotalVal + iva;
    $("#iva").text(iva.toFixed(2));
    $("#total").text(total);

    if (total > 0) {
      $("#payServices").removeAttr("hidden");
    } 
  }
};

const _onChangeInstallments = (val) => {
  if (val) {
    const installment = parseInt(val),
      total = parseFloat($("#total").text());
    $("#installmentValue").val(total / installment);
  }
};

const paymentSummary = (formData) => {
  $("#checkoutFormContainer").attr("hidden", true);
  $("#paymentSummary").removeAttr("hidden");

  const now = new Date(),
    currentDate = now.toLocaleDateString(),
    currentTime = now.toLocaleTimeString(),
    creditCard = formData.creditCardNumber;

  $("#currentDate").text(currentDate);
  $("#currentTime").text(currentTime);
  $("#totalAmount").text(parseFloat($("#total").text()));
  $("#installmentsCount").text(formData.installments);
  $("#installmentValueText").text(formData.installmentValue);
  $("#cardLastDigits").text(creditCard.slice(-4));

  const firstDigit = creditCard.trim()[0];
  let srcImage = "";

  switch (firstDigit) {
    case "4":
      srcImage = "visa.jpg";
      break;
    case "5":
      srcImage = "mastercard.png";
      break;
    case "3":
      srcImage = "american-express.png";
      break;
    case "7":
      srcImage = "diners-club.png";
      break;
  }

  $('#cardBrandImage').attr('src', `assets/images/${srcImage}`);
};
