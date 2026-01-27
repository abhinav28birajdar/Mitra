export const MOCK_USER = {
    id: 'user_123',
    name: 'Abhinav Birajdar',
    email: 'abhinavbirajdar28@gmail.com',
    password: '12345678', // In real app, never store plain text
    avatar: 'https://i.pravatar.cc/300',
    streak: 5,
    points: 1250,
    level: 7,
    goals: ['Web Development', 'AI Engineering'],
    skills: [
        { name: 'JavaScript', level: 0.8 },
        { name: 'React Native', level: 0.6 },
        { name: 'Python', level: 0.4 },
    ],
};

export const CAREERS = [
    {
        id: '1',
        title: 'Frontend Developer',
        industry: 'Technology',
        salary: '$70k - $120k',
        growth: '+15%',
        match: 85,
        description: 'Build beautiful user interfaces using modern web technologies.',
        skills: ['React', 'CSS', 'JavaScript'],
    },
    {
        id: '2',
        title: 'AI Engineer',
        industry: 'Technology',
        salary: '$100k - $180k',
        growth: '+25%',
        match: 92,
        description: 'Develop and deploy machine learning models.',
        skills: ['Python', 'TensorFlow', 'PyTorch'],
    },
    {
        id: '3',
        title: 'Product Manager',
        industry: 'Business',
        salary: '$90k - $150k',
        growth: '+10%',
        match: 60,
        description: 'Lead product development and strategy.',
        skills: ['Communication', 'Strategy', 'Agile'],
    },
];

export const LEARNING_PATHS = [
    {
        id: 'path_1',
        title: 'React Native Mastery',
        progress: 0.4,
        totalModules: 10,
        completedModules: 4,
        image: 'https://reactnative.dev/img/tiny_logo.png', // Placeholder
        difficulty: 'Intermediate',
        duration: '20 Hours',
    },
    {
        id: 'path_2',
        title: 'Intro to Gemini AI',
        progress: 0.1,
        totalModules: 5,
        completedModules: 0,
        image: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg', // Placeholder
        difficulty: 'Beginner',
        duration: '5 Hours',
    },
];

export const RECENT_CHATS = [
    {
        id: 'chat_1',
        title: 'Career Advice',
        lastMessage: 'Here are some suggestions for your resume...',
        time: '2h ago',
    },
    {
        id: 'chat_2',
        title: 'React Hooks Help',
        lastMessage: 'useEffect runs after render...',
        time: '1d ago',
    },
];
