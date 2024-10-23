import { BlogCard } from "@/components/blog";
import { BlogDummyData } from "@/data/mock/blog";

const Home = () => {
	return (
		<div className="containerHeight overflow-scroll custom-scroll pb-6">
			{BlogDummyData.map((item, index) => (
				<>
					<BlogCard key={index} blog={item} />
					<div className="h-[1px] mb-6 w-full bg-[#E5E5E5]" />
				</>
			))}
		</div>
	);
};

export default Home;
