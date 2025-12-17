require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Article = require('./models/Article');
const Comment = require('./models/Comment');

const usersData = [
    { username: 'alice', email: 'alice@example.com' },
    { username: 'bob', email: 'bob@example.com' },
    { username: 'charlie', email: 'charlie@example.com' },
    { username: 'david', email: 'david@example.com' },
    { username: 'eve', email: 'eve@example.com' },
    { username: 'frank', email: 'frank@example.com' },
    { username: 'grace', email: 'grace@example.com' },
    { username: 'heidi', email: 'heidi@example.com' },
    { username: 'ivan', email: 'ivan@example.com' },
    { username: 'judy', email: 'judy@example.com' }
];

const markdownTitles = [
    "Getting Started with React",
    "Why Markdown is Awesome",
    "The Future of Web Development",
    "10 Tips for Clean Code",
    "Understanding Async/Await in JS",
    "My Journey to Full Stack",
    "How to use useEffect properly",
    "CSS Grid vs Flexbox: A Comparison",
    "Deploying to Production",
    "The Power of Open Source"
];

const markdownContents = [
    "# Introduction\n\nThis is a sample article written in **Markdown**. It allows for easy formatting.\n\n## Features\n- Bold text\n- Italic text\n- Lists\n\nCheck out this code:\n```javascript\nconsole.log('Hello');\n```",
    "# Deep Dive\n\nLet's explore the topic in depth. \n\n> Knowledge is power.\n\n1. First point\n2. Second point\n3. Third point\n\n[Learn more](https://example.com)",
    "# My Thoughts\n\nI recently discovered something *amazing*. \n\n## The Discovery\nIt was a `hidden gem` in the documentation.\n\n- Easy to use\n- Fast\n- Reliable",
    "# Tutorial\n\nFollow these steps:\n\n1. Install dependencies\n2. Run the server\n3. Enjoy!\n\n```bash\nnpm install\nnpm start\n```",
    "# Review\n\nHere is my honest review.\n\n| Pros | Cons |\n| --- | --- |\n| Fast | Expensive |\n| Easy | Limited |\n\n**Verdict**: 8/10"
];

const commentContents = [
    "Great article! Thanks for sharing.",
    "I found a typo in the **second paragraph**.",
    "Could you explain more about `useEffect`?",
    "This helped me a lot. *Kudos!*",
    "Interesting perspective.",
    "I disagree with point #2.",
    "Here is a related link: [Link](https://google.com)",
    "**Awesome** work!",
    "Please write more about this.",
    "First!"
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await Comment.deleteMany({});
        await Article.deleteMany({});
        await User.deleteMany({});
        console.log('Cleared existing data');

        const createdUsers = [];

        // Create Users
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123456', salt);

        for (const userData of usersData) {
            const user = new User({
                ...userData,
                password: hashedPassword
            });
            const savedUser = await user.save();
            createdUsers.push(savedUser);
        }
        console.log(`Created ${createdUsers.length} users`);

        // Create Articles and Comments
        for (const user of createdUsers) {
            const numArticles = Math.floor(Math.random() * 3) + 1; // 1 to 3 articles

            for (let i = 0; i < numArticles; i++) {
                const title = markdownTitles[Math.floor(Math.random() * markdownTitles.length)];
                const content = markdownContents[Math.floor(Math.random() * markdownContents.length)];
                const tags = ['tech', 'coding', 'javascript', 'react', 'web'].sort(() => 0.5 - Math.random()).slice(0, 3);

                const article = new Article({
                    title,
                    content,
                    tags,
                    author: user._id
                });
                const savedArticle = await article.save();

                // Create Comments for this article
                const numComments = Math.floor(Math.random() * 5); // 0 to 4 comments
                for (let j = 0; j < numComments; j++) {
                    const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
                    const commentContent = commentContents[Math.floor(Math.random() * commentContents.length)];

                    const comment = new Comment({
                        content: commentContent,
                        author: randomUser._id,
                        article: savedArticle._id
                    });
                    await comment.save();
                }
            }
        }
        console.log('Database enriched successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
