
function login() { //mostra detalhes dos eventos que serão importados
    $.ajax({
        type: "GET",
        url: urlApp+"login.php",
        data: {
            login: $('#login').val(),
            senha: $('#senha').val()
        },
        success: function(data) {
            
            if(data == false || data == '\r\nfalse'){
                var erro = "Credenciais Incorretas!";
                $('#retorno').html(erro);
            }else{
                window.location.assign("pg.html");
            }
        }
    });
}

