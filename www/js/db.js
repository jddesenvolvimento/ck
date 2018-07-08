function createDB(){
    try{
        //db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
        db = window.sqlitePlugin.openDatabase({name: 'checkinDB.db', location: 'default'}, function(db) {
            db.transaction(function(tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY ASC, login VARCHAR(30), senha VARCHAR(50), nivel INT(1))');  
                tx.executeSql('CREATE TABLE IF NOT EXISTS visitantes (id INTEGER PRIMARY KEY ASC, cpf INT(11), nome VARCHAR(50), igreja VARCHAR(30), areaIgreja VARCHAR(30), cBarras VARCHAR(10), tipoInscricao INT(1), nomeEquipe VARCHAR(30), funcao INT(1), presenca INT(1), dataEntrada VARCHAR(10), evento VARCHAR(30))');
            }, function(err) {
              console.log('Open database ERROR: ' + JSON.stringify(err));
            });
          });
    }catch (erro){
        alert('Erro: ' + erro);
    }  
    console.log('Banco de Dados criado/aberto');
}

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
        //db = openDatabase('dbck', '1.0', 'db checkin', 2 * 1024 * 1024);
        db.transaction(function (tx){
            tx.executeSql('INSERT INTO user (id, login, senha, nivel) VALUES (?,?,?,?)',[id,login,senha,nivel]);
        })
    }catch(erro){
       alert('Erro: ' + erro); 
    }
    console.log('usuario inserido');
}



