import { PUBLIC_SERVER_URL } from '$env/static/public';
import axios from 'axios';

export const HTTP = axios.create({
	baseURL: PUBLIC_SERVER_URL
});
