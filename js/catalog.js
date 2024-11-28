$(document).on('click', 'button[data-bs-target="#commentModal"]', function () {
    const cut = $(this).data('cut');
    $('#typeOfCut').val(cut);
});

const buildStarsElement = (starsIndex = 1) => {
    let starsElement ='<p class="classification-stars" style="direction: ltr !important;">';
    const radioSelected = document.querySelector(
        `input[name="stars${starsIndex}"]:checked`
      );
    if (radioSelected) {
        for (let index = 0; index < 5; index++) {
            const element = `<input type="radio">
                            <label style="color: ${index + 1 <= radioSelected.value ? "orange" : "grey"
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

const addCommentToTable = () => {
    const comment = $('#comments').val(),
        typeOfCut = $('#typeOfCut').val(),
        starsElement = buildStarsElement();

    if (!comment) {
        alert('El comentario es requerido');
        return false;
    }

    if (starsElement) {
        const newRow = `<tr>
                <td>${typeOfCut}</td>
                <td>${comment}</td>
                <td>${starsElement}</td>
            </tr>`;
        
        $("#catalogTableBody").append(newRow);
        $('#commentModal').modal('hide');
        $('#comments').val('');
    }
}