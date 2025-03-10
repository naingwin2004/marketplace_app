import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Trash } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
} from "../../components/ui/card";

import { setOldProduct } from "../../store/slices/oldProduct.js";
import { updateProduct, deleteImage } from "../../api/product.js";

const EditImage = () => {
	const [coverImage, setCoverImage] = useState(null);
	const [arrayImages, setArrayImages] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const product = useSelector((state) => state.oldProduct.product);

	const navigate = useNavigate();
	const dispatch = useDispatch();

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

	const handleDelete = async ({
		public_id,
		id,
		seller,
		isCoverImage = false,
		isArrayImage = false,
	}) => {
		if (isCoverImage) {
			setIsSubmitting(true);

			const res = await deleteImage(id, seller, public_id);

			if (res.status === 200) {
				setIsSubmitting(false);
				dispatch(setOldProduct({ ...product, coverImage: null }));
				return toast.success(res.data.message);
			}
			setIsSubmitting(false);
			return toast.error(res.data.message);
		}

		if (isArrayImage) {
		  setIsSubmitting(true);
			const deletedArrayImage = product.arrayImages.filter(
				(img) => img.public_id !== public_id,
			);
			const res = await deleteImage(id, seller, public_id);

			if (res.status === 200) {
				setIsSubmitting(false);
				dispatch(
					setOldProduct({
						...product,
						arrayImages: deletedArrayImage,
					}),
				);
				return toast.success(res.data.message);
			}
			setIsSubmitting(false);
			return toast.error(res.data.message);
		}
	};
	const handleDeleteImg = (file) => {
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
				formData.append("seller", product.seller);
				formData.append("id", product._id);
			}

			const res = await updateProduct(formData);
			if (res.status === 200) {
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
							disabled={product?.coverImage}
							onChange={handleCoverImageChange}
						/>
						{product?.coverImage && (
							<div className='mt-4 flex justify-center relative rounded-lg aspect-video overflow-auto border'>
								<img
									src={product.coverImage.url}
									alt='Cover Preview'
									className='object-contain w-full h-full'
								/>
								<Button
									className='absolute bottom-3 right-3'
									size='icon'
									variant=''
									disabled={isSubmitting}
									onClick={() =>
										handleDelete({
											public_id:
												product.coverImage.public_id,
											id: product._id,
											seller: product.seller,
											isCoverImage: true,
											isArrayImage: false,
										})
									}>
									<Trash size={16} />
								</Button>
							</div>
						)}
						{coverImage && (
							<div className='mt-4 flex justify-center rounded-lg aspect-video overflow-auto border'>
								<img
									src={URL.createObjectURL(coverImage)}
									alt='Cover Preview'
									className='object-contain w-full h-full'
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
							{product?.arrayImages?.map((image, index) => (
								<div
									className='relative rounded-lg aspect-square overflow-auto border'
									key={index}>
									<img
										src={image.url}
										alt={`Array Image ${index + 1}`}
										className='object-cover w-full h-full'
									/>
									<Button
										className='absolute bottom-3 right-3'
										size='icon'
										variant=''
										disabled={isSubmitting}
										onClick={() =>
											handleDelete({
												public_id: image.public_id,
												id: product._id,
												seller: product.seller,
												isCoverImage: false,
												isArrayImage: true,
											})
										}>
										<Trash size={16} />
									</Button>
								</div>
							))}
							{arrayImages.map((file, index) => (
								<div
									className='relative rounded-lg aspect-square overflow-auto border'
									key={index}>
									<img
										src={URL.createObjectURL(file)}
										alt={
											file.name ||
											`Array Image ${index + 1}`
										}
										className='object-cover w-full h-full'
									/>
									<Button
										className='absolute bottom-3 right-3'
										size='icon'
										variant='destructive'
										disabled={isSubmitting}
										onClick={() => handleDeleteImg(file)}>
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

export default EditImage;
