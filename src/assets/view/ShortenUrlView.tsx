// ShortenUrlView.tsx
import React, { useState } from 'react';
import axios from 'axios';

const ShortenUrlView: React.FC = () => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');

    const handleShortenUrl = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/create', { original_url: originalUrl });
            setShortenedUrl(response.data.data.shortened_url);
        } catch (error) {
            console.error('Error shortening URL:', error);
        }
    };

    return (
        <div>
            <h1>Acortar URL</h1>
            <input
                type="text"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="Ingresa la URL original"
            />
            <button className='btn btn-blue' onClick={handleShortenUrl}>Acortar</button>
            {shortenedUrl && <p>URL Acortada: <a href={`http://localhost:8000/${shortenedUrl}`}>{shortenedUrl}</a></p>}
        </div>
    );
};

export default ShortenUrlView;
