const axios = require('axios');
const API = 'http://localhost:5000';

(async () => {
    const rand = Math.random().toString(36).substring(7);
    const username = 'test_' + rand;
    const password = 'pass123';

    console.log('=== STEP 1: Register ===');
    try {
        const r1 = await axios.post(API + '/register', { username, password });
        console.log('Register OK:', r1.data);
    } catch (e) {
        console.error('Register FAIL:', e.response?.status, e.response?.data);
        return;
    }

    console.log('\n=== STEP 2: Login ===');
    let token;
    try {
        const r2 = await axios.post(API + '/customer/login', { username, password });
        console.log('Login response:', JSON.stringify(r2.data));
        token = r2.data.accessToken;
        console.log('Token received:', typeof token, token ? token.substring(0, 30) + '...' : 'NULL/UNDEFINED');
    } catch (e) {
        console.error('Login FAIL:', e.response?.status, e.response?.data);
        return;
    }

    if (!token) {
        console.error('NO TOKEN RECEIVED - this is the root cause!');
        return;
    }

    console.log('\n=== STEP 3: Post Review ===');
    try {
        const r3 = await axios.put(
            API + '/customer/auth/review/9780140449136',
            { review: 'Test review from script' },
            { headers: { Authorization: 'Bearer ' + token } }
        );
        console.log('Review OK:', JSON.stringify(r3.data));
    } catch (e) {
        console.error('Review FAIL:', e.response?.status, JSON.stringify(e.response?.data));
        console.error('Request headers sent:', JSON.stringify(e.config?.headers));
    }
})();
