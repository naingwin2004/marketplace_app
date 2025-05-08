import { Card } from "../../components/ui/card";
import { X, Search, HeartOff } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useState, useEffect } from "react";
import { formatDate } from "../../lib/formatDate";
import { getSaveProduct, unsaveProduct } from "../../api/product.js";
import SkeletonCard from "../../components/SkeletonCard.jsx";

export const CardGrid = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const fetchSave = async () => {
		setLoading(true);
		const res = await getSaveProduct();
		if (res.status === 200) {
			setLoading(false);
			return setData(res.data.products);
		}
		setLoading(false);

		return navigate("/");
	};
	useEffect(() => {
		fetchSave();
	}, []);

	const unsave = async (id) => {
		setLoading(true);
		const res = await unsaveProduct(id);
		console.log(id);
		console.log(res.data);
		if (res.status === 200) {
			setLoading(false);
			fetchSave();
			return toast.success(res.data.message);
		}
		setLoading(false);
		return toast.error(res.data.message);
	};

	if (loading) {
		return (
			<section className='grid grid-cols-1 md:grid-cols-3 auto-rows-fr gap-4 overflow-hidden'>
				{[...Array(9)].map((_, index) => (
					<SkeletonCard key={index} />
				))}
			</section>
		);
	}

	if (data.length <= 0) {
		return <div>No data</div>;
	}

	return (
		<>
			<p className='text-sm font-medium text-center my-5'>
				Your Favorite Items
			</p>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
				{data.map((product) => {
					return (
						<Card
							key={product.product._id}
							className='h-full overflow-hidden shadow-lg break-words'>
							<div className='flex flex-col h-full p-4'>
								{/* Image Section */}
								{product.product.coverImage ? (
									<div className='w-full mb-4 rounded-md aspect-video overflow-auto'>
										<img
											src={
												product.product.coverImage?.url
											}
											alt={
												product.product.coverImage
													?.public_id
											}
											className='object-contain w-full h-full'
										/>
									</div>
								) : (
									<div className='h-40 w-full mb-4 rounded-md aspect-video flex justify-center items-center bg-primary text-secondary text-2xl font-bold'>
										ECSB
									</div>
								)}

								{/* Card Content */}
								<div className='flex justify-between items-center'>
									<div className='font-bold text-lg mb-2 line-clamp-1'>
										{product.product.name}{" "}
										<span>
											({product.product.category})
										</span>
									</div>

									<HeartOff
										key={`heart-unsaved-${product.product._id}`}
										className='text-red-500 hover:text-red-400'
										onClick={() =>
											unsave(product.product._id)
										}
									/>
								</div>

								<p className='line-clamp-3 text-muted-foreground mb-4 flex-grow'>
									{product.product.description}
								</p>

								{/* Fixed Height Button */}
								<div className='flex justify-between items-center'>
									<Link
										to={`/product/${product.product._id}`}>
										<Button className='bg-blue-600 text-white hover:bg-blue-700'>
											Learn More
										</Button>
									</Link>
									<span>
										{formatDate(product.product.createdAt)}
									</span>
								</div>
							</div>
						</Card>
					);
				})}
			</div>
		</>
	);
};
const Favorite = () => {
	return (
		<div className='mt-14 mx-5'>
			<CardGrid />
			{/* Footer */}
			<footer className='text-center text-muted-foreground text-sm py-4'>
				@version 1.0 coding by Anonymous
			</footer>
		</div>
	);
};

export default Favorite;
