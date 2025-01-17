import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useDeleteProduct = ({ _id }) => {
  const QueryClient = useQueryClient();
  const deleteRequestItem = `http://localhost:9000/products/${_id}`;

  return useMutation(
    (obj) =>
      axios.delete(deleteRequestItem, JSON.stringify(obj)).then((x) => {
        QueryClient.invalidateQueries("products");
      }),
    {
      onSuccess: async () => {},
    },
    {
      onError: async () => {
        console.log("error");
      },
    }
  );
};

export default useDeleteProduct;
