import { useEffect, useState } from "react";
import { NameType, CityType, EthnicType } from "types/common";

type PathType = "cities" | "ethnicities" | "names";

function useFetch({ path }: { path: PathType }): {
  loading: boolean;
  data: NameType[] & CityType[] & EthnicType[];
} {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/${path}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoading(false);
          setData(result.data);
        },
        (reject) => {}
      );
  }, []);

  return {
    loading,
    data,
  };
}

export default useFetch;
