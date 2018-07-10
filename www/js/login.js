
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
                var json = JSON.parse(data); //converte json para array
                
                //faz inclusão do usuario no banco local
                saveUser(json["id"],json["login"],json["senha"],json["nivel"]);
                
                //abre pg home
                window.location.assign("home.html");
            }
        },
        error: function() {
            alert("Verifique sua conexão com a internet");
	}
    });
}

