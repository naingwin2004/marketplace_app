import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Check, X, LoaderCircle } from "lucide-react";

import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { publicProductDetails } from "../api/product";

// Assuming these functions exist in your project
const formatDate = (dateString) => {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

function formatMMK(amount) {
	if (amount >= 100000) {
		return (amount / 100000).toFixed(1).replace(".0", "") + "Lakh";
	}
	return amount;
}

export default function ProductDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [product, setProduct] = useState({});
	const validImages = [
		...(product?.coverImage ? [product.coverImage] : []),
		...(product?.arrayImages || []),
	];

	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [loading, setLoading] = useState(false);
	const hasImages = validImages.length > 0;

	const selectImage = (index) => {
		setCurrentImageIndex(index);
	};

	const getCategoryColor = (category) => {
		const colors = {
			electronics: "bg-blue-100 text-blue-800",
			clothing: "bg-pink-100 text-pink-800",
			home: "bg-green-100 text-green-800",
			sports: "bg-orange-100 text-orange-800",
			toys: "bg-purple-100 text-purple-800",
			beauty: "bg-red-100 text-red-800",
			books: "bg-yellow-100 text-yellow-800",
		};
		return colors[category] || "bg-gray-100 text-gray-800";
	};

	const getDetails = async () => {
		setLoading(true);
		const res = await publicProductDetails(id);
		console.log(res);
		if (res.status === 200) {
			setLoading(false);
			return setProduct(res.data.products);
		} else {
			toast.error("somthing went wrong!");
			return navigate("/");
		}
	};

	useEffect(() => {
		getDetails();
	}, [id]);

	if (loading) {
		return (
			<section className='flex justify-center items-center h-screen'>
				<LoaderCircle className='w-20 h-20 animate-spin' />
			</section>
		);
	}
	return (
		<div className='px-4 py-8 mt-10'>
			<div className='grid md:grid-cols-2 gap-8'>
				{/* Product Images - Cursor style showcase */}
				<div className='space-y-4'>
					{/* Main image display */}
					<div className='rounded-lg overflow-hidden border bg-gray-50 aspect-square'>
						{hasImages ? (
							<img
								src={validImages[currentImageIndex].url}
								alt={product?.name}
								className='object-contain w-full h-full'
							/>
						) : (
							<div className='h-full w-full rounded-md aspect-video flex justify-center items-center bg-primary text-primary-foreground text-2xl font-bold'>
								ECSB
							</div>
						)}
					</div>

					{/* Thumbnails at the bottom - only show if we have images */}
					{hasImages && validImages.length > 1 && (
						<div className='grid grid-cols-4 gap-2'>
							{validImages.map((image, index) => (
								<button
									key={image.public_id}
									className={`relative rounded-md overflow-hidden aspect-square ${
										currentImageIndex === index
											? "ring-2 ring-primary ring-offset-2"
											: "border border-gray-200 hover:border-gray-300"
									}`}
									onClick={() => selectImage(index)}>
									<img
										src={image.url}
										alt={`Product thumbnail ${index + 1}`}
										className='object-cover w-full h-full'
									/>
								</button>
							))}
						</div>
					)}
				</div>

				{/* Product Details */}
				<div className='space-y-6'>
					<div>
						<h1 className='text-3xl font-bold'>{product?.name}</h1>
						<div className='flex items-center mt-2 space-x-2'>
							<span
								className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
									product?.category,
								)}`}>
								{product?.category}
							</span>
							{product?.voucher && (
								<Badge
									variant='outline'
									className='bg-purple-100 text-purple-800 border-purple-200'>
									Voucher Available
								</Badge>
							)}
							{product?.warranty && (
								<Badge
									variant='outline'
									className='bg-blue-100 text-blue-800 border-blue-200'>
									Warranty
								</Badge>
							)}
						</div>
					</div>

					<div className='text-2xl font-bold'>
						{formatMMK(product?.price)} MMK
					</div>

					{/* Simple divider */}
					<div className='border-t border-gray-200 my-6'></div>

					{/* Description section */}
					<div>
						<h2 className='text-xl font-semibold mb-3'>
							Description
						</h2>
						<p className='text-muted-foreground'>
							{product?.description}
						</p>
					</div>

					<div className='border-t border-gray-200 my-6'></div>

					{/* Product Details */}
					<div>
						<h2 className='text-xl font-semibold mb-3'>
							Product Details
						</h2>
						<Card>
							<CardContent className='pt-6'>
								<dl className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
									<div>
										<dt className='text-sm font-medium'>
											Seller
										</dt>
										<dd className='mt-1 text-sm text-muted-foreground'>
											{product?.seller?.username}
										</dd>
									</div>
									<div>
										<dt className='text-sm font-medium'>
											Category
										</dt>
										<dd className='mt-1 text-sm text-muted-foreground capitalize'>
											{product?.category}
										</dd>
									</div>
									<div>
										<dt className='text-sm font-medium'>
											Voucher
										</dt>
										<dd className='mt-1 text-sm text-muted-foreground flex items-center'>
											{product?.voucher ? (
												<>
													<Check className='h-4 w-4 text-green-500 mr-1' />{" "}
													Available
												</>
											) : (
												<>
													<X className='h-4 w-4 text-red-500 mr-1' />{" "}
													Not Available
												</>
											)}
										</dd>
									</div>
									<div>
										<dt className='text-sm font-medium'>
											Warranty
										</dt>
										<dd className='mt-1 text-sm text-muted-foreground flex items-center'>
											{product?.warranty ? (
												<>
													<Check className='h-4 w-4 text-green-500 mr-1' />{" "}
													Included
												</>
											) : (
												<>
													<X className='h-4 w-4 text-red-500 mr-1' />{" "}
													Not Included
												</>
											)}
										</dd>
									</div>
									<div>
										<dt className='text-sm font-medium'>
											Listed On
										</dt>
										<dd className='mt-1 text-sm text-muted-foreground'>
											{formatDate(product?.createdAt)}
										</dd>
									</div>
									<div>
										<dt className='text-sm font-medium'>
											Last Updated
										</dt>
										<dd className='mt-1 text-sm text-muted-foreground'>
											{formatDate(product?.updatedAt)}
										</dd>
									</div>
								</dl>
							</CardContent>
						</Card>
					</div>

					<div className='flex flex-col sm:flex-row gap-4 mt-6'>
						<Button
							className='md:flex-1'
							size='lg'>
							Add to Cart
						</Button>
						<Button
							variant='outline'
							className='md:flex-1'
							size='lg'>
							Contact Seller
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
