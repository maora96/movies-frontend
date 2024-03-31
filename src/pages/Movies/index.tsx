import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getToken } from "../../api";

export function Movies() {
  //   const [request, setRequest] = useState<getManyTasks>({});

  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      navigate("/");
    }
  }, []);

  //   const { data, refetch } = useGetTasks(request);
  //   const { data: allTags, refetch: refetchTags } = useGetTags();

  //   const onFinish = (values: FormValues) => {
  //     setRequest({
  //       title: values.title,
  //     });
  //   };

  //   const handleChange = (value: string[]) => {
  //     setRequest({ ...request, tags: value });
  //   };

  return <div></div>;
}
