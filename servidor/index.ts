import { WebSocket, WebSocketServer } from 'ws';

const wss = new WebSocketServer({port: 8080}, ()=>{
    console.log('¡Atento al puerto 8080! 🎧🔥');
    console.log('¡Preparado para despegar hacia nuevas aventuras! 🚀✨');
});

const notifications = [
    {
        id: 1,
        message: '🎉 ¡Gran noticia! Has sido seleccionado como el ganador de nuestro concurso. ¡Felicidades! 🏆✨'
    },
    {
        id: 2,
        message: '🚀 ¡Prepárate para una experiencia increíble! La cuenta regresiva ha comenzado. ⏳💥'
    },
    {
        id: 3,
        message: '💡 ¡Nuevas ideas están en camino! Mantén los ojos bien abiertos para emocionantes actualizaciones. 👀✨'
    },
    {
        id: 4,
        message: '📢 ¡Atención a todos! Una oportunidad única acaba de llegar a tu puerta. No te la pierdas. 🚪💼'
    }
];

wss.on('connection', (ws) => {
    console.log('🎉 ¡Gran noticia! Se conecto un nuevo usuario. 🏆✨');
    ws.send(JSON.stringify({
        message: '🚀 ¡Prepárate para una experiencia increíble! La cuenta regresiva ha comenzado. ⏳💥'
    }));
    ws.on('message', (data) => {
        console.log("data: %s", data);
        const dataJson = JSON.parse(data.toString());
        switch(dataJson.action){
            case 'createNotification':
                const newNotification = {
                    id: notifications.length + 1,
                    message: dataJson.data.message
                } 
                notifications.push(newNotification);

                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            event:"newNotification",
                            data: newNotification
                        }))
                    }
                });
                break;
            case 'getNotifications':
                ws.send(JSON.stringify({
                    event:"getNotifications",
                    data:notifications 
                }))
                break;
            default:
                console.log('No Actions Especifiqued');

        }
    })
})