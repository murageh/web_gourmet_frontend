import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

export const submitUrl = async (url: string = '') => {
    let response = undefined;

    const formData = new FormData();
    formData.append('url', url);

    try {
        const res = await api.post('/submit_url', formData);
        response = {
            success: true,
            data: res.data,
            error: null,
        }
    } catch (error: any) {
        console.log({error});
        response = {
            success: false,
            data: null,
            error: (error.response?.data?.message || error.message).toString()
        };
    }

    return {...response} as const;
}

export const submitQuestion = async (question: string, url: string) => {
    let response = undefined;

    let formData = new FormData();
    formData.append('question', question);
    formData.append('url', url);

    try {
        const res = await api.post('/ask_question', formData);
        response = {
            success: true,
            data: res.data,
            error: null,
        }
    } catch (error: any) {
        response = {
            success: false,
            data: null,
            error: error.response?.data?.message || error.message,
        };
    }

    return {...response} as const;
    // exporting as const for more convenient typechecking during usage,
    // as opposed to declaring custom types
}