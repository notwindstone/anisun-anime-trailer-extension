import React from "react";
import Skeleton from "../Skeleton/Skeleton";
import { useQuery } from "@tanstack/react-query";

export default function Trailer({
    idMal,
}: {
    idMal: string;
}) {
    const { isPending, error, data } = useQuery({
        queryKey: ["anime", "trailer", idMal],
        queryFn:  async () => {
            const response = await fetch("https://graphql.anilist.co", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    query: `query($type: MediaType, $idMal: Int) {
                        Media(type: $type, idMal: $idMal) {
                          trailer {
                            id
                          }
                        }
                    }`,
                    variables: {
                        idMal: idMal,
                        type: "ANIME",
                    },
                }),
            });
            const body: {
                data?: {
                    Media?: {
                        trailer?: {
                            id?: string;
                        }
                    }
                }
            } = await response.json();

            return `https://youtube.com/embed/${body?.data?.Media?.trailer?.id}`;
        },
    });

    if (isPending) {
        return (
            <Skeleton
                title="Fetching..."
                description="Fetching anime trailer from Anilist."
            />
        );
    }

    if (error) {
        return (
            <Skeleton
                pulse={false}
                title="Error..."
                description="Failed to fetch trailer from Anilist."
            />
        );
    }

    return (
        <>
            <iframe
                className="aspect-video w-full border-none rounded-none"
                src={data}
                allow="autoplay *; fullscreen *"
            />
        </>
    );
}