const { VITE_SERVER_ADRESS, VITE_SERVER_PORT } = import.meta.env; // Get env variables
const url = 'http://' + VITE_SERVER_ADRESS + ':' + VITE_SERVER_PORT + '/posts'; // Build url

const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'accept': 'application/json'
}

export { url, headers };