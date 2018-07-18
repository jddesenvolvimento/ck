function fecharApp(){
    confirm("Deseja Sair?");
    console.log("Fechando APP");
    navigator.app.exitApp();
}

function login() { //mostra detalhes dos eventos que serão importados
    try{
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
    }catch (err){
        alert("Verifique sua conexão com a internet");
    }
}

function scan(){
        console.log("clicked");
        cordova.plugins.barcodeScanner.scan(function(result){
        //success callback
        
        checkar(result["text"]); //chama a função checkin
        
        },function(error){
        //error callback
        alert(JSON.stringify(error));

        });
}
function eventos(){
    try{
        $.ajax({
            type: "GET",
            url: urlApp+"eventos.php",
            data: {
                l: '1'
            },
            success: function(data) {
               // alert(data);
                if(data == false || data == '\r\nfalse'){
                    
                    var erro = "Não há eventos abertos!";
                    
                    $('#retorno').html(erro);
                    
                }else{
                    var json = JSON.parse(data); //converte json para array
                    
                    console.log(json);
                    
                    for(var i=0;i<json.length;i++){
                        var cod = json[i]["codigo"];
                        var tot = parseInt(json[i]["totalParticipantes"])+ parseInt(json[i]["totalTrabalhadores"]);
                        var se = "<tr><td>"+ json[i]["data"]+"</td><td>"+tot+"</td><td><button onclick='baixarDados("+cod+")' class='btn btn-warning'>Baixar</button></td></tr>"+se;
                    }
                    var table = "<div class='table-responsive'><table class='table table-striped' width='100%'><tr><td colspan='3'><b class='text-info'>EVENTOS DISPONÍVEIS</b></td></tr><tr><td>DATA</td><td>NR DE REGISTROS</td><td></td></tr>"+ se +"</table></div>"
                    $('#retorno').html(table);    
                    
                    
                }
            },
            error: function() {
                alert("Verifique sua conexão com a internet");
            }
        });
    }catch (err){
        alert("Verifique sua conexão com a internet");
    }
    
}

function baixarDados(codigo){
    
    var codigo = codigo;
    
    confirm("Os dados atuais serão excuidos e substituidos. Deseja Continuar?");
    
    //mosta gif de carregando
    $('#retorno').html("<figure><img src='img/loading.gif' /><figcaption>Aguarde o término do download</figcaption></figure>");
    
    try{
        $.ajax({
            type: "GET",
            url: urlApp+"baixaVisitantes.php",
            data: {
                codigo: codigo
            },
            success: function(data) {
                var json = JSON.parse(data); //converte para array
                
                carregaVisitantes(json);
                               
               // console.log(data);
            //$('#altera-senha').html(data);
            }
        });    
    }catch(err){
        alert("Verifique sua conexão com a internet");
    }
    
    
    
    
}

