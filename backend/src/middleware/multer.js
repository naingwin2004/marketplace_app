import multer from "multer";

const storage = multer.diskStorage({
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + "_" + file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image/")) {
		cb(null, true);
	} else {
		cb(new Error("Only image files are allowed!"), false);
	}
};

const upload = multer({ storage, fileFilter });
export default upload;

// Multer error handling
export const handleMulterErrors = (req, res, next) => {
	upload.fields([
		{ name: "coverImage", maxCount: 1 },
		{ name: "arrayImages", maxCount: 6 },
	])(req, res, (err) => {
		if (err instanceof multer.MulterError) {
			if (err.code === "LIMIT_UNEXPECTED_FILE") {
				return res.status(400).json({
					message:
						"Too many files uploaded. Maximum allowed: 1 cover image and 6 array images.",
				});
			}
		} else if (err) {
		  console.log("Error in multer :", err.message);
			return res.status(500).json({ message: err.message });
		}

		next();
	});
};
