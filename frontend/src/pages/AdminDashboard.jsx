import { Link } from "react-router-dom";


const AdminDashboard = () => {

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">

            <h1 className="text-4xl font-bold mb-10">

                Admin Dashboard

            </h1>


            <div className="grid md:grid-cols-2 gap-6">

                <Link
                    to="/admin/products"
                    className="border bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300 flex items-center justify-between"
                >

                    <>

                        <div>

                            <h2 className="text-2xl font-bold">

                                Manage Products

                            </h2>

                            <p className="text-gray-500 mt-2">

                                Create, edit, and delete products

                            </p>

                        </div>

                    </>

                </Link>

            </div>

        </div>
    );
};

export default AdminDashboard;