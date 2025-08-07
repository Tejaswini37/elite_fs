const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });
console.log('WebSocket server running on ws://localhost:8080');

let employees = [];
let idCounter = 1;

server.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        const msg = message.toString().trim();
        const parts = msg.split(' ');
        const command = parts[0].toUpperCase();

        if (command === 'INSERT' && parts.length === 3) {
            const name = parts[1];
            const salary = parseInt(parts[2], 10);
            if (!isNaN(salary)) {
                employees.push({ id: idCounter++, name, salary });
                ws.send('Employee inserted successfully.');
            } else {
                ws.send('Invalid salary value.');
            }
        } else if (command === 'RETRIEVE') {
            const response = employees
                .map(emp => `ID: ${emp.id}, Name: ${emp.name}, Salary: ${emp.salary}`)
                .join('\n') || 'No employees found.';
            ws.send(response);
        } else {
            ws.send('Invalid command.');
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
