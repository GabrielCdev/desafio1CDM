const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const path = require('path');

const ObjectId = require('mongodb').ObjectID;

const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://desafio1cdm:desafio1cdm@desafio1cdm.njqir.mongodb.net/Desafio1CDM';

MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err);
    db = client.db('Desafio1CDM');

    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect('cliente');
});


// Cliente
app.get('/cliente', (req, res) => {
    res.render('index-cliente.ejs');
});

app.get('/cliente', (req, res) => {
    let cursor = db.collection('clientes').find();
});

app.get('/show-cliente', (req, res) => {
    db.collection('clientes').find().toArray((err, results) => {
        if (err) return console.log(err);

        res.render('show-cliente.ejs', { clientes: results });
    });
});

app.post('/show-cliente', (req, res) => {
    db.collection('clientes').save(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log('Save in DB');
        res.redirect('/show-cliente');
    });
});

app.route('/edit-cliente/:id').get((req, res) => {
    let id = req.params.id;

    db.collection('clientes').find(ObjectId(id)).toArray((err, result) => {
        if (err) return res.send(err);

        res.render('edit-cliente.ejs', { clientes: result });
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

    db.collection('clientes').updateOne({ _id: ObjectId(id) }, {
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
            cidade: cidade,
        },
    }, (err, result) => {
        if (err) return res.send(err);

        res.redirect('/show-cliente');
        console.log('Updated in DB!');
    });
});

app.route('/delete-cliente/:id').get((req, res) => {
    let id = req.params.id;

    db.collection('clientes').deleteOne({ _id: ObjectId(id) }, (err, result) => {
        if (err) return res.send(500, err);

        console.log('Deleted in DB!');
        res.redirect('/show-cliente');
    });
});


// Empresa
app.get('/empresa', (req, res) => {
    res.render('index-empresa.ejs');
});

app.get('/empresa', (req, res) => {
    let cursor = db.collection('empresa').find();
});

app.get('/show-empresa', (req, res) => {
    db.collection('empresa').find().toArray((err, results) => {
        if (err) return console.log(err)

        res.render('show-empresa.ejs', { empresa: results });
    });
});

app.post('/show-empresa', (req, res) => {
    db.collection('empresa').save(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log('salvo no banco de dados');
        res.redirect('/show-empresa');
    });
});

app.route('/edit-empresa/:id').get((req, res) => {
    let id = req.params.id;

    db.collection('empresa').find(ObjectId(id)).toArray((err, result) => {
        if (err) return res.send(err)

        res.render('edit-empresa.ejs', { empresa: result });
    });
}).post((req, res) => {
    let id = req.params.id;
    let Inpname = req.body.Inpname;
    let InpFantasia = req.body.InpFantasia;
    let inpCnpj = req.body.inpCnpj;
    let InpEmail = req.body.InpEmail;
    let InpTel = req.body.InpTel;
    let InpEnd = req.body.InpEnd;
    let InpCity = req.body.InpCity;
    let InpEs = req.body.InpEs;

    db.collection('empresa').updateOne({ _id: ObjectId(id) }, {
        $set: {
            Inpname: Inpname,
            InpFantasia: InpFantasia,
            inpCnpj: inpCnpj,
            InpEmail: InpEmail,
            InpTel: InpTel,
            InpEnd: InpEnd,
            InpCity: InpCity,
            InpEs: InpEs
        },
    }, (err, result) => {
        if (err) return res.send(err)

        res.redirect('/show-empresa');
        console.log('Atualizado no Banco de Dados');
    });
})

app.route('/delete-empresa/:id').get((req, res) => {
    let id = req.params.id;

    db.collection('empresa').deleteOne({ _id: ObjectId(id) }, (err, result) => {
        if (err) return res.send(500, err)

        console.log('Deletado do Banco de Dados!');
        res.redirect('/show-empresa');
    });
});


// Empréstimo-Devolução
app.get('/emprestimo', (req, res) => {
    res.render('indexEmprestimo.ejs');
});

app.get('/showEmprestimo', (req, res) => {
    db.collection('emprestimo_devolucao').find().toArray((err, results) => {
        if (err) return console.log(err);

        res.render('showEmprestimo.ejs', { data: results });
    });
});

app.post('/showEmprestimo', (req, res) => {
    db.collection('emprestimo_devolucao').save(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log('Salvo no Banco de Dados');
        res.redirect('/showEmprestimo');
    });
});

