import { useEffect, useState } from 'react';

const ApiError = ({ statusCode }: { statusCode: number }) => {
    const errorMessages: { [key: number]: string } = {
        503: "Service is temporarily unavailable. Please try again later.",
        502: "Bad Gateway. The server received an invalid response.",
        504: "Gateway Timeout. The request took too long to process.",
        500: "Internal Server Error. Something went wrong.",
        404: "Requested resource not found."
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
            <h1 className="text-3xl font-bold text-red-600">Error {statusCode}</h1>
            <p className="text-gray-600 mt-2">{errorMessages[statusCode] || "An unexpected error occurred."}</p>
        </div>
    );
};

const FetchData = () => {
    const [errorCode, setErrorCode] = useState<number | null>(null);

    useEffect(() => {
        fetch('https://your-api-url.com/data')
            .then((res) => {
                if (!res.ok) {
                    setErrorCode(res.status);
                    throw new Error(`HTTP Error ${res.status}`);
                }
                return res.json();
            })
            .catch((error) => console.error(error));
    }, []);

    if (errorCode) return <ApiError statusCode={errorCode} />;

    return <div>Loading data...</div>;
};

export default FetchData;
