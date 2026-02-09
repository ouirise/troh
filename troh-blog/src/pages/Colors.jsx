import { Link } from 'react-router-dom'
import { ArrowLeft, Heart } from 'lucide-react'

const cancerColors = [
  {
    color: "Pink",
    type: "Breast Cancer",
    meaning: "The moment of diagnosis brings shock, uncertainty, and decisions that affect body and identity. Pink represents courage, femininity redefined, and the strength it takes to face surgeries, treatments, and life beyond."
  },
  {
    color: "Gold",
    type: "Childhood Cancer",
    meaning: "A diagnosis that no parent is prepared to hear. Gold represents the bravery of children who fight battles far beyond their years and the families who become warriors alongside them."
  },
  {
    color: "Purple",
    type: "Pancreatic Cancer",
    meaning: "Often diagnosed late, purple represents resilience in the face of limited answers and the strength to confront a difficult and aggressive journey."
  },
  {
    color: "Light Blue",
    type: "Prostate Cancer",
    meaning: "Diagnosis brings fear often faced in silence. Light blue represents awareness, advocacy, and the courage for men to speak, seek help, and fight."
  },
  {
    color: "Teal",
    type: "Ovarian Cancer",
    meaning: "Frequently misdiagnosed or overlooked, teal represents the frustration of delayed answers and the determination to push forward despite uncertainty."
  },
  {
    color: "Lime Green",
    type: "Lymphoma",
    meaning: "A diagnosis that impacts the immune system itself. Lime green represents adaptability, endurance, and the constant fight against the body turning on itself."
  },
  {
    color: "Orange",
    type: "Leukemia",
    meaning: "Sudden and life-altering, an orange diagnosis represents rapid change, intense treatment, and the fight for survival day by day."
  },
  {
    color: "Blue",
    type: "Colon Cancer",
    meaning: "Often dismissed until advanced, blue represents awareness, prevention, and the shock of realizing something silent has been growing."
  },
  {
    color: "White",
    type: "Lung Cancer",
    meaning: "White represents the stigma, the misunderstanding, and the strength to fight regardless of cause. A diagnosis met with judgment but carried with bravery."
  },
  {
    color: "Gray",
    type: "Brain Cancer",
    meaning: "A diagnosis that threatens memory, movement, and identity. Gray represents complexity, uncertainty, and resilience through the unknown."
  }
]

const colorClasses = {
  "Pink": "bg-pink-500",
  "Gold": "bg-yellow-500",
  "Purple": "bg-purple-600",
  "Light Blue": "bg-sky-400",
  "Teal": "bg-teal-500",
  "Lime Green": "bg-lime-500",
  "Orange": "bg-orange-500",
  "Blue": "bg-blue-600",
  "White": "bg-gray-100 border-2 border-gray-300",
  "Gray": "bg-gray-500"
}

function Colors() {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-troh-dark py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">The Colors of Cancer</h1>
          <p className="text-xl text-gray-300">
            From Diagnosis Forward
          </p>
          <p className="text-lg text-gray-400 mt-4">
            Each color represents more than a ribbon. It marks the moment of diagnosis—the day life changes, fear enters the room, and a new fight begins.
          </p>
        </div>
      </section>

      {/* Colors Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {cancerColors.map((item) => (
              <div key={item.color} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-full flex-shrink-0 ${colorClasses[item.color]}`} />
                  <div>
                    <h3 className="text-2xl font-bold text-troh-dark">{item.color}</h3>
                    <p className="text-troh-gold font-semibold mb-3">{item.type}</p>
                    <p className="text-gray-600 leading-relaxed">{item.meaning}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Message */}
      <section className="py-24 bg-troh-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-16 h-16 text-troh-gold mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Together, These Colors Tell One Story</h2>
          <p className="text-xl leading-relaxed">
            Diagnosis is not just a medical moment—it is the beginning of a lifelong journey. Treatment may end, but the battle continues.
          </p>
          <p className="text-2xl font-semibold text-troh-gold mt-8">
            You are never alone.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Colors
