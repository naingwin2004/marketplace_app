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
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

import { getAllUsers, userStatus } from "../../api/admin.js";

import { setOldProduct } from "../../store/slices/oldProduct.js";
import { formatDate } from "../../lib/formatDate";

function formatMMK(amount) {
	if (amount >= 100000) {
		return (amount / 100000).toFixed(1).replace(".0", "") + "Lakh";
	}
	return amount;
}

const ManageUsers = () => {
	const [page, setPage] = useState(1);
	const [users, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalPages, setTotalPages] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();

	const getproducts = async () => {
		setLoading(true);
		const res = await getAllUsers(page);
		if (res.status === 200) {
			setLoading(false);
			setTotalPages(res.data.totalPages);
			return setProducts(res.data.users);
		}
		toast.error(res.data.message);
		setLoading(false);
		return navigate("/");
	};

	useEffect(() => {
		getproducts();
	}, [page]);

	const handleStatus = async (id, status) => {
		setIsSubmitting(true);
		const res = await userStatus(id, status);
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
			{users.length > 0 && (
				<Table>
					<TableCaption>A list of Users.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className='min-w-[100px] md:w-[200px]'>
								userName
							</TableHead>
							<TableHead>email</TableHead>
							<TableHead className='min-w-[100px]'>
								createdAt
							</TableHead>
							<TableHead>status</TableHead>

							<TableHead className='text-center'>
								action
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{users.map((user) => (
							<TableRow key={user._id}>
								<TableCell className='font-medium'>
									<span className='line-clamp-1'>
										{user.username}
									</span>
								</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>

									{formatDate(user.createdAt)}
								</TableCell>
								<TableCell>
									<p
										className={`${
											(user.status === "banned" &&
												"bg-red-500") ||
											(user.status === "active" &&
												"bg-green-500")
										} rounded text-white p-1 text-center font-bold`}>
										{user.status}
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
											{user.status === "active" ? (
												<button
													className='hover:underline text-red-500'
													disabled={isSubmitting}
													onClick={() =>
														handleStatus(
															user._id,
															"banned",
														)
													}>
													banned
												</button>
											) : (
												<button
													className='hover:underline text-green-500'
													disabled={isSubmitting}
													onClick={() =>
														handleStatus(
															user._id,
															"active",
														)
													}>
													unban
												</button>
											)}
										</div>
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
			{users.length === 0 && <p>No User</p>}
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

export default ManageUsers;
