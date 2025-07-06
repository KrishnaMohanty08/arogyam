import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const remedyMap = {
  cold: "🤧 For a common cold, rest well, stay hydrated, and sip on warm fluids like ginger-honey tea. Steam inhalation may also help relieve nasal congestion.",
  headache: "💆‍♀️ For mild headaches, stay hydrated, avoid screen glare, and rest in a quiet space. A warm compress on your forehead or neck may ease tension.",
  fever: "🌡️ For a mild fever, drink plenty of water, wear light clothing, and rest. If your temperature rises or persists, contact a medical professional.",
  stomachache: "🍵 A warm cup of chamomile tea or water with a pinch of carom seeds can help relieve stomach discomfort. Avoid fried or spicy foods until you feel better.",
  cough: "🫁 Soothe a cough with warm turmeric milk or honey-lemon water. Avoid cold or sugary drinks. If the cough persists or worsens, seek medical attention.",
  constipation: "🥝 Include fiber-rich foods like papaya, soaked raisins, or oats. Stay active and drink warm water, especially in the morning.",
  indigestion: "🫖 Ginger tea or fennel seeds can help calm indigestion. Eat slowly and avoid heavy meals late at night.",
  sorethroat: "🗣️ Gargle with warm salt water and drink ginger-infused warm liquids. Honey is also known to help soothe irritation.",
  acidity: "🍋 For acidity, avoid spicy/oily food, eat smaller meals, and try drinking cold milk or basil-infused warm water.",
  diarrhea: "🚰 Stay hydrated with ORS or coconut water. Avoid solid or oily food. A banana and rice diet can help settle your stomach.",
};

export async function POST(req) {
  try {
    const { message } = await req.json();
    const cleaned = message?.trim().toLowerCase();

    if (!cleaned) {
      return new Response(
        JSON.stringify({ reply: "⚠️ Please describe your issue so I can assist you." }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // ✅ Priority 1: Remedy keyword match
    for (const [keyword, advice] of Object.entries(remedyMap)) {
      const regex = new RegExp(`\\b${keyword}\\b`, 'i');
      if (regex.test(cleaned)) {
        return new Response(JSON.stringify({ reply: advice }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // ✅ Priority 2: Greeting match
    if (/\bhi\b|\bhello\b/i.test(cleaned)) {
      return new Response(
        JSON.stringify({
          reply: "🩺 Hi again! Just let me know what you'd like help with — I can assist with first aid, symptoms, and wellness tips.",
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // ✅ Fallback: OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `
You are Arogyam AI Shevak — a kind and attentive healthcare companion.
You offer:
- Home remedies & wellness suggestions
- Symptom awareness aligned with SDG Goal 3
- First-aid guidance in a calm, helpful tone

⚠️ You do not diagnose, prescribe, or replace medical professionals.
Instead, guide users to seek clinical help when serious symptoms arise.
Speak simply and compassionately.
          `.trim(),
        },
        { role: 'user', content: message },
      ],
      temperature: 0.6,
    });

    const reply = completion.choices?.[0]?.message?.content?.trim();

    return new Response(
      JSON.stringify({
        reply: reply || "🤖 I'm not sure how to help with that. Can you rephrase?",
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('API error:', err);
    return new Response(
      JSON.stringify({
        reply: '⚠️ Arogyam AI Shevak is currently unavailable. Please try again later.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
