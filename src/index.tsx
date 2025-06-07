import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import "./globals.css";
import Skeleton from "./Skeleton/Skeleton";
import Trailer from "./Trailer/Trailer";

const queryClient = new QueryClient();

function App() {
    const [idMal, setIdMal] = useState<string>();

    useEffect(() => {
        console.log("%c`anime-trailers` extension initialized", "background-color: #111;font-size: 28px;color:white;");

        if (location === undefined) {
            return;
        }

        const pathnames = location.pathname.split("/");
        const animeId = pathnames[pathnames.length - 1];

        setIdMal(animeId);
    }, []);

    if (!idMal) {
        return (
            <Skeleton
                title="Loading..."
                description="Getting current anime ID."
            />
        );
    }

    return (
        <div id="extensions-app-shell-id" className="bg-white dark:bg-black absolute top-0 right-0 left-0 bottom-0 z-10">
            <QueryClientProvider client={queryClient}>
                <Trailer idMal={idMal} />
            </QueryClientProvider>
        </div>
    );
}

export default App;