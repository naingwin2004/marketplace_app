import * as z from "zod";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";

import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import { Textarea } from "../../components/ui/textarea";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "../../components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";

import { setProduct } from "../../store/slices/products.js";
import { createProduct } from "../../api/product.js";

const productSchema = z.object({
	name: z.string().min(1, "Product name is required"),
	description: z.string().min(1, "Description is required"),
	category: z.enum(
		[
			"electronics",
			"clothing",
			"home",
			"sports",
			"toys",
			"beauty",
			"books",
		],
		{
			required_error: "Please select a category",
		},
	),
	price: z.coerce.number().min(0, "Price must be a positive number"),
	warranty: z.boolean().default(false),
	voucher: z.boolean().default(false),
});

const AddProductForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const product = useSelector((state) => state.products);

	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(productSchema),
		defaultValues: {
			warranty: false,
			voucher: false,
		},
	});

	const onSubmit = async (data) => {
		dispatch(setProduct(data));

		return navigate("/image-upload");
	};

	return (
		<div className='mx-3 mt-14'>
			<Card className='w-full max-w-2xl mx-auto'>
				<CardHeader>
					<CardTitle>Add Product</CardTitle>
					<CardDescription>
						Enter the details of the product you want to add.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='space-y-4'>
						{/* Product Name */}
						<div className='space-y-2'>
							<label htmlFor='product-name'>Product Name</label>
							<Input
								id='product-name'
								placeholder='Enter product name'
								{...register("name")}
							/>
							{errors.name && (
								<p className='text-sm text-red-500'>
									{errors.name.message}
								</p>
							)}
						</div>

						{/* Product Description */}
						<div className='space-y-2'>
							<label htmlFor='product-description'>
								Product Description
							</label>
							<Textarea
								id='product-description'
								placeholder='Enter product description'
								{...register("description")}
							/>
							{errors.description && (
								<p className='text-sm text-red-500'>
									{errors.description.message}
								</p>
							)}
						</div>

						{/* Product Category */}
						<div className='space-y-2'>
							<label htmlFor='product-category'>Category</label>
							<Controller
								name='category'
								control={control}
								render={({ field }) => (
									<Select
										onValueChange={field.onChange}
										value={field.value}>
										<SelectTrigger>
											<SelectValue placeholder='Select a category' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='electronics'>
												Electronics and Gadgets
											</SelectItem>
											<SelectItem value='clothing'>
												Clothing and Fashion
											</SelectItem>
											<SelectItem value='home'>
												Home & Kitchen
											</SelectItem>
											<SelectItem value='sports'>
												Sports & Outdoors
											</SelectItem>
											<SelectItem value='toys'>
												Toys and Games
											</SelectItem>
											<SelectItem value='beauty'>
												Beauty and Personal Care
											</SelectItem>
											<SelectItem value='books'>
												Books and Media
											</SelectItem>
										</SelectContent>
									</Select>
								)}
							/>
							{errors.category && (
								<p className='text-sm text-red-500'>
									{errors.category.message}
								</p>
							)}
						</div>

						{/* Product Price */}
						<div className='space-y-2'>
							<label htmlFor='product-price'>Price</label>
							<Input
								id='product-price'
								type='number'
								placeholder='Enter price'
								{...register("price")}
							/>
							{errors.price && (
								<p className='text-sm text-red-500'>
									{errors.price.message}
								</p>
							)}
						</div>

						{/* Warranty Checkbox */}
						<div className='flex items-center space-x-2 '>
							<Controller
								name='warranty'
								control={control}
								render={({ field }) => (
									<Checkbox
										id='warranty'
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								)}
							/>
							<label htmlFor='warranty'>Includes Warranty</label>
							<Controller
								name='voucher'
								control={control}
								render={({ field }) => (
									<Checkbox
										id='voucher'
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								)}
							/>
							<label htmlFor='voucher'>Includes Voucher</label>
						</div>

						<Button
							type='submit'
							className='w-full'
							disabled={isSubmitting}>
							{isSubmitting ? (
								<Loader className='animate-spin' />
							) : (
								"Add Product"
							)}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default AddProductForm;
