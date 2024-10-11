const dummyAuthTopics = [
  {
    topic: "Technology",
    sub_topic: "AI",
    related_topics: [
      { topic: "Machine Learning", num_posts: 12000 },
      { topic: "Deep Learning", num_posts: 80 },
    ],
  },
  {
    topic: "Health",
    sub_topic: "Nutrition",
    related_topics: [
      { topic: "Vitamins", num_posts: 45 },
      { topic: "Diet Plans", num_posts: 30 },
      { topic: "Eat less, exercise!", num_posts: 3000 },
    ],
  },
  {
    topic: "Finance",
    sub_topic: "Investing",
    related_topics: [
      { topic: "Stock Market", num_posts: 200 },
      { topic: "Cryptocurrency", num_posts: 1500000 },
    ],
  },
  {
    topic: "Travel",
    sub_topic: "Adventure",
    related_topics: [
      { topic: "Hiking", num_posts: 60 },
      { topic: "Camping", num_posts: 40000000 },
    ],
  },
  {
    topic: "Education",
    sub_topic: "Online Learning",
    related_topics: [
      { topic: "Web Development", num_posts: 90 },
      { topic: "Data Science", num_posts: 70 },
    ],
  },
];

export default dummyAuthTopics;
