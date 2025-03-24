//Variáveis globais
var formCampeonato = document.getElementById(
  "formCampeonato"
) as HTMLFormElement;
var tabelaCampeonato = document.getElementById("tbCampeonatos") as HTMLElement;
var campeonatos = JSON.parse(localStorage.getItem("campeonatos") || "[]");

interface Campeonato {
  id: number;
  nome: string;
  categoria: string;
  tipo: string;
  dataInicio: string;
  dataFim: string;
}

function atualizarTabela() {
  tabelaCampeonato.innerHTML = "";
  campeonatos.forEach((c : Campeonato) =>{
    tabelaCampeonato.innerHTML += `
    <tr>
         <td>${c.nome}</td>
         <td>${c.categoria}</td>
         <td>${c.tipo}</td>
         <td>${c.dataInicio}</td>
         <td>${c.dataFim}</td>
         <td>
    <button onclick="editarCampeonato(${c.id})"> Editar </button> 
    <button onclick="removerCampeonato(${c.id})"> Remover </button> 
        </td>
    </tr>
  `;
  })
}

function removerCampeonato(id:number)
{
   //findIndex buscar o index do objeto
   const campIndex =  campeonatos.findIndex(
    (c:Campeonato) => c.id == id);

  //Validar se encontrou algum item  
  if(campIndex !== -1){
    //remover da lista
    campeonatos.splice(campIndex, 1)
  }
  salvarLocalStorage()
  atualizarTabela()
}

function editarCampeonato(id:number){
  //Find = buscar um elemento em um array
  const campeonato = campeonatos.find(
    (c : Campeonato) => c.id ==id);
  
  if(!campeonato)  return;

  (document.getElementById("nome") as HTMLInputElement).value 
  = campeonato.nome;
  (document.getElementById("categoria") as HTMLSelectElement).value 
  = campeonato.categoria;
  (document.getElementById("tipo") as HTMLSelectElement).value 
  = campeonato.tipo;
  (document.getElementById("dataInicio") as HTMLInputElement).value 
  = campeonato.dataInicio;
  (document.getElementById("dataFim") as HTMLInputElement).value 
  = campeonato.dataFim;
  
  //findIndex buscar o index do objeto
  const campIndex =  campeonatos.findIndex(
    (c:Campeonato) => c.id == id);

  //Validar se encontrou algum item  
  if(campIndex !== -1){
    //remover da lista
    campeonatos.splice(campIndex, 1)
  }
  salvarLocalStorage()
  atualizarTabela()
}

function salvarLocalStorage() {
  let campeonatosSalvar = JSON.stringify(campeonatos);
  localStorage.setItem("campeonatos", campeonatosSalvar);
}

function salvar(event:Event) {
  event?.preventDefault(); //cancelar o disparo do evento
  const novoCampeonato: Campeonato = {
    id: Date.now(),
    categoria: (document.getElementById("categoria") as HTMLSelectElement).value,
    dataFim: (document.getElementById("dataFim") as HTMLInputElement).value,
    dataInicio:  (document.getElementById("dataInicio") as HTMLInputElement).value,
    nome: (document.getElementById("nome") as HTMLInputElement).value,
    tipo: (document.getElementById("tipo") as HTMLSelectElement).value,
  };
  campeonatos.push(novoCampeonato)
  atualizarTabela()
  salvarLocalStorage()
  formCampeonato.reset()
  alert('Cadastrado com sucesso!')
}

formCampeonato.addEventListener("submit", salvar)
atualizarTabela()

    // Cadastro de Partidas
    interface Partida {
      mandante: string;
      visitante: string;
      campeonato: string;
    }
    
    const partidas: Partida[] = [];
    
    function salvarPartida(event: Event): void {
      event.preventDefault();
      const mandante = (document.getElementById("mandante") as HTMLInputElement).value;
      const visitante = (document.getElementById("visitante") as HTMLInputElement).value;
      const campeonato = (document.getElementById("campeonato") as HTMLInputElement).value;
    
      if (mandante && visitante && campeonato) {
        partidas.push({ mandante, visitante, campeonato });
        atualizarTabelaPartidas();
      }
    }
    
    function atualizarTabelaPartidas(): void {
      const tabela = document.getElementById("tbPartidas") as HTMLTableElement;
      tabela.innerHTML = partidas.map(p => `<tr><td>${p.mandante}</td><td>${p.visitante}</td><td>${p.campeonato}</td></tr>`).join("");
    }

    // Cadastro de Times
interface Time {
  nome: string;
  nomeCurto: string;
}

const times: Time[] = [];

function salvarTime(event: Event): void {
  event.preventDefault();
  const nome = (document.getElementById("nomeTime") as HTMLInputElement).value;
  const nomeCurto = (document.getElementById("nomeCurto") as HTMLInputElement).value;

  if (nome && nomeCurto) {
    times.push({ nome, nomeCurto });
    atualizarTabelaTimes();
  }
}

function atualizarTabelaTimes(): void {
  const tabela = document.getElementById("tbTimes") as HTMLTableElement;
  tabela.innerHTML = times.map(t => `<tr><td>${t.nome}</td><td>${t.nomeCurto}</td></tr>`).join("");
}