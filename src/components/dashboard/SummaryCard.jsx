function SummaryCard({
  title,
  amount,
  icon: Icon,
  color,
  change,
}) {
  return (
    <div
      className="rounded-2xl p-6 transition-all duration-300 hover:shadow-xl"
      style={{
        background: "var(--card)",
        color: "var(--text)",
        boxShadow: "0 4px 12px rgba(0,0,0,.08)",
      }}
    >
      <div className="flex justify-between items-center">

        <div>

          <p className="theme-muted text-sm">
            {title}
          </p>

          <h2 className="theme-title text-3xl font-bold mt-2">
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

        <span className="text-green-500 font-semibold">
          {change}
        </span>

        <span className="theme-soft text-sm">
          Updated now
        </span>

      </div>
    </div>
  );
}

export default SummaryCard;