import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

const SkeletonCard = () => {
	return (
		<Card className='h-full overflow-hidden shadow-lg break-words'>
			<div className='flex flex-col h-full p-4'>
				{/* Image Section (Fixed Height) */}
				<div className='h-40 w-full mb-4 rounded-md aspect-video bg-gray-300 animate-pulse'></div>

				{/* Card Content (With Line Clamp)*/}
				<h3 className='font-bold text-lg mb-2 line-clamp-1 animate-pulse bg-gray-200 h-6 w-3/4'></h3>

				<p className='line-clamp-3 text-muted-foreground mb-4 flex-grow animate-pulse bg-gray-200 h-12 w-full'></p>

				{/* Fixed Height Button */}
				<div>
					<Button className='bg-blue-600 text-white hover:bg-blue-700 animate-pulse w-2/5'></Button>
				</div>
			</div>
		</Card>
	);
};

export default SkeletonCard;
