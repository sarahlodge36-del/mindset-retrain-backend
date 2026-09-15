const express = require('express');
const cors = require('cors');
const { connectDB, getDB } = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// MOODS
app.get("/api/moods", async (req, res) => {
  const db = getDB();
  const moods = await db.collection('moods').find({}).toArray();
  res.json(moods);
});

app.post("/api/moods", async (req, res) => {
  const db = getDB();
  let newMood = {
    mood: req.body.mood,
    timestamp: new Date().toLocaleTimeString()
  };
  await db.collection('moods').insertOne(newMood);
  res.json({success: true, mood: newMood});
});

// FOOD
app.get("/api/foods", async (req, res) => {
  const db = getDB();
  const foods = await db.collection('foods').find({}).toArray();
  res.json(foods);
});

app.post("/api/foods", async (req, res) => {
  const db = getDB();
  let newFood = {
    name: req.body.name,
    calories: req.body.calories,
    timestamp: new Date().toLocaleTimeString()
  };
  await db.collection('foods').insertOne(newFood);
  res.json({success: true, food: newFood});
});

// EXERCISE
app.get("/api/exercises", async (req, res) => {
  const db = getDB();
  const exercises = await db.collection('exercises').find({}).toArray();
  res.json(exercises);
});

app.post("/api/exercises", async (req, res) => {
  const db = getDB();
  let newExercise = {
    name: req.body.name,
    minutes: req.body.minutes,
    calories: req.body.calories,
    timestamp: new Date().toLocaleTimeString()
  };
  await db.collection('exercises').insertOne(newExercise);
  res.json({success: true, exercise: newExercise});
});

// INSPIRATION
app.get("/api/inspirations", (req, res) => {
  let inspirations = {
    sad: "You are braver than you believe, stronger than you seem, and smarter than you think. This feeling will pass. Be kind to yourself.",
    anxious: "Anxiety is just fear in disguise. You've overcome hard things before. Take a deep breath. You've got this.",
    unmotivated: "Motivation follows action, not the other way around. Start small. Do one tiny thing. Then do another.",
    struggling: "Every struggle is a setup for a comeback. Your hard times are building your strength. Keep going.",
    lost: "Being lost is just being on a path you haven't explored yet. You're not behind. You're exactly where you need to be."
  };
  res.json(inspirations);
});

// MINDSET
app.get("/api/mindset", (req, res) => {
  let affirmations = {
    selfcare: [
      "Putting yourself first isn't selfish, it's necessary.",
      "You deserve rest without guilt.",
      "Taking care of yourself makes you stronger for others.",
      "Your mental health matters. Treat it like it does.",
      "You can't pour from an empty cup. Fill yours first."
    ],
    worthy: [
      "You are enough, right now, as you are.",
      "Your value isn't determined by productivity.",
      "You deserve love and respect, especially from yourself.",
      "You are worthy of good things.",
      "Your existence alone is worthy of celebration."
    ],
    progress: [
      "Progress isn't always visible, but it's always happening.",
      "You're doing better than you think.",
      "Every small step forward is still forward.",
      "You're closer today than yesterday.",
      "Growth happens in the uncomfortable moments."
    ],
    mistakes: [
      "Mistakes are proof you're trying.",
      "Failure is feedback, not a reflection of your worth.",
      "You can't learn without falling sometimes.",
      "Your mistakes don't define you—your response does.",
      "The best people have the most stories."
    ],
    boundaries: [
      "Saying no is an act of self-love.",
      "Your boundaries are not mean, they're necessary.",
      "You don't owe anyone your peace.",
      "It's okay to remove people from your life.",
      "Protecting your energy is protecting your future."
    ]
  };
  res.json(affirmations);
});

// SITUATIONAL
app.get("/api/situational", (req, res) => {
  let scenarios = {
    toxic: { change: -25, explanation: "Toxic people drain your energy. Your cup empties. This is why boundaries matter." },
    helping: { change: -20, explanation: "Helping others is good, but not at the cost of your own wellbeing. You can't pour from an empty cup." },
    "saying-no": { change: -15, explanation: "Not setting boundaries allows others to take from your cup. Your needs matter too." },
    "self-care": { change: 20, explanation: "Self care refills your cup. This isn't selfish—it's necessary. You need to fill your own cup first." },
    boundary: { change: 25, explanation: "Setting boundaries protects your energy. This is the most powerful thing you can do for your wellbeing." },
    rest: { change: 15, explanation: "Rest refills your cup. You need downtime to recover. Rest is productive." }
  };
  res.json(scenarios);
});

const PORT = 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(error => {
  console.error("Failed to connect to database:", error);
});