export default function KPI({
  title,
  value,
}: {
  title: string
  value: string | number
}) {
  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-2 text-primary">
        {value}
      </h2>
    </div>
  )
}