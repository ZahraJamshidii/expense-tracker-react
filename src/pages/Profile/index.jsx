import { useState } from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaCheckCircle,
  FaIdBadge,
  FaWallet,
  FaMoneyBillWave,
  FaListAlt,
  FaLayerGroup,
  FaPen,
} from "react-icons/fa";

import useFinance from "../../hooks/useFinance";
import useUser from "../../hooks/useUser";

function Profile() {
  const {
    currentUser,
    updateProfile,
  } = useUser();

  const {
    totalIncome,
    totalExpense,
    balance,
    transactions,
    categories,
  } = useFinance();

  const [isEditing, setIsEditing] =
    useState(false);

  const [name, setName] = useState(
    currentUser?.name || ""
  );

  const [email, setEmail] = useState(
    currentUser?.email || ""
  );

  if (!currentUser) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-3xl font-bold">
          No user logged in
        </h2>
      </div>
    );
  }

  function handleSave() {
    updateProfile({
      ...currentUser,
      name,
      email,
    });

    setIsEditing(false);
  }

  function handleCancel() {
    setName(currentUser.name);
    setEmail(currentUser.email);
    setIsEditing(false);
  }

  return (
    <div className="max-w-6xl mx-auto">

      <h1 className="text-4xl font-bold mb-8">
        My Profile
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Left Card */}

        <div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32"></div>

            <div className="-mt-16 flex justify-center">

              <div className="w-32 h-32 rounded-full bg-white shadow-lg border-4 border-white flex items-center justify-center">

                <FaUserCircle className="text-8xl text-blue-600" />

              </div>

            </div>

            <div className="text-center px-8 pb-8">

              {isEditing ? (

                <input
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="border rounded-lg p-3 w-full mt-6"
                />

              ) : (

                <h2 className="text-2xl font-bold mt-4">
                  {currentUser.name}
                </h2>

              )}

              <div className="mt-6 flex justify-center gap-3">

                {!isEditing ? (

                  <button
                    onClick={() =>
                      setIsEditing(true)
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
                  >
                    <FaPen />
                    Edit Profile
                  </button>

                ) : (

                  <>

                    <button
                      onClick={handleSave}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
                    >
                      Save
                    </button>

                    <button
                      onClick={handleCancel}
                      className="bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-xl"
                    >
                      Cancel
                    </button>

                  </>

                )}

              </div>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="lg:col-span-2 space-y-6">

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-2xl font-bold mb-8">
              Personal Information
            </h2>

            <div className="space-y-8">

              <div className="flex gap-4">

                <FaEnvelope className="text-blue-600 text-xl mt-1" />

                <div className="flex-1">

                  <p className="text-gray-500 mb-2">
                    Email
                  </p>

                  {isEditing ? (

                    <input
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      className="border rounded-lg p-3 w-full"
                    />

                  ) : (

                    <p className="font-semibold">
                      {currentUser.email}
                    </p>

                  )}

                </div>

              </div>

              <div className="flex gap-4">

                <FaCheckCircle className="text-green-600 text-xl mt-1" />

                <div>

                  <p className="text-gray-500">
                    Status
                  </p>

                  <p className="font-semibold text-green-600">
                    Active
                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <FaIdBadge className="text-purple-600 text-xl mt-1" />

                <div>

                  <p className="text-gray-500">
                    User ID
                  </p>

                  <p className="font-semibold">
                    {currentUser.id}
                  </p>

                </div>

              </div>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-2xl font-bold mb-8">
              Financial Summary
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <SummaryCard
                icon={<FaWallet />}
                color="blue"
                title="Balance"
                value={`$${balance}`}
              />

              <SummaryCard
                icon={<FaMoneyBillWave />}
                color="green"
                title="Income"
                value={`$${totalIncome}`}
              />

              <SummaryCard
                icon={<FaMoneyBillWave />}
                color="red"
                title="Expense"
                value={`$${totalExpense}`}
              />

              <SummaryCard
                icon={<FaLayerGroup />}
                color="purple"
                title="Categories"
                value={categories.length}
              />

            </div>

            <div className="mt-6 bg-gray-50 rounded-2xl p-6 flex items-center gap-4">

              <FaListAlt className="text-orange-500 text-3xl" />

              <div>

                <p className="text-gray-500">
                  Total Transactions
                </p>

                <h3 className="text-3xl font-bold">
                  {transactions.length}
                </h3>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

function SummaryCard({
  icon,
  title,
  value,
  color,
}) {
  return (
    <div className={`bg-${color}-50 rounded-2xl p-6`}>

      <div className="flex items-center gap-3">

        <div className={`text-${color}-600 text-2xl`}>
          {icon}
        </div>

        <div>

          <p className="text-gray-500">
            {title}
          </p>

          <h3 className="text-2xl font-bold">
            {value}
          </h3>

        </div>

      </div>

    </div>
  );
}

export default Profile;