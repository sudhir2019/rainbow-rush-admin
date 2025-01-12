import "./Loader.css"; // Import the custom CSS for animations

export default function Loader() {
    return (
        <span className="loader relative w-52 h-36 bg-gray-500 rounded-md perspective-[1000px]">
            <span className="loader-inner"></span>
        </span>
    );
}
