// let center = [-6.888744873962035, -38.56063094900568];
//         var map = L.map('map').setView(center, 14);
//         L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//             maxZoom: 19,
//             attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//         }).addTo(map);
        
//         var myIcon = L.icon({
//             iconUrl: 'https://cdn-icons-png.flaticon.com/256/5310/5310672.png',
//             iconSize: [40, 40]
//         });
        
//         let marker = L.marker(center,{
//             draggable:true,
//             title: 'Meu evento',
//             icon: myIcon
//         }).addTo(map);
//         map.locate();
//         map.on('locationfound', e=>{
//             map.panTo(e.latlng);
//             marker.setLatLng(e.latlng);
//         });



//         document.getElementById('search-btn').addEventListener('click', async () => {
//             let marker = L.marker(center,{
//                 draggable:true,
//                 title: 'Meu evento',
//                 icon: myIcon
//             }).addTo(map);
//             const query = document.getElementById('search').value;
//             const response = await fetch(
//               `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`
//             );
//             const data = await response.json();
      
//             if (data.length > 0) {
//               const { lat, lon, display_name } = data[0];
//               map.setView([lat, lon], 15); // Centralizar no resultado
//               L.marker([lat, lon]).addTo(map).bindPopup(display_name).openPopup();
//               map.on('locationfound', e=>{
//                 map.panTo(e.latlng);
//                 console.log(map.panTo(e.latlng))
//                 marker.setLatLng(e.latlng);
//             });
    
//             map.on('locationerror', e=>{
//                 console.log('Localização não encontrada');
//             });
        
//             map.on('click', e =>{
//                 marker.setLatLng(e.latlng);

//                 const log = pointToLatLng(e.latlng)
//                 console.log(log)
//             });
//             } else {
//               alert('Localização não encontrada.');
//             }
//           });



let center = [-6.84249319266054, -38.34425926208497];

// Inicializa o mapa centrado na localização definida
var map = L.map('map').setView(center, 14);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Define o ícone personalizado
var myIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/256/5310/5310672.png',
    iconSize: [40, 40]
});

// Adiciona o marcador inicial com a opção de arrastar (draggable)
let marker = L.marker(center, {
    draggable: true,
    title: 'Meu evento',
    icon: myIcon
}).addTo(map);

// Atualiza a posição do mapa e do marcador com base na localização do dispositivo
// map.locate();
// map.on('locationfound', e => {
//     map.panTo(e.latlng);
//     marker.setLatLng(e.latlng);
// });

// Função para salvar as coordenadas no banco
// async function saveLocation(lat, lng) {
//     try {
//         // Substitua esta URL pela sua API para salvar os dados no banco
//         const response = await fetch('/api/save-location', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ latitude: lat, longitude: lng }),
//         });

//         if (response.ok) {
//             alert('Localização salva com sucesso!');
//         } else {
//             alert('Erro ao salvar localização.');
//         }
//     } catch (error) {
//         console.error('Erro ao salvar localização:', error);
//         alert('Erro ao salvar localização.');
//     }
// }

// Evento para capturar a posição final do marcador após ser movido
marker.on('moveend', () => {
    const position = marker.getLatLng(); // Obtem a posição atual do marcador
    console.log(`Posição do marcador: Latitude: ${position.lat}, Longitude: ${position.lng}`);
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
document.getElementById('save-btn').addEventListener('click', () => {
    const position = marker.getLatLng(); // Obtem a posição atual do marcador
    console.log(position)
    saveLocation(position.lat, position.lng); // Salva no banco
});


       
