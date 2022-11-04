import type { NextPage } from "next";
import { useMemo, useState } from "react";
import Head from "next/head";
import AutoComplete from "components/AutoComplete";
import { useRouter } from "next/router";
import { useDebouncedCallback } from "use-debounce";
import CardList from "components/CardList";
import Layout from "components/Layout";
import { useSpring, animated } from "react-spring";
import useFetch from "hooks/useFetch";
import useFilteredSearch from "hooks/useFilteredSearch";
import usePrevious from "hooks/usePrevious";
import { TagType, SearchValueType, RichNameType } from "types/common";
import * as gtag from "lib/gtag";
import { Url } from "url";

function shuffle(array: RichNameType[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
const Home: NextPage = () => {
  const { data: cities } = useFetch({ path: "cities" });
  const { data: ethnicities } = useFetch({ path: "ethnicities" });
  const { loading, data: names } = useFetch({ path: "names" });
  const router = useRouter();
  const [search, setSearch] = useState<SearchValueType>();

  const debouncedHandleSearch = useDebouncedCallback((value) => {
    handleSearch(value);
  }, 800);

  const richNames = useMemo<RichNameType[]>(() => {
    const rest = [...names];
    rest.shift();
    const data = names[0] ? [names[0], ...shuffle(rest)] : [];
    const rn = data.map((name) => {
      const _cod = cities.find((city) => city.id === name.cod);
      const _e = ethnicities.find((ethnic) => ethnic.id === name.e);
      const _fn = `${name.firstName} ${name.lastName}`;
      return { ...name, _cod, _e, _fn } as RichNameType;
    });
    return rn;
  }, [cities.length, ethnicities.length, names.length]);

  const { result, count } = useFilteredSearch<TagType, RichNameType>({
    data: richNames,
    search,
  });

  const prevCount = usePrevious(count);
  const { val: animatedCount } = useSpring({
    val: count,
    from: { val: prevCount },
  });

  function handleSearch(search: SearchValueType) {
    setSearch(search);
    const term = search?.term;
    const tagIds = search?.tags?.map(({ id }) => id);
    const updatedRouter = {
      ...router,
      query: { ...(term ? { term } : {}), ...(tagIds ? { tagIds } : {}) },
    };
    router.replace(updatedRouter as unknown as Url, undefined, {
      shallow: true,
    });

    gtag.event({
      action: "name_search",
      category: "Search",
      label: search,
    });
  }

  return (
    <div>
      <Head>
        <title>SAY THEIR NAMES</title>
        <meta name="description" content="Lives taken by Islamic Republic." />
        <meta name="title" content="Say Their Names." />
        <meta
          name="description"
          content="For those beautiful lives taken by Islamic Republic."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://saytheirnames.today/" />
        <meta property="og:title" content="Say Their Names." />
        <meta
          property="og:description"
          content="For those beautiful lives taken by Islamic Republic."
        />
        <meta
          property="og:image"
          content="https://saytheirnames.today/images/meta.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://saytheirnames.today/" />
        <meta property="twitter:title" content="Say Their Names." />
        <meta
          property="twitter:description"
          content="For those beautiful lives taken by Islamic Republic."
        />
        <meta
          property="twitter:image"
          content="https://saytheirnames.today/images/meta.png"
        ></meta>

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div>
          <div className="grid grid-cols-1  gap-1 pt-10 pb-6  sm:grid-cols-2 ">
            <div className=" flex flex-col ">
              <article className="px-5 pb-2">
                <h1 className="text-5xl font-black tracking-[-.06em] text-secondary sm:text-6xl md:text-7xl 	">
                  SAY THEIR NAMES
                </h1>
                <h2 className=" mb-4 p-2  text-base capitalize  text-secondary 	">
                  Lives taken by Islamic Republic.
                </h2>
              </article>
              <AutoComplete
                className="  flex-1 px-5 sm:max-w-lg sm:px-5"
                data={[...ethnicities, ...cities]}
                onChange={debouncedHandleSearch}
              />
            </div>
            <div className=" mx-5 flex 	 flex-col items-end		 ">
              <div className="w-full sm:w-auto">
                <div className=" stat bg-secondary p-2 px-6 text-secondary-content  shadow  sm:w-[270px] sm:p-6">
                  <div className=" sm:auto	   stat flex items-center self-center justify-self-center p-0 sm:block">
                    <div className="stat-title">Total Names</div>
                    <div className="stat-value">
                      <animated.div className="number">
                        {animatedCount.to((val) => Math.floor(val))}
                      </animated.div>
                    </div>
                    <div className="stat-desc hidden sm:block">
                      Among the confirmed names.
                    </div>
                  </div>
                </div>
                <div className=" flex-row pt-3">
                  <a
                    href="https://github.com/nashagout/saytheirnames"
                    className="link-hover link flex items-center justify-center text-sm"
                  >
                    <svg
                      width="18"
                      height="18"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="fill-current"
                    >
                      <path d="M256,32C132.3,32,32,134.9,32,261.7c0,101.5,64.2,187.5,153.2,217.9a17.56,17.56,0,0,0,3.8.4c8.3,0,11.5-6.1,11.5-11.4,0-5.5-.2-19.9-.3-39.1a102.4,102.4,0,0,1-22.6,2.7c-43.1,0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1,1.4-14.1h.1c22.5,2,34.3,23.8,34.3,23.8,11.2,19.6,26.2,25.1,39.6,25.1a63,63,0,0,0,25.6-6c2-14.8,7.8-24.9,14.2-30.7-49.7-5.8-102-25.5-102-113.5,0-25.1,8.7-45.6,23-61.6-2.3-5.8-10-29.2,2.2-60.8a18.64,18.64,0,0,1,5-.5c8.1,0,26.4,3.1,56.6,24.1a208.21,208.21,0,0,1,112.2,0c30.2-21,48.5-24.1,56.6-24.1a18.64,18.64,0,0,1,5,.5c12.2,31.6,4.5,55,2.2,60.8,14.3,16.1,23,36.6,23,61.6,0,88.2-52.4,107.6-102.3,113.3,8,7.1,15.2,21.1,15.2,42.5,0,30.7-.3,55.5-.3,63,0,5.4,3.1,11.5,11.4,11.5a19.35,19.35,0,0,0,4-.4C415.9,449.2,480,363.1,480,261.7,480,134.9,379.7,32,256,32Z"></path>
                    </svg>
                    <p className="mx-2">Contribute to the project.</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className=" sm:px-8">
            <CardList data={result} loading={loading} search={search} />
          </div>
        </div>
      </Layout>

      <footer></footer>
    </div>
  );
};

export default Home;
