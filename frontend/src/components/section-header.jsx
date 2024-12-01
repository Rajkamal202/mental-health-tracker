export function SectionHeader({ title, subtitle }) {
    return (
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      </div>
    )
  }
  