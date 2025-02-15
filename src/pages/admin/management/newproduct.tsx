import { FormEvent, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../types/reducer.types";
import { useNewProductMutation } from "../../../redux/api/productAPI";
import { responseToast } from "../../../utils/features";
import { useNavigate } from "react-router-dom";
import { UploadButton } from "../../../utils/uploadthing";
import "@uploadthing/react/styles.css";
import toast from "react-hot-toast";

const NewProduct = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(1);
  const [description, setDescription] = useState<string>("");
  const [photos, setPhotos] = useState<
    | {
        url: string;
        key: string;
      }[]
    | []
  >([]);

  const [newProduct] = useNewProductMutation();
  const navigate = useNavigate();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!name || !price || stock < 0 || !category) return;
      if (!photos || photos.length === 0) {
        toast.error("Please add photos");
        return;
      }

      const formData = new FormData();

      formData.set("name", name);
      formData.set("description", description);
      formData.set("price", price.toString());
      formData.set("stock", stock.toString());
      formData.set("category", category);

      const res = await newProduct({ id: user?._id!, formData, photos });

      responseToast(res, navigate, "/admin/product");
    } catch (error) {
      // console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImages = (data: any) => {
    setPhotos([
      ...data.map((item: any) => ({
        key: item.key,
        url: item.ufsUrl,
      })),
    ]);
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={(e) => submitHandler(e)}>
            <h2>New Product</h2>
            <div>
              <label>Name</label>
              <input
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                required
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                required
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                required
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Category</label>
              <input
                required
                type="text"
                placeholder="eg. laptop, camera etc"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(data) => handleImages(data)}
              />
            </div>

            <button disabled={isLoading} type="submit">
              {isLoading ? "Creating..." : "Create"}
            </button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
