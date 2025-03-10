import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../components/ui/table";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "../../components/ui/pagination";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader, ArrowDownUp } from "lucide-react";
import { useEffect, useState } from "react";

import { getAllProducts, productStatus } from "../../api/admin.js";

import { setOldProduct } from "../../store/slices/oldProduct.js";
import { formatDate } from "../../lib/formatDate";

function formatMMK(amount) {
	if (amount >= 100000) {
		return (amount / 100000).toFixed(1).replace(".0", "") + "Lakh";
	}
	return amount;
}

const AdminDashboard = () => {
	const [page, setPage] = useState(1);
	const [sort, setSort] = useState(-1);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();

	const getproducts = async () => {
		setLoading(true);
		const res = await getAllProducts(page,sort);
		if (res.status === 200) {
			setLoading(false);
			setTotalPages(res.data.totalPages);
			return setProducts(res.data.products);
		}
		toast.error(res.data.message);
		setLoading(false);
		return navigate("/");
	};

	useEffect(() => {
		getproducts();
	}, [page,sort]);

	const handleStatus = async (id, status) => {
		setIsSubmitting(true);
		const res = await productStatus(id, status);
		if (res.status === 200) {
			getproducts();
			setIsSubmitting(false);
			return toast.success(res.data.message);
		}
		setIsSubmitting(false);
		return toast.error(res.data.message);
	};

	if (loading) {
		return (
			<section className='flex justify-center items-center h-screen'>
				getting products ...
			</section>
		);
	}
	return (
		<div className='mt-12 mx-3'>
			{products.length > 0 && (
				<Table>
					<TableCaption>A list of your products.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className='min-w-[100px] md:w-[200px]'>
								name
							</TableHead>
							<TableHead>category</TableHead>
							<TableHead className='min-w-[100px] '>
								<p
									className='flex items-center gap-1'
									onClick={() =>
										setSort(sort === 1 ? -1 : 1)
									}>
									createdAt <ArrowDownUp size={16} />
								</p>
							</TableHead>
							<TableHead>Email</TableHead>
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
									<span className='line-clamp-1'>
										{product.name}
									</span>
								</TableCell>
								<TableCell>{product.category}</TableCell>
								<TableCell>
									{formatDate(product.createdAt)}
								</TableCell>
								<TableCell>{product.seller?.email}</TableCell>
								<TableCell>
									{formatMMK(product.price)}
								</TableCell>
								<TableCell>
									<p
										className={`${
											(product.status === "pending" &&
												"bg-yellow-500") ||
											(product.status === "reject" &&
												"bg-red-500") ||
											(product.status === "active" &&
												"bg-green-500")
										} rounded text-white p-1 text-center font-bold`}>
										{product.status}
									</p>
								</TableCell>
								<TableCell>
									{isSubmitting ? (
										<Loader
											size={16}
											className='animate-spin mx-auto'
										/>
									) : (
										<div className='flex justify-center gap-2 font-bold'>
											{product.status === "active" ||
											product.status === "reject" ? (
												<button
													className='hover:underline text-yellow-500'
													disabled={isSubmitting}
													onClick={() =>
														handleStatus(
															product._id,
															"pending",
														)
													}>
													rollback
												</button>
											) : (
												<div className='flex gap-2'>
													<button
														className='hover:underline text-green-500'
														disabled={isSubmitting}
														onClick={() =>
															handleStatus(
																product._id,
																"active",
															)
														}>
														approve
													</button>
													<button
														className='hover:underline text-red-500'
														disabled={isSubmitting}
														onClick={() =>
															handleStatus(
																product._id,
																"reject",
															)
														}>
														reject
													</button>
												</div>
											)}
										</div>
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
			{products.length === 0 && <p>No products add</p>}
			{totalPages > 1 && (
				<Pagination className='mt-3'>
					<PaginationContent>
						{page > 1 && (
							<PaginationItem>
								<PaginationPrevious
									onClick={() => setPage(page - 1)}
								/>
							</PaginationItem>
						)}

						<PaginationItem>
							<PaginationLink isActive>{page}</PaginationLink>
						</PaginationItem>
						{page < totalPages && (
							<PaginationItem>
								<PaginationEllipsis
									onClick={() => setPage(totalPages)}
								/>
							</PaginationItem>
						)}

						{page < totalPages && (
							<PaginationItem>
								<PaginationNext
									onClick={() => setPage(page + 1)}
								/>
							</PaginationItem>
						)}
					</PaginationContent>
				</Pagination>
			)}
		</div>
	);
};

export default AdminDashboard;
