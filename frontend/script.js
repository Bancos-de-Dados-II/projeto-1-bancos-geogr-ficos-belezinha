


let center = [-6.8426636313354, -38.34752082824708];

// Inicializa o mapa centrado na localização definida
var map = L.map('map').setView(center, 14);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Define o ícone personalizado
var myIcon = L.icon({
    iconUrl: './img/home-address.png',
    iconSize: [40, 40]
});

// Adiciona o marcador inicial com a opção de arrastar (draggable)
let marker = L.marker(center, {
    draggable: true,
    title: 'Imovel',
    icon: myIcon
}).addTo(map);




//load icones
async function loadLocations() {
    try {
        const response = await fetch('http://localhost:3000/api/imoveis');

        console.log(response)
        const locations = await response.json();

        // Adiciona um marcador para cada localização
        locations.forEach(location => {
            const { latitude, longitude, titulo,nome, descricao, contato, valor } = location;

            // Cria o marcador
            const marker = L.marker([latitude, longitude], {
                icon: L.icon({
                    iconUrl: './img/home-address.png',
                    iconSize: [40, 40]
                })
            }).addTo(map);

            marker.bindTooltip(titulo, {
                permanent: true, // Sempre visível
                direction: 'top', // Acima do marcador
                className: 'custom-tooltip' // Classe CSS para estilizar
            });

            // Adiciona o popup (detalhes ao clicar)
            const popupContent = `
                <b>${titulo}</b><br>
                <p><strong>Nome:</strong> ${nome}</p>
                <p><strong>Descrição:</strong> ${descricao}</p>
                <p><strong>Valor:</strong> R$ ${valor.toFixed(2)}</p>
                <p><strong>Contato:</strong> ${contato}</p>
                <button onclick="editLocation(${location.id})">Editar</button>
                <button onclick="deleteLocation(${location.id})">Excluir</button>
            `;
            marker.bindPopup(popupContent);
        });
    } catch (error) {
        console.error('Erro ao carregar localizações:', error);
    }
}

loadLocations();

//editar localização
function editLocation(id) {
    alert(`Editar localização com ID: ${id}`);




}

// Função para excluir a localização
function deleteLocation(id) {
    const confirmDelete = confirm(`Tem certeza que deseja excluir a localização com ID: ${id}?`);
    if (confirmDelete) {
        alert(`Localização com ID: ${id} excluída.`);
        // Adicione aqui a lógica para remover do banco e atualizar o mapa
    }
}

// Atualiza a posição do mapa e do marcador com base na localização do dispositivo
//  map.locate();
//  map.on('locationfound', e => {
//      map.panTo(e.latlng);
//      marker.setLatLng(e.latlng);
//  });

// Função para salvar as coordenadas no banco
async function saveLocation(lat, lng, dados) {
    try {
        // Substitua esta URL pela sua API para salvar os dados no banco
        if( !dados.titulo || !dados.nome || !dados.contato || !dados.descricao || !dados.valor){
            alert('Preencha os dados do cadasdro do imovel.');
        }
      

            const response = await fetch('http://localhost:3000/api/imoveis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ latitude: lat, longitude: lng , dados}),
            });
            

            console.log(response,"Response")
            if (response.ok) {
                alert('Localização salva com sucesso!');
                location.reload();
            } else {
                alert('Erro ao salvar localização.');
            }
        
        console.log(lat, lng, dados)
    } catch (error) {
        console.error('Erro ao salvar localização:', error);
        alert('Erro ao salvar localização.');
    }
}
// function guardarLoc(p1, p2){

// }
let p1;
let p2;

let titulo
let nome
let descricao
let valor 
let contato

document.getElementById('imovelForm').addEventListener('submit', (e) => {
    e.preventDefault();
     titulo = document.getElementById('titulo').value;
     nome = document.getElementById('nome').value;
     descricao = document.getElementById('descricao').value;
     valor = document.getElementById('valor').value;
     contato = document.getElementById('contato').value;

    console.log('Dados do formulário:', { titulo, nome, descricao, valor, contato });
    alert('Formulário enviado com sucesso!');
    alert('Escolha a Localizacao Do imovel no map e clique para salvar');
    marker.bindPopup(`Contato:${ contato }, ${titulo}`).openPopup();
    e.target.reset();
});     




// Evento para capturar a posição final do marcador após ser movido
marker.on('click', () => {
    const position = marker.getLatLng(); // Obtem a posição atual do marcador
    console.log(`Posição do marcador: Latitude: ${position.lat}, Longitude: ${position.lng}`);

    p1= position.lat;
    p2 = position.lng;

    console.log(p1, p2,"p1 e p2")
    const dados = {titulo,nome,descricao,valor, contato}

    console.log(typeof dados)
   if(!dados.titulo){
       alert("Preencha os dados ")
    }
    else{
        alert("Deseja salvar nessa Localização?")
        saveLocation(position.lat, position.lng, dados);
        // Recarregar a página
       

    }
   //pegando a latitude e longitude e jogando no campo do form 
    // const latitude = document.getElementById('latitude').value = position.lat;
    // const longitude = document.getElementById('longitude').value = position.lng;
    // console.log(latitude, longitude)
});

// Botão de busca por endereço
document.getElementById('search-btn').addEventListener('click', async () => {
    const query = document.getElementById('search').value;
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`
    );
    const data = await response.json();

    if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        map.setView([lat, lon], 15); // Centralizar no resultado
        marker.setLatLng([lat, lon]); // Atualizar posição do marcador
        marker.bindPopup(display_name).openPopup();
        //testando info
        let p = {nome:"Luciana", contato: "8018081", desc: "Aluga-se casa"}
        marker.bindPopup("Luciana, contato: 8282882").openPopup(AnimationEvent)
    } else {
        alert('Localização não encontrada.');
    }
});

// Botão para salvar localização
// document.getElementById('save-btn').addEventListener('click', () => {
//     const position = marker.getLatLng(); // Obtem a posição atual do marcador
//     console.log(position)
//     saveLocation(position.lat, position.lng); // Salva no banco
// });

//form

