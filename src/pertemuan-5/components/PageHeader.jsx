export default function PageHeader() {
    return (
        <div className="flex items-center justify-between p-4 mb-4">
            <div className="flex flex-col">
                <span className="text-3xl font-semibold text-gray-800">
                    Dashboard
                </span>
                <div className="flex items-center font-medium space-x-2 mt-2 text-sm text-gray-500">
                    <span className="text-gray-500">Dashboard</span>
                    <span className="text-gray-500">/</span>
                    <span className="text-gray-500">Order List</span>
                </div>
            </div>
            <div>
                <button className="bg-hijau text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-green-600 transition">
                    Add Button
                </button>
            </div>
        </div>
    );
}