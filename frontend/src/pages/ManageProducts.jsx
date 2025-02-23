import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../components/ui/table";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import {
	getallProducts,
	getOldProduct,
	deleteProduct,
} from "../api/product.js";

import { useDispatch } from "react-redux";

import { setOldProduct } from "../store/slices/oldProduct.js";

function formatMMK(amount) {
	if (amount >= 100000) {
		return (amount / 100000).toFixed(1).replace(".0", "") + "Lakh";
	}
	return amount;
}

const ManageProducts = () => {
	const [products, setProducts] = useState([]);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const getproducts = async () => {
		const res = await getallProducts();
		if (res.status === 200) {
			return setProducts(res.data.products);
		}
		toast.error(res.data.message);
		return navigate("/");
	};

	useEffect(() => {
		getproducts();
	}, []);

	const handleEdit = async (id) => {
		const res = await getOldProduct(id);
		if (res.status === 200) {
			toast.success(res.data.message);
			dispatch(setOldProduct(res.data.oldProduct));
			return navigate(`/edit-product/${id}`);
		}
		toast.error(res.data.message);
		return navigate("/");
	};

	const handleDelete = async (id, seller) => {
		const res = await deleteProduct(id, seller);
		if (res.status === 200) {
			getproducts()
			return toast.success(res.data.message);
		}
		return toast.error(res.data.message);
	};
	return (
		<div className='mt-12 mx-3'>
			{products.length > 0 && (
				<Table>
					<TableCaption>A list of your recent invoices.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className='min-w-[100px] md:w-[200px]'>
								name
							</TableHead>
							<TableHead>category</TableHead>
							<TableHead className='min-w-[100px]'>
								createdAt
							</TableHead>
							<TableHead>price</TableHead>
							<TableHead>status</TableHead>

							<TableHead className='text-center'>
								action
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{products.map((product) => (
							<TableRow key={product._id}>
								<TableCell className='font-medium'>
									{product.name}
								</TableCell>
								<TableCell>{product.category}</TableCell>
								<TableCell>
									{product.createdAt.split("T")[0]}
								</TableCell>
								<TableCell>
									{formatMMK(product.price)}
								</TableCell>
								<TableCell>{product.status}</TableCell>
								<TableCell className='text-center hover:underline flex gap-2'>
									<button
										onClick={() => handleEdit(product._id)}>
										edit
									</button>
									<button
										onClick={() =>
											handleDelete(
												product._id,
												product.seller,
											)
										}>
										delete
									</button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
			{products.length === 0 && <p>No products add</p>}
		</div>
	);
};

export default ManageProducts;
