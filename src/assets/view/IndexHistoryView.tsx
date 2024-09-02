import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Url {
    id: number;
    original_url: string;
    shortened_url: string;
    created_at: string;
}

const IndexHistoryView: React.FC = () => {
    const [urls, setUrls] = useState<Url[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUrls = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/history');
                setUrls(response.data);
            } catch (error) {
                setError('Error fetching URLs');
                console.error('Error fetching URLs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUrls();
    }, []);

    if (loading) {
        return <div className="text-center py-10">Cargando...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center py-10">{error}</div>;
    }

    return (
        
        <div className="container mx-auto py-10">
            
            <h1 className="text-2xl font-bold mb-6 text-center">Historial de URLs Acortadas</h1>
            <div className="overflow-x-auto">
                
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="w-20 py-2">ID</th>
                            <th className="py-2">URL Original</th>
                            <th className="py-2">URL Acortada</th>
                            <th className="py-2">Fecha de Creación</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {urls.map((url) => (
                            <tr key={url.id} className="border-b hover:bg-gray-100">
                                <td className="py-2 text-center">{url.id}</td>
                                <td className="py-2 px-4 break-all">{url.original_url}</td>
                                <td className="py-2 text-center">
                                    <a
                                        href={`http://127.0.0.1:8000/api/${url.shortened_url}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        {`http://127.0.0.1:8000/api/${url.shortened_url}`}
                                    </a>
                                </td>
                                <td className="py-2 text-center">{new Date(url.created_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default IndexHistoryView;
