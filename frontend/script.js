


let center = [-6.847126972470373, -38.3518660068512];

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
            console.log(location.id,"id no map")
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
                <p>${location.id}</p>
            `;
            marker.bindPopup(popupContent);
        });
    } catch (error) {
        console.error('Erro ao carregar localizações:', error);
    }
}

loadLocations();

//editar localização
// function editLocation(id) {
//     alert(`Editar localização com ID: ${id}`);
// }

// Função para editar a localização
const btnEdite =document.querySelector('.btn-submit2')
const btnSubmit =document.querySelector('.btn-submit')
async function editLocation(id) {
    try {
        // Buscar os dados do imóvel atual

        btnEdite.classList.add('flex')
        btnSubmit.classList.add('none')

        console.log("editlocation")
        const response = await fetch(`http://localhost:3000/api/imoveis`);
        const locations = await response.json();
        const imovel = locations.find(location => location.id === id);

        if (!imovel) {
            alert('Imóvel não encontrado!');
            return;
        }

        // Preencher o formulário com os dados do imóvel
        document.getElementById('imovelId').value = imovel.id;
        document.getElementById('titulo').value = imovel.titulo;
        document.getElementById('nome').value = imovel.nome;
        document.getElementById('descricao').value = imovel.descricao;
        document.getElementById('valor').value = imovel.valor;
        document.getElementById('contato').value = imovel.contato;

        // alert('Você pode arrastar o marcador para alterar a localização do imóvel.');

        // Adicionar marcador temporário no mapa para edição da localização
        
        // Atualizar os dados no backend ao enviar o formulário
        btnEdite.addEventListener('click', async function (e) {
            e.preventDefault();
            
            const titulo = document.getElementById('titulo').value;
            const nome = document.getElementById('nome').value;
            const descricao = document.getElementById('descricao').value;
            const valor = parseFloat(document.getElementById('valor').value);
            const contato = document.getElementById('contato').value;
            
            const data = {
                titulo,
                nome,
                descricao,
                valor,
                contato,
                
               
            };
            
            alert('Formulário enviado com sucesso!');
            alert('Escolha a Localizacao Do imovel no map e clique para salvar');
           
            const tempMarker = L.marker([imovel.latitude, imovel.longitude], {
                draggable: true,
                icon: L.icon({
                    iconUrl: './img/home-address.png',
                    iconSize: [40, 40]
                })
            }).addTo(map);
            
            tempMarker.bindTooltip(titulo, {
                
                permanent: true, // Sempre visível
                direction: 'top', // Acima do marcador
                className: 'custom-tooltip' // Classe CSS para estilizar
            });
          
            console.log(id)
            let idDelete = id
            
            tempMarker.on('click',async () => {
                const position = tempMarker.getLatLng(); // Obtem a posição atual do marcador
                console.log(`Posição do marcador: Latitude: ${position.lat}, Longitude: ${position.lng}`);
            
                
               let urlEdite = `http://localhost:3000/api/imoveis/${id}`
                console.log(p1, p2,"p1 e p2")
                // const dados = {titulo,nome,descricao,valor, contato}
            
                console.log(data)
              
              
                    alert("Deseja salvar nessa Localização?")
                     const responseUpdate = await fetch(`http://localhost:3000/api/imoveis/${id}`, {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ latitude: position.lat, longitude: position.lng , data}),
            });

            if (!responseUpdate.ok) {
                alert('Erro ao atualizar imóvel.');
                return;
            }

            alert('Imóvel atualizado com sucesso!');
            await loadLocations()
            location.reload()
                  
        //    deleteLocation(idDelete)
                    // Recarregar a página
                   
            
               //pegando a latitude e longitude e jogando no campo do form 
                // const latitude = document.getElementById('latitude').value = position.lat;
                // const longitude = document.getElementById('longitude').value = position.lng;
                // console.log(latitude, longitude)
            });












            // location.reload();
            
           
        });
    } catch (error) {
        console.error('Erro ao editar imóvel:', error);
        alert('Erro ao editar imóvel.');
    }
}

// Função para excluir a localização
async function deleteLocation(id) {
    const confirmDelete = confirm(`Tem certeza que deseja excluir a localização com ID: ${id}?`);
    if (confirmDelete) {
        const res = await fetch(`http://localhost:3000/api/imoveis/${id}`,{
            method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
        })

        console.log(res, "res no script")

        if(!res.ok){
            alert("Erro ao excluir imovel")
            return;
        }
        
        alert(`Localização com ID: ${id} excluída.`);
        location.reload();

        // Adicione aqui a lógica para remover do banco e atualizar o mapa
    }
}

//Atualiza a posição do mapa e do marcador com base na localização do dispositivo


// Função para salvar as coordenadas no banco
async function saveLocation(lat, lng, dados, metodo, url) {
    try {

        console.log(url, metodo, "metodo no savelocation")
        // Substitua esta URL pela sua API para salvar os dados no banco
       if(metodo ==="POST"){
        if( !dados.titulo || !dados.nome || !dados.contato || !dados.descricao || !dados.valor){
            alert('Preencha os dados do cadasdro do imovel.');
        }
       }
      

            const response = await fetch(url, {
                method: `${metodo}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ latitude: lat, longitude: lng , dados}),
            });
            

            console.log(response,"Response")
            if(metodo === 'PUT'){
                 alert('Localização salva com sucesso!');
             }
            if (response.ok && metodo==="POST") {
                alert('Localização salva com sucesso!');
                location.reload();
            }
             else {
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
let marker1
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

    // marker1 = L.icon({
    //     iconUrl: './img/home-address.png',
    //     iconSize: [40, 40]
    // });
    //  marker1 = L.marker(center, {
    //     draggable: true,
    //     title: 'Imovel',
    //     icon: myIcon
    // }).addTo(map);
    
    marker.bindPopup(`Contato:${ contato }, ${titulo}`).openPopup();
    e.target.reset();
});     

let metodo = 'POST'
let urlPost = 'http://localhost:3000/api/imoveis'


// Evento para capturar a posição final do marcador após ser movido
marker.on('click', () => {

    console.log("cliquei")
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
        saveLocation(position.lat, position.lng, dados,metodo,urlPost);
        // Recarregar a página
        location.reload()
       

    }
 
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


