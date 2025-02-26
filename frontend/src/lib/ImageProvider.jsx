import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ImageProvider = ({ children }) => {
	const product = useSelector((state) => state.products.product);

	if (!product) {
		return (
			<Navigate
				to='/add-product'
				replace
			/>
		);
	}
	

	return children;
};
export default ImageProvider;
