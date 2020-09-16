const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const ObjectId = require('mongodb').ObjectID;

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://desafio1cdm:desafio1cdm@desafio1cdm.njqir.mongodb.net/Desafio1CDM";

MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err);
    db = client.db('Desafio1CDM');

    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
});

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/', (req, res) => {
    let cursor = db.collection('data').find();
});

app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err);
        res.render('show.ejs', { data: results });
    });
}); 

app.post('/show', (req, res) => {
    db.collection('data').save(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log('Save in DB');
        res.redirect('/show');
    });
});

app.route('/edit/:id').get((req, res) => {
    let id = req.params.id;

    db.collection('data').find(ObjectId(id)).toArray((err, result) => {
        if (err) return res.send(err);
        res.render('edit.ejs', { data: result });
    });
}).post((req, res) => {
    let id = req.params.id;
    let nome = req.body.nome;
    let sobrenome = req.body.sobrenome;
    let email = req.body.email;
    let contato1 = req.body.contato1;
    let contato2 = req.body.contato2;
    let endereco = req.body.endereco;
    let complemento = req.body.complemento;
    let cep = req.body.cep;
    let estado = req.body.estado;
    let cidade = req.body.cidade;

    db.collection('data').updateOne({_id: ObjectId(id)}, {
        $set: {
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            contato1: contato1,
            contato2: contato2,
            endereco: endereco,
            complemento: complemento,
            cep: cep,
            estado: estado,
            cidade: cidade
        }
    }, (err, result) => {
        if (err) return res.send(err);
        res.redirect('/show');
        console.log('Updated in DB!');
    });
});

app.route('/delete/:id').get((req, res) => {
    let id = req.params.id;

    db.collection('data').deleteOne({_id: ObjectId(id)}, (err, result) => {
        if (err) return res.send(500, err);
        console.log('Deleted in DB!');
        res.redirect('/show');
    });
});