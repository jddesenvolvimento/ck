/*
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
*/
function mudaPg(){
    window.location.assign("pg.html");
}
function mudaPgE(){
    window.location.assign("http://www.google.com");
}
function carrega() { //mostra detalhes dos eventos que serão importados
    $.ajax({
        type: "GET",
        url: "pg.html",
        data: {
            login: $('#login').val(),
            senha: $('#senha').val()
        },
        success: function(data) {
            $('#retorno').html(data);
        }
    });
}
