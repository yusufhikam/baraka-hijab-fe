import useDarkMode from "../utililties/customHook/useDarkMode";

const NotFound = () => {
	const { isDarkMode } = useDarkMode();
	return (
		<div
			className={`${isDarkMode ? "bg-barakadark-primary text-barakadark-darker" : "bg-white"} flex h-screen w-full flex-col items-center justify-center`}
		>
			<h1 className="font-krona-one-regular text-9xl font-bold">404</h1>
			<p className="text-5xl font-semibold">Page Not Found</p>
		</div>
	);
};

export default NotFound;
