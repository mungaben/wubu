import axios, { AxiosResponse } from 'axios';

export const generateMnemonic = async () => {
    const url = 'https://staging.api.benkiko.io/v1/generate-mnemonic';
    const CSRFToken = 'oUINOSN1zmEiQxMWYpjpIX4CqM1k7qOQlNPOsQ7LbhuhIc4JdXaN6jtbiGS7UShG';
    const data = {
        language: "ENGLISH",
        strength: 256
    };
    const headers = {
        'Content-Type': 'application/json',
        'X-CSRFTOKEN': CSRFToken
    };

    try {
        const response: AxiosResponse = await axios.post(url, data, { headers });
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

generateMnemonic();