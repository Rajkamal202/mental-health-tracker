import { Card, CardContent } from "./ui/card";


export function FeatureCard({ icon, title, description }) {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="text-3xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}
