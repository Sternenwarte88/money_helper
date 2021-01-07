import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const instance = axios.create({
	baseURL: 'http://localhost:28010/mh/',
	headers: {
		'Content-Type': 'application/json',
		Authorization: cookies.get('loginState'),
	},
	mode: 'cors',
	params: { id: cookies.get('id') },
});

export default instance;
