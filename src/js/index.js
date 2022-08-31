let dados = [];

function delRegistro(id) {
    let _confirm = confirm("Tem certeza que deseja excluir este registro?");

    if (_confirm) {
        for (let i = 0; i < dados.length; i++) {
            if (dados[i].ID == id) {
                dados.splice(i, 1);
            }
        }

        IncrementaTabela()
    }
}

function editRegistro(id) {
    $("#modalRegistro").modal("show")

    dados.forEach(function (item) {
        if (item.ID == id) {
            $("#hdID").val(item.ID)
            $("#txt-nome").val(item.nome)
            $("#txt-sobrenome").val(item.sobrenome)
            $("#txt-dtNascimento").val(item.dtNascimento.substr(6, 4) + "-" + item.dtNascimento.substr(3, 2) + "-" + item.dtNascimento.substr(0, 2))
            $("#txt-formacao").val(item.formacao)
        }
    });
}

function IncrementaTabela() {
    if (Array.isArray(dados)) {

        localStorage.setItem("__dados__", JSON.stringify(dados));

        $("#tblDados tbody").html("");

        dados.forEach(function (item) {
            $("#tblDados tbody").append(`<tr>
                <td>${item.ID}</td>
                <td>${item.nome}</td>
                <td>${item.sobrenome}</td>
                <td>${item.dtNascimento}</td>
                <td>${item.formacao}</td>
                <td><button type="button" class="btn btn-primary" onclick="javascript:editRegistro(${item.ID});"> <i class="fa fa-edit"> </button></td>
                <td><button type="button" class="btn btn-danger" onclick="javascript:delRegistro(${item.ID});"> <i class="fa fa-trash"> </button></td>

            </tr>`)
        })
    }
}

$(function () {
    dados = JSON.parse(localStorage.getItem("__dados__"));

    if (dados) {
        IncrementaTabela()
    }

    $("#btn-salvar").click(function () {
        let _id = $("#hdID").val();
        let nome = $("#txt-nome").val();
        let sobrenome = $("#txt-sobrenome").val();
        let dtNascimento = new Date($("#txt-dtNascimento").val()).toLocaleDateString("pt-br", { timeZone: "UTC" });
        let formacao = $("#txt-formacao").val();

        if (!_id || _id == "0") {
            let registro = {};
            registro.nome = nome;
            registro.sobrenome = sobrenome;
            registNatro.dscimento = dtNascimento;
            registro.formacao = formacao;

            registro.ID = dados.length + 1;
            dados.push(registro);
            alert("Registro salvo com sucesso");
        } 
        else {
            dados.forEach(function(item) {
                if(item.ID == _id) {
                    item.nome = nome;
                    item.sobrenome = sobrenome;
                    item.dtNascimento = dtNascimento;
                    item.formacao = formacao;
                    alert("Registro atualizado")
                }
            })
        }

        $("#modalRegistro").modal("hide");

        $("#hdID").val("0");
        $("#txt-nome").val("");
        $("#txt-sobrenome").val("");
        $("#txt-dtNascimento").val("");
        $("#txt-formacao").val("");


        IncrementaTabela();
    });
});