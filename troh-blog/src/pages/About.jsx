import { Link } from 'react-router-dom'
import { Heart, Users, Sun, Quote } from 'lucide-react'

function About() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-white via-orange-50 to-green-50 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-troh-dark mb-4">Tayloring Rays of Hope</h1>
          <p className="text-troh-primary text-lg mb-2 font-semibold">501(c)(3) Nonprofit Organization</p>
          <p className="text-gray-500 text-sm mb-6">Founded by Elaine Taylor • EIN Available Upon Request</p>
          <blockquote className="text-xl md:text-2xl text-gray-600 italic mb-8">
            "Hope is being able to see that there is light despite all of the darkness."
            <footer className="text-troh-primary mt-2 not-italic font-semibold">— Desmond Tutu</footer>
          </blockquote>
        </div>
      </section>

      {/* Elaine's Story */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-troh-primary font-semibold text-sm uppercase tracking-wider">Founder's Story</span>
          <h2 className="text-3xl md:text-4xl font-bold text-troh-dark mt-2 mb-8">A Diagnosis Doesn't Have a Time, Place, or Person</h2>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p>
              Last summer, Elaine Taylor of Wake Forest was focused on recovery from her fourth back surgery and preparing to return to work after more than a decade with Spectrum.
            </p>
            <p>
              A routine scan to clear her for work prompted a suggestion from hospital staff she hadn't expected: at her age, they asked, why hadn't she ever had a mammogram?
            </p>
            <p>
              She scheduled one that same day.
            </p>
            <p>
              Within weeks, Taylor's life changed entirely.
            </p>
            <p>
              Doctors discovered a 13-centimeter mass in her right breast. What began as an early-stage diagnosis progressed rapidly. By the fall, Taylor had undergone a double mastectomy, multiple surgeries and extensive testing. By November, her oncologist delivered the words that stopped her in her tracks.
            </p>
            <p className="text-troh-dark font-semibold text-xl">
              Elaine was diagnosed with stage four metastatic breast cancer.
            </p>
            <p>
              "I just cried," Taylor said. "Everything stopped."
            </p>
            <p>
              Doctors told her she had six to nine months to live.
            </p>
            <p>
              Instead of retreating inward, Taylor chose to fight. And in doing so, she created Tayloring Rays of Hope, a nonprofit rooted in the lived reality of cancer patients who struggle not only with illness, but with the financial and emotional weight that comes with it.
            </p>
          </div>
        </div>
      </section>

      {/* The Fight */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-troh-dark mb-8">The Fight</h2>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p>
              Taylor said the cancer progressed with alarming speed. Initially told she might only need radiation, doctors later found the disease spreading aggressively, fueled by her hormones and lymph nodes under her arm.
            </p>
            <p>
              By September 2024, she underwent surgery to remove both breasts. Complications sent her back into the operating room the same day.
            </p>
            <p>
              "I had just had back surgery. I was in a back brace," she said. "It was overwhelming."
            </p>
            <p>
              Pathology reports soon confirmed the cancer had advanced. Chemo treatments followed. So did a port placed in her chest. Then came another blow.
            </p>
            <p>
              Her doctor told her the cancer had spread to her liver.
            </p>
            <p>
              "When he said 'unfortunately,' I knew," Taylor said. "Who wants to hear that word?"
            </p>
            <p>
              She began chemotherapy shortly after. Sixteen rounds. Weekly treatments. Each session, she said, came with staggering costs that would have been impossible without insurance.
            </p>
            <p className="text-troh-dark font-semibold">
              "Every time I sat in that chair, that was about $36,000," she said. "That injection in my leg was another $17,000."
            </p>
            <p>
              Chemo stripped Taylor of her hair, her appetite, her independence, and often her dignity. She described losing bowel control, severe nausea, metallic taste that made food unbearable and the humiliation of navigating public spaces while sick.
            </p>
            <p className="text-troh-gold font-semibold italic">
              "I wouldn't wish this on my worst enemy."
            </p>
            <p>
              Her 47-inch dreadlocks fell out in clumps. She recorded herself shaving her head in private, speaking words of determination into a camera.
            </p>
            <p className="text-troh-dark font-semibold text-xl">
              "I'm not giving up," she said then. "I'm going to fight."
            </p>
          </div>
        </div>
      </section>

      {/* Support System */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-troh-dark mb-8">Strength and Support</h2>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p>
              Taylor credits her strength to faith and family, especially her late mother, a minister whose prayers she still hears in her mind. She also credits her husband, Gary Taylor, who married her earlier this year while she was in treatment.
            </p>
            <blockquote className="border-l-4 border-troh-gold pl-6 italic text-xl text-troh-dark">
              "He said, 'If God forbid He takes you, I want you to leave here with my last name.'"
            </blockquote>
            <p>
              That name became her foundation's inspiration.
            </p>
          </div>
        </div>
      </section>

      {/* Birth of the Nonprofit */}
      <section className="py-24 bg-troh-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">The Birth of Tayloring Rays of Hope</h2>
          
          <div className="prose prose-lg max-w-none text-white/90 space-y-6">
            <p>
              As Taylor continued treatment, she noticed something that troubled her deeply. Other patients were being turned away, not because their cancer was worse, but because they could not afford co-pays, transportation, food or basic necessities.
            </p>
            <p>
              "I saw older people get turned around," she said. "They couldn't eat. They couldn't get to treatment."
            </p>
            <p>
              Taylor began paying co-pays out of her own pocket. She slid her debit card across clinic counters to cover costs for others. She drove patients from Rocky Mount and Wilson to Chapel Hill multiple times a week. She gave coats, socks and toiletries to strangers sitting beside her during treatment.
            </p>
            <p className="font-semibold text-xl">
              "That gave me a feeling like I'd won the lottery."
            </p>
            <p>
              Those moments became the foundation of Tayloring Rays of Hope, which aims to quietly cover costs that would otherwise fall through the cracks for patients.
            </p>
            <p className="font-semibold italic">
              "I don't want my name anywhere," Taylor said. "Just tell them it was Rays of Hope."
            </p>
          </div>
        </div>
      </section>

      {/* Remission & Mission */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-troh-dark mb-8">Remission and Purpose</h2>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p>
              December marks four months that Taylor's cancer has been in remission. No cancer has appeared on Taylor's scans or bloodwork. Her doctors remain cautious, but hopeful.
            </p>
            <blockquote className="border-l-4 border-troh-gold pl-6 text-xl text-troh-dark font-semibold">
              "The devil said stage four terminal," she said. "But I'm still here."
            </blockquote>
            <p>
              Her body still bears the cost. Weight gain, chronic pain, missing fingernails, neuropathy and recurring hospital visits remain part of daily life. Still, Taylor rises each morning with intention.
            </p>
            <p className="text-troh-gold font-semibold text-xl">
              "I wasn't supposed to be here. God has work for me to do."
            </p>
            <p>
              She believes that work is advocacy.
            </p>
            <p>
              Tayloring Rays of Hope is still in its early stages. Taylor is building the website herself, applying for grants and fundraising for a planned fashion show next summer for patients.
            </p>
            <p>
              She hopes one day to work directly with oncology offices, quietly bridging gaps patients are often too overwhelmed to navigate.
            </p>
            <p>
              Taylor encourages residents to get screened, check on loved ones and support organizations helping patients navigate life during treatment.
            </p>
            <blockquote className="border-l-4 border-troh-gold pl-6 text-xl text-troh-dark font-semibold">
              "This diagnosis made me a stronger person," she said. "I didn't know I could be this strong."
            </blockquote>
            <p>
              And so, each morning, she wakes up grateful.
            </p>
            <p className="text-troh-gold font-semibold text-2xl text-center mt-8">
              "Waking up is a blessing. Everything else is extra."
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 bg-gradient-to-br from-troh-secondary/30 to-troh-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sun className="w-16 h-16 mx-auto mb-6 text-troh-primary" />
          <h2 className="text-3xl md:text-4xl font-bold text-troh-dark mb-8">Our Mission</h2>
          <p className="text-xl md:text-2xl leading-relaxed text-gray-700">
            Tayloring Rays of Hope is more than a foundation—it's a light in the darkness for those facing life-changing diagnoses. Being thrust into my own diagnoses, I created this space to give back one ray of hope at a time.
          </p>
          <p className="text-xl md:text-2xl leading-relaxed mt-6 text-gray-700">
            When your world shifts and everything feels uncertain—know this: sunshine still exists. It may not always be bright, but it's always there. And so am I.
          </p>
          <p className="text-lg mt-8 text-gray-600">
            Through heartfelt support, spiritual guidance, practical inspiration, and raw clarity, Tayloring Rays of Hope stands as a reminder: <strong className="text-troh-primary">you are never alone.</strong>
          </p>
          <div className="mt-12">
            <blockquote className="text-2xl italic text-troh-dark">
              "Even in the face of no cure, there is still courage. You are not your diagnosis—you are strength, light, and the living proof that hope refuses to fade."
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
