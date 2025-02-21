import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

const EditProvider = ({ children }) => {
	const oldProduct = useSelector((state) => state.oldProduct.product);

	if (!oldProduct) {
		return (
			<Navigate
				to='/products'
				replace
			/>
		);
	}

	return children;
};

export default EditProvider;
