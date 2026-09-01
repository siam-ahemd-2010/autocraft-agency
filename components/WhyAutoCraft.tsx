export default function WhyAutoCraft() {
  const benefits = [
    { title: 'Save Time', icon: '⏱️' },
    { title: 'Work Smarter', icon: '🧠' },
    { title: 'Respond Faster', icon: '⚡' },
    { title: 'Professional Online Presence', icon: '🌐' },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Why <span className="gradient-text">AutoCraft</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="glass-card rounded-3xl p-6 text-center">
              <div className="text-5xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold">{benefit.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}