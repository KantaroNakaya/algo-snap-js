import { getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import { notFound } from "next/navigation";
import { NEWS_LIST_LIMIT } from "@/app/_constants";
import Pagination from "@/app/_components/Pagination";
import Hero from "@/app/_components/Hero";

type Props ={
    params: {
        current: string;
    }
}

export default async function Page({params}: Props){
    const current = parseInt(params.current, 10);

    if(Number.isNaN(current) || current < 1){
        notFound();
    }

    const { contents: news,totalCount } = await getNewsList({
        limit: NEWS_LIST_LIMIT,
        offset: NEWS_LIST_LIMIT * (current - 1),
    });

    if(news.length === 0){
        notFound();
    }

    return (
        <>
            <Hero title="News" sub="ニュース" />
            <NewsList news={news} />
            <Pagination
                totalCount={totalCount}
                currentPage={current}
                perPage={NEWS_LIST_LIMIT}
                basePath="/news"
            />
        </>
    );
}