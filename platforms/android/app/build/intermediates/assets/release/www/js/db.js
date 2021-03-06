var db = null;

//inicia o banco de dados se não estiver iniciado
    try{
        db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
            db.transaction(function(tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY ASC, login VARCHAR(30), senha VARCHAR(50), nivel INT(1))');  
                tx.executeSql('CREATE TABLE IF NOT EXISTS visitantes (id INTEGER PRIMARY KEY ASC, cpf VARCHAR(11), nome VARCHAR(50), igreja VARCHAR(30), areaIgreja VARCHAR(30), cBarras VARCHAR(10), tipoInscricao INT(1), nomeEquipe VARCHAR(30), funcao INT(1), presenca INT(1), dataEntrada VARCHAR(10), evento VARCHAR(30))');
            }, function(err) {
              console.log('Open database ERROR: ' + JSON.stringify(err));
              alert("DB nao conectado");
            });
    }catch (erro){
        alert('Erro n conetado: ' + erro);
    }  
    console.log('Banco de Dados criado/aberto');


function testaUser(){
    //rerifica se ja possui usuario cadastrado, se sim loga atumaticamente
    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM user', [], function (tx, results) {

            if(results.rows.length > 0){
                window.location.assign("home.html");
            }
        },function (tx, error){
            if (error){
                console.log(error);
                alert("nao pesquisou");
            }
        });
    });
}

function saveUser(id,login,senha,nivel){
    var id = id;
    var login = login;
    var senha = senha;
    var nivel = nivel;
    
    try{
        db.transaction(function (tx){
            tx.executeSql('INSERT INTO user (id, login, senha, nivel) VALUES (?,?,?,?)',[id,login,senha,nivel]);
        });
    }catch(erro){
       alert('Nao Salvou Erro: ' + erro); 
    }
    console.log('usuario inserido');
}

function carregaVisitantes(json){
    
    try{
        
        db.transaction(function (tx){
            tx.executeSql('DROP TABLE visitantes');
            
            tx.executeSql('CREATE TABLE IF NOT EXISTS visitantes (id INTEGER PRIMARY KEY ASC, cpf VARCHAR(11), nome VARCHAR(50), igreja VARCHAR(30), areaIgreja VARCHAR(30), cBarras VARCHAR(10), tipoInscricao INT(1), nomeEquipe VARCHAR(30), funcao INT(1), presenca INT(1), dataEntrada VARCHAR(10), evento VARCHAR(30))');
        });
        
        var cpf = null;
            var nome = null;
            var igreja = null;
            var areaIgreja = null;
            var cbarras = null;
            var tipoInscricao = null;
            var nomeEquipe = null;
            var funcao = null;
            var evento = null;
            var presenca = null;
            var data = null;
        
        
        for(var i=0;i<json.length;i++){
            
            cpf = json[i]["cpf"];
            nome = json[i]["nome"];
            igreja = json[i]["igreja"];
            areaIgreja = json[i]["areaIgreja"];
            cbarras = json[i]["cbarras"];
            tipoInscricao = json[i]["tipoInscricao"];
            nomeEquipe = json[i]["nomeEquipe"];
            funcao = json[i]["funcao"];
            evento = json[i]["evento"];
            presenca = 0;
            data = null;
            console.log(json[i]["nome"]+"-"+nome);
            
            db.transaction(function (tx){
                tx.executeSql('INSERT INTO visitantes (cpf, nome, igreja, areaIgreja, cBarras, tipoInscricao, nomeEquipe, funcao, presenca, dataEntrada, evento) VALUES (?,?,?,?,?,?,?,?,?,?,?)',[cpf,nome,igreja,areaIgreja,cbarras,tipoInscricao,nomeEquipe,funcao,presenca,data,evento]);
            });
        }    
        console.log(json.length + ' Registros Carregados');
        
        $('#retorno').html(json.length + " Registros Carregados");
    }catch(erro){
       alert('Erro ao inserir: ' + erro); 
    }   
}

function exibeVisitantes(){
    try{
        
            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM visitantes', [], function (tx, results) {
                    for(var i = 0; i < results.rows.length; i++){
                        console.log(results.rows.item(i)[['nome']]);
                    }
            
                    //$('#login').html(bemvindo);
            
                });
            });
          
        
    }catch(erro){
       alert('Erro ao pesquisar: ' + erro); 
    } 
}



