import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../components/ui/tabs";
import AddProducts from "../components/AddProducts.jsx";
import { Boxes, BellRing, UserCog, PackagePlus } from "lucide-react";

const tabsData = [
	{
		value: "Products",
		icon: Boxes,
	},
	{
		value: "Manage Products",
		icon: PackagePlus,
	},
	{
		value: "Notifications",
		icon: BellRing,
	},
	{
		value: "Profile",
		icon: UserCog,
	},
];

const Profile = () => {
	return (
		<div className='mt-12 mx-3'>
			<Tabs defaultValue='Manage Products'>
				<div className='w-full flex justify-center items-center'>
					<TabsList>
						{tabsData.map((tab) => (
							<TabsTrigger
								value={tab.value}
								key={tab.value}>
								<tab.icon
									size={20}
									className='md:hidden'
								/>
								<span className='hidden md:block'>
									{tab.value}
								</span>
							</TabsTrigger>
						))}
					</TabsList>
				</div>

				<TabsContent value='Products'>
					<p>Products content here</p>
				</TabsContent>
				<TabsContent value='Manage Products'>
					<AddProducts />
				</TabsContent>
				<TabsContent value='Notifications'>
					<p>Notifications content here</p>
				</TabsContent>
				<TabsContent value='Profile'>
					<p>Profile content here</p>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Profile;
