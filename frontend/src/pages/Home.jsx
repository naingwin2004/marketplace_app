import z from "zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { X, Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "../components/ui/pagination";
import { Badge } from "../components/ui/badge";
import { useSelector } from "react-redux";

import { publicProducts } from "../api/product.js";
import SkeletonCard from "../components/SkeletonCard.jsx";

import { formatDate } from "../lib/formatDate";

export function CardGrid({ page, search, setTotalPages, activeCategory }) {
	const navigate = useNavigate();
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const getproducts = async () => {
		setLoading(true);
		const res = await publicProducts(page, search, activeCategory);
		if (res.status === 200) {
			setLoading(false);
			setTotalPages(res.data.totalPages);
			return setProducts(res.data.products);
		}
		setLoading(false);
		setTotalPages(1);
		setProducts([]);
		return navigate("/");
	};

	useEffect(() => {
		getproducts();
	}, [page, search, activeCategory]);

	if (loading) {
		return (
			<section className='grid grid-cols-1 md:grid-cols-3 auto-rows-fr gap-4 p-4 mb-5 overflow-hidden'>
				{[...Array(9)].map((_, index) => (
					<SkeletonCard key={index} />
				))}
			</section>
		);
	}

	return (
		<>
			{products.length === 0 && (
				<p className='text-center'>No products found</p>
			)}
			<div className='grid grid-cols-1 md:grid-cols-3 auto-rows-fr gap-4 p-4 mb-5 select-none'>
				{products.map((product) => (
					<Card
						key={product._id}
						className='h-full overflow-hidden shadow-lg break-words'>
						<div className='flex flex-col h-full p-4'>
							{/* Image Section (Fixed Height) */}
							{product.coverImage ? (
								<div className='w-full mb-4 rounded-md aspect-video overflow-auto'>
									<img
										src={product.coverImage?.url}
										alt={product.coverImage?.public_id}
										className='object-contain w-full h-full'
									/>
								</div>
							) : (
								<div className='h-40 w-full mb-4 rounded-md aspect-video flex justify-center items-center bg-primary text-secondary text-2xl font-bold'>
									ECSB
								</div>
							)}

							{/* Card Content (With Line Clamp)*/}

							<h3 className='font-bold text-lg mb-2 line-clamp-1'>
								{product.name}{" "}
								<span className=''>({product.category})</span>
							</h3>

							<p className='line-clamp-3 text-muted-foreground mb-4 flex-grow'>
								{product.description}
							</p>

							{/* Fixed Height Button */}
							<div className='flex justify-between items-center'>
								<Link to={`/product/${product._id} `}>
									<Button className='bg-blue-600 text-white hover:bg-blue-700'>
										Learn More
									</Button>
								</Link>
								<span>{formatDate(product.createdAt)}</span>
							</div>
						</div>
					</Card>
				))}
			</div>
		</>
	);
}

const categoryData = [
	{ value: "electronics", name: "Electronics and Gadgets" },
	{ value: "clothing", name: "Clothing and Fashion" },
	{ value: "home", name: "Home & Kitchen" },
	{ value: "sports", name: "Sports & Outdoors" },
	{ value: "toys", name: "Toys and Games" },
	{ value: "beauty", name: "Beauty and Personal Care" },
	{ value: "books", name: "Books ans Media" },
];

const Home = () => {
	const token = useSelector((state) => state.auth.token);

	const [page, setPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const [search, setSearch] = useState("");
	const [activeCategory, setActive] = useState("");
	const [totalPages, setTotalPages] = useState(1);

	const handleSearch = () => {
		if (searchQuery.trim) {
			setSearch(searchQuery);
		}
	};
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<div className='flex flex-col min-h-screen'>
			{/* Main Content */}
			<div className='flex-1 mt-12 mx-3'>
				<form
					className='my-3 flex flex-col items-center gap-5'
					onSubmit={(e) => {
						e.preventDefault();
					}}>
					<div className='flex justify-center items-center flex-col'>
						<p className='text-lg font-medium'>Name</p>
						<p className='text-sm text-muted-foreground'>
							Easily connect with trusted sellers/buyers you can
							rely on
						</p>
					</div>
					{/* category */}
					<div className='grid grid-cols-4 gap-3 justify-center'>
						{categoryData.map((category, index) => (
							<div
								key={index}
								onClick={() => setActive(category.value)}>
								<Badge
									className='hidden md:inline '
									variant={`${
										activeCategory === category.value
											? ""
											: "secondary"
									}`}>
									{category.name}
								</Badge>
								<Badge
									className=' md:hidden'
									variant={`${
										activeCategory === category.value
											? ""
											: "secondary"
									}`}>
									{category.value}
								</Badge>
							</div>
						))}
					</div>

					<div className='flex w-full justify-center items-center gap-2'>
						<Input
							placeholder='search'
							className='max-w-xl'
							onChange={(e) => setSearchQuery(e.target.value)}
							onKeyDown={handleKeyDown}
							value={searchQuery}
						/>
						<Button
							variant='outline'
							className='h-10 w-10'
							onClick={handleSearch}>
							<Search size={20} />
						</Button>
						<Button
							variant='outline'
							className='h-10 w-10'
							onClick={() => setSearchQuery("")}>
							<X size={20} />
						</Button>
					</div>
				</form>
				<CardGrid
					page={page}
					search={search}
					setTotalPages={setTotalPages}
					activeCategory={activeCategory}
				/>
				{/* Pagination */}
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

			{/* Footer */}
			<footer className='text-center text-muted-foreground text-sm py-4'>
				@version 1.0 coding by Anonymous
			</footer>
		</div>
	);
};

export default Home;
