import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Trash, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
} from "../../components/ui/card";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { createProduct } from "../../api/product.js";

const ImageUpload = () => {
	const [coverImage, setCoverImage] = useState(null);
	const [arrayImages, setArrayImages] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const product = useSelector((state) => state.products.product);
	const navigate = useNavigate();

	const handleCoverImageChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			setCoverImage(e.target.files[0]);
		}
	};

	const handleArrayImagesChange = (e) => {
		if (e.target.files) {
			const files = Array.from(e.target.files);
			if (arrayImages.length + files.length > 6) {
				toast.error("You can only upload a maximum of 6 images.");
				return;
			}
			setArrayImages((prev) => prev.concat(files));
		}
	};

	const handleDelete = (file) => {
		const image = arrayImages.filter((img) => img !== file);
		setArrayImages(image);
	};

	const handleSubmit = async () => {
		setIsSubmitting(true);
		try {
			const formData = new FormData();
			if (coverImage) {
				formData.append("coverImage", coverImage);
			}
			if (arrayImages.length > 0) {
				arrayImages.forEach((file) => {
					formData.append("arrayImages", file);
				});
			}
			if (product) {
				formData.append("name", product.name);
				formData.append("description", product.description);
				formData.append("category", product.category);
				formData.append("price", product.price);
				formData.append("voucher", product.voucher);
				formData.append("warranty", product.warranty);
			}

			const res = await createProduct(formData);
			if (res.status === 201) {
				toast.success(res.data.message);
				navigate("/products");
			} else {
				toast.error(res.data.message);
			}
		} catch (error) {
			toast.error("Upload failed.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='mt-14 mx-3'>
			<Card className='max-w-2xl mx-auto'>
				<CardHeader>
					<CardTitle>Image Upload - Optional</CardTitle>
				</CardHeader>
				<CardContent className='space-y-6'>
					{/* Cover Image Upload */}
					<div className='space-y-2'>
						<label htmlFor='coverImage'>
							Cover Image
							<div className='border px-4 py-2 rounded-md font-[500] text-sm'>
								Choose cover image here
							</div>
						</label>
						<Input
							id='coverImage'
							type='file'
							accept='image/*'
							className='hidden'
							onChange={handleCoverImageChange}
						/>
						{coverImage && (
							<div className='mt-4 flex justify-center'>
								<img
									src={URL.createObjectURL(coverImage)}
									alt='Cover Preview'
									className='rounded-lg aspect-video overflow-auto object-cover object-center'
								/>
							</div>
						)}
					</div>

					{/* Array Images Upload */}
					<div className='space-y-2'>
						<label htmlFor='arrayImages'>
							Array Images
							<div className='border px-4 py-2 rounded-md font-[500] text-sm'>
								Choose array images here
							</div>
						</label>
						<Input
							id='arrayImages'
							type='file'
							accept='image/*'
							multiple
							className='hidden'
							onChange={handleArrayImagesChange}
						/>
						<div className='grid grid-cols-2 md:grid-cols-3 gap-2 mt-4'>
							{arrayImages.map((file, index) => (
								<div
									className='relative'
									key={index}>
									<img
										src={URL.createObjectURL(file)}
										alt={
											file.name ||
											`Array Image ${index + 1}`
										}
										className='rounded-lg aspect-square overflow-auto object-cover object-center'
									/>
									<Button
										className='absolute bottom-3 right-3'
										size='icon'
										variant='destructive'
										disabled={isSubmitting}
										onClick={() => handleDelete(file)}>

											<Trash size={16} />
										
									</Button>
								</div>
							))}
						</div>
					</div>

					{/* Submit Button */}
					<Button
						onClick={handleSubmit}
						className='w-full'
						disabled={isSubmitting}>
						{isSubmitting
							? "Uploading..."
							: "Upload Images (OR) Skip"}
					</Button>
				</CardContent>
			</Card>
		</div>
	);
};

export default ImageUpload;