app.route('/editEmprestimo/:id').get((req, res) => {
    let id = req.params.id

    db.collection('emprestimo_devolucao').find(ObjectId(id)).toArray((err, result) => {
        if (err) return res.send(err);

        res.render('editEmprestimo.ejs', { data: result });
    });
}).post((req, res) => {
    let id = req.params.id
    let name = req.body.name
    let surname = req.body.surname
    let cpf = req.body.cpf
    let telefone = req.body.telefone
    let endereco = req.body.endereco
    let data = req.body.data
    let data2 = req.body.data2
    let livroEmprestado = req.body.livroEmprestado
    let multa = req.body.multa

    db.collection('emprestimo_devolucao').updateOne({ _id: ObjectId(id) }, {
        $set: {
            name: name,
            surname: surname,
            cpf: cpf,
            telefone: telefone,
            endereco: endereco,
            data: data,
            data2: data2,
            livroEmprestado: livroEmprestado,
            multa: multa
        }
    }, (err, result) => {
        if (err) return res.send(err);

        res.redirect('/showEmprestimo');
        console.log('Atualizado no Banco de Dados');
    });
});

app.route('/deleteEmprestimo/:id').get((req, res) => {
    let id = req.params.id

    db.collection('emprestimo_devolucao').deleteOne({ _id: ObjectId(id) }, (err, result) => {
        if (err) return res.send(500, err);

        console.log('Deletado do Banco de Dados!');
        res.redirect('/showEmprestimo');
    });
});


// Livros
app.get('/livros', (req, res) => {
    res.render('index-livros.ejs');
});

app.get('/livros', (req, res) => {
    let cursor = db.collection('livros').find();
});

app.get('/show-livros', (req, res) => {
    db.collection('livros').find().toArray((err, results) => {
        if (err) return console.log(err);

        res.render('show-livros.ejs', { livros: results });
    });
});

app.post('/show-livros', (req, res) => {
    db.collection('livros').save(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log('Salvo no Banco de Dados');
        res.redirect('/show-livros');
    });
});

app.route('/edit-livros/:id').get((req, res) => {
    let id = req.params.id;

    db.collection('livros').find(ObjectId(id)).toArray((err, result) => {
        if (err) return res.send(err)

        res.render('edit-livros.ejs', { livros: result });
    });
}).post((req, res) => {
    let id = req.params.id
    let titulo = req.body.titulo
    let subtitulo = req.body.subtitulo
    let autor = req.body.autor
    let edicao = req.body.edicao
    let editora = req.body.editora
    let genero = req.body.genero
    let idioma = req.body.idioma
    let ano = req.body.ano
    let qtd = req.body.qtd

    db.collection('livros').updateOne({ _id: ObjectId(id) }, {
        $set: {
            titulo: titulo,
            subtitulo: subtitulo,
            autor: autor,
            edicao: edicao,
            editora: editora,
            genero: genero,
            idioma: idioma,
            ano: ano,
            qtd: qtd
        }
    }, (err, result) => {
        if (err) return res.send(err);

        res.redirect('/show-livros');
        console.log('Atualizado no Banco de Dados');
    });
});

app.route('/delete-livros/:id').get((req, res) => {
    let id = req.params.id

    db.collection('livros').deleteOne({ _id: ObjectId(id) }, (err, result) => {
        if (err) return res.send(500, err);

        console.log('Deletado do Banco de Dados!');
        res.redirect('/show-livros');
    });
});


// Funcionário
app.get('/funcionario', (req, res) => {
    res.render('index-funcionario.ejs');
})

app.get('/funcionario', (req, res) => {
    let cursor = db.collection('funcionario').find();
})

app.get('/show-funcionario', (req, res) => {
    db.collection('funcionario').find().toArray((err, results) => {
        if (err) return console.log(err)
        
        res.render('show-funcionario.ejs', { funcionario: results })
    })
})

app.post('/show-funcionario', (req, res) => {
    db.collection('funcionario').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('Salvo no Banco de Dados')
        res.redirect('/show-funcionario')
    })
})

app.route('/edit-funcionario/:id').get((req, res) => {
    let id = req.params.id

    db.collection('funcionario').find(ObjectId(id)).toArray((err, result) => {
        if (err) return res.send(err)

        res.render('edit-funcionario.ejs', { funcionario: result })
    })
}).post((req, res) => {
    let id = req.params.id
    let filial = req.body.filial
    let nome = req.body.nome
    let sobrenome = req.body.sobrenome
    let cpf = req.body.cpf
    let cep = req.body.cep
    let cidade = req.body.cidade
    let estado = req.body.estado
    let endereco = req.body.endereco
    let funcao = req.body.funcao
    let contato = req.body.contato

    db.collection('funcionario').updateOne({ _id: ObjectID(id) }, {
        $set: {
            filial: filial,
            nome: nome,
            sobrenome: sobrenome,
            cpf: cpf,
            cep: cep,
            cidade: cidade,
            estado: estado,
            endereco: endereco,
            funcao: funcao,
            contato: contato
        }
    }, (err, result) => {
        if (err) return res.send(err)
        
        res.redirect('/show-funcionario')
        console.log('atualizado no banco de dados')
    })
})

app.route('/delete/:id').get((req, res) => {
    let id = req.params.id

    db.collection('funcionario').deleteOne({ _id: ObjectId(id) }, (err, result) => {
        if (err) return res.send(500, err)
    
        console.log('Deletando do banco de dados!')
        res.redirect('/show-funcionario')
    })
})