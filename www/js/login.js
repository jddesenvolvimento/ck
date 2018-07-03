var urlApp = "http://icmpe.com.br/appcheckin/";

function login() { //mostra detalhes dos eventos que serão importados
    $.ajax({
        type: "GET",
        url: urlApp+"login.php",
        data: {
            login: $('#login').val(),
            senha: $('#senha').val()
        },
        success: function(data) {
            $('#retorno').html(data);
        }
    });
}


