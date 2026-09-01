export default function HowItWorks() {
  const steps = [
    { number: '01', title: 'Choose', description: 'Choose your automation' },
    { number: '02', title: 'Pay', description: 'Pay manually' },
    { number: '03', title: 'Setup', description: 'We configure everything' },
    { number: '04', title: 'Automate', description: 'Start using your automation' },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          How It <span className="gradient-text">Works</span>
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="glass-card rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 text-3xl font-bold gradient-text">
                {step.number}
              </div>
              <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}