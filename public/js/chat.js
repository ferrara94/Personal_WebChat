
const btnEntra = document.getElementById('btnEntra');
btnEntra.addEventListener('click', loginPhase);

const btnEsci = document.getElementById('btnEsci');
btnEsci.addEventListener('click', logOutPhase);

const areaChatP = document.getElementById('chat_area_p');
const areaLonginP = document.getElementById('login_area_p');

let socket;

function loginPhase() {

    let username = document.getElementById('username').value;
    //document.getElementById('tempName').textContent = username;
    
    areaChatP.classList.remove('inactive');

    
    areaLonginP.classList.add('inactive');

    
    socket = io({ query: `username=${username}` });
    console.log(username);

    let chatForm = document.getElementById('ChatF');

    let messages = [];


    //Message from Server
    socket.on('message', message => {
        console.log(typeof message);
        outputM(message);
    });

    socket.on('welcome_broadcast', message => {
        console.log(message);

        const users = document.getElementById('users');
        let l = document.createElement('label');
        //document.getElementById('').style.fontWeight = 'bold'
        l.textContent = message;
        l.style.fontWeight = 'bold';
        l.style.color = 'green';
        
        users.appendChild(l);
        users.appendChild(document.createElement('br'));
    });

    socket.on('welcome', message => {
        console.log(message);
        //outputM(message);
    });

    socket.on('leave', message => {
        console.log(message);
        const users = document.getElementById('users');
        let l = document.createElement('label');
        l.textContent = message;
        l.style.fontWeight = 'bold';
        l.style.color = 'red';
        users.appendChild(l);
        users.appendChild(document.createElement('br'));

    });

    chatForm.addEventListener('submit', e => {

        e.preventDefault();

        //get Message Text
        const m = e.target.elements.msg.value;

        
        /*
            emit(send) the message to Server; 
            It can forward to Clients
        */
        socket.emit('chatMsg', `${username}: ${m}`);

        e.target.elements.msg.value = '';

    });

    //Outup on DOM for messages
    function outputM(message) {
        let m = message.split(':');
        const area = document.getElementById('msgArea');
        let p = document.createElement('p');
        
        let name = document.createElement('label');

        name.textContent = m[0] ;
        name.style.fontWeight = 'bold';

        p.appendChild(name);


        let stringa = "";
        let i;
        for(i=1; i<m.length; i++) {
            stringa += ': '+m[i] ;
        }

        let out = document.createElement('label');
        out.textContent = stringa;


        p.appendChild(out);

        area.appendChild(p);

    }

    

} //end login phase

function logOutPhase() {
    
    areaChatP.classList.add('inactive');
    areaLonginP.classList.remove('inactive');

    socket.disconnect(true);
    
    username = "";

}

