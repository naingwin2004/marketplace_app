import z from "zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
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

import { useSelector } from "react-redux";

export function CardGrid() {
  
  const user = useSelector(state => state.auth.user)
  console.log(user)
  
	const items = [
		{ id: 1, text: "Short text" },
		{ id: 2, text: "Very long text here. ".repeat(20) },
		{ id: 3, text: "Medium text ".repeat(5) },
		{ id: 4, text: "Medium text ".repeat(5) },
		{ id: 5, text: "Very long text here. ".repeat(20) },
		{ id: 6, text: "Medium text ".repeat(5) },
		{ id: 7, text: "Medium text ".repeat(5) },
		{ id: 8, text: "Short text" },
		{ id: 9, text: "Medium text ".repeat(5) },
	];

	return (
		<div className='grid grid-cols-1 md:grid-cols-3 auto-rows-fr gap-4 p-4 mb-5'>
			{items.map((item) => (
				<Card
					key={item.id}
					className='h-full overflow-hidden shadow-lg break-words'>
					<div className='flex flex-col h-full p-4'>
						{/* Image Section (Fixed Height) */}
						<div className='bg-gray-200 h-40 w-full mb-4 rounded-md' />

						{/* Card Content (With Line Clamp)*/}
						<h3 className='font-bold text-lg mb-2 line-clamp-1'>
							Card Title {item.id}
						</h3>
						<p className='line-clamp-3 text-muted-foreground mb-4 flex-grow'>
							{item.text}
						</p>

						{/* Fixed Height Button */}
						<Button className='bg-blue-600 text-white hover:bg-blue-700'>
							Learn More
						</Button>
					</div>
				</Card>
			))}
		</div>
	);
}

const schema = z.object({
	search: z.string().min(1, { message: "Required" }),
});

const Home = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({ resolver: zodResolver(schema) });

	const handleSearch = (data) => {
		console.log(data);
	};

	return (
		<div className='flex flex-col min-h-screen'>
			{/* Main Content */}
			<div className='flex-1 mt-12 mx-3'>
				<form
					onSubmit={handleSubmit(handleSearch)}
					className='my-3 flex flex-col items-center gap-5'>
					<div className='flex justify-center items-center flex-col'>
						<p className='text-lg font-medium'>Name</p>
						<p className='text-sm text-muted-foreground'>
							Easily connect with trusted sellers/buyers you can
							rely on
						</p>
					</div>
					<div className='flex w-full justify-center items-center gap-2'>
						<Input
							placeholder='search'
							className='max-w-xl'
							{...register("search")}
						/>
						<Button
							variant='outline'
							size='sm'>
							<Search size={20} />
						</Button>
					</div>
				</form>
				<CardGrid />
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href='#' />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink
								href='#'
								isActive>
								1
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem>
							<PaginationNext href='#' />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>

			{/* Footer */}
			<footer className='text-center text-muted-foreground text-sm py-4'>
				@version 1.0 coding by Anonymous
			</footer>
		</div>
	);
};

export default Home;
