function SummaryCard({
  title,
  amount,
  icon: Icon,
  color,
  change,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {amount}
          </h2>

        </div>

        <div
          className={`
            ${color}
            w-14
            h-14
            rounded-xl
            flex
            items-center
            justify-center
            text-white
            text-2xl
          `}
        >
          <Icon />
        </div>

      </div>

      <div className="mt-6 flex justify-between items-center">

        <span className="text-green-600 font-semibold">
          {change}
        </span>

        <span className="text-gray-400 text-sm">
          Updated now
        </span>

      </div>

    </div>
  );
}

export default SummaryCard;