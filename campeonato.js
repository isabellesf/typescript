//Variáveis globais
var formCampeonato = document.getElementById("formCampeonato");
var tabelaCampeonato = document.getElementById("tbCampeonatos");
var campeonatos = JSON.parse(localStorage.getItem("campeonatos") || "[]");
function atualizarTabela() {
    tabelaCampeonato.innerHTML = "";
    campeonatos.forEach(function (c) {
        tabelaCampeonato.innerHTML += "\n    <tr>\n         <td>".concat(c.nome, "</td>\n         <td>").concat(c.categoria, "</td>\n         <td>").concat(c.tipo, "</td>\n         <td>").concat(c.dataInicio, "</td>\n         <td>").concat(c.dataFim, "</td>\n         <td>\n    <button onclick=\"editarCampeonato(").concat(c.id, ")\"> Editar </button> \n    <button onclick=\"removerCampeonato(").concat(c.id, ")\"> Remover </button> \n        </td>\n    </tr>\n  ");
    });
}
function removerCampeonato(id) {
    //findIndex buscar o index do objeto
    var campIndex = campeonatos.findIndex(function (c) { return c.id == id; });
    //Validar se encontrou algum item  
    if (campIndex !== -1) {
        //remover da lista
        campeonatos.splice(campIndex, 1);
    }
    salvarLocalStorage();
    atualizarTabela();
}
function editarCampeonato(id) {
    //Find = buscar um elemento em um array
    var campeonato = campeonatos.find(function (c) { return c.id == id; });
    if (!campeonato)
        return;
    document.getElementById("nome").value
        = campeonato.nome;
    document.getElementById("categoria").value
        = campeonato.categoria;
    document.getElementById("tipo").value
        = campeonato.tipo;
    document.getElementById("dataInicio").value
        = campeonato.dataInicio;
    document.getElementById("dataFim").value
        = campeonato.dataFim;
    //findIndex buscar o index do objeto
    var campIndex = campeonatos.findIndex(function (c) { return c.id == id; });
    //Validar se encontrou algum item  
    if (campIndex !== -1) {
        //remover da lista
        campeonatos.splice(campIndex, 1);
    }
    salvarLocalStorage();
    atualizarTabela();
}
function salvarLocalStorage() {
    var campeonatosSalvar = JSON.stringify(campeonatos);
    localStorage.setItem("campeonatos", campeonatosSalvar);
}
function salvar(event) {
    event === null || event === void 0 ? void 0 : event.preventDefault(); //cancelar o disparo do evento
    var novoCampeonato = {
        id: Date.now(),
        categoria: document.getElementById("categoria").value,
        dataFim: document.getElementById("dataFim").value,
        dataInicio: document.getElementById("dataInicio").value,
        nome: document.getElementById("nome").value,
        tipo: document.getElementById("tipo").value,
    };
    campeonatos.push(novoCampeonato);
    atualizarTabela();
    salvarLocalStorage();
    formCampeonato.reset();
    alert('Cadastrado com sucesso!');
}
formCampeonato.addEventListener("submit", salvar);
atualizarTabela();
var partidas = [];
function salvarPartida(event) {
    event.preventDefault();
    var mandante = document.getElementById("mandante").value;
    var visitante = document.getElementById("visitante").value;
    var campeonato = document.getElementById("campeonato").value;
    if (mandante && visitante && campeonato) {
        partidas.push({ mandante: mandante, visitante: visitante, campeonato: campeonato });
        atualizarTabelaPartidas();
    }
}
function atualizarTabelaPartidas() {
    var tabela = document.getElementById("tbPartidas");
    tabela.innerHTML = partidas.map(function (p) { return "<tr><td>".concat(p.mandante, "</td><td>").concat(p.visitante, "</td><td>").concat(p.campeonato, "</td></tr>"); }).join("");
}
var times = [];
function salvarTime(event) {
    event.preventDefault();
    var nome = document.getElementById("nomeTime").value;
    var nomeCurto = document.getElementById("nomeCurto").value;
    if (nome && nomeCurto) {
        times.push({ nome: nome, nomeCurto: nomeCurto });
        atualizarTabelaTimes();
    }
}
function atualizarTabelaTimes() {
    var tabela = document.getElementById("tbTimes");
    tabela.innerHTML = times.map(function (t) { return "<tr><td>".concat(t.nome, "</td><td>").concat(t.nomeCurto, "</td></tr>"); }).join("");
}
