import axios from 'axios';

const checkPassword = password => axios.put('/api/v1/user/password/check', { password });

export default checkPassword;
