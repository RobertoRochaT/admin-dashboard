export const recentConsults = [
    {
        user: "John Doe",
        query: "How to reset my password?",
        responseTime: "2 min",
        status: "Pending",
        date: "2021-10-03",
    },
    {
        user: "Jane Doe",
        query: "How to reset my password?",
        responseTime: "3 min",
        status: "Resolved",
        date: "2021-11-12",
    },
    {
        user: "Alice Johnson",
        query: "How to change my email address?",
        responseTime: "4 min",
        status: "Pending",
        date: "2022-01-15",
    },
    {
        user: "Bob Smith",
        query: "Account locked, how to unlock?",
        responseTime: "5 min",
        status: "Resolved",
        date: "2023-03-20",
    },
    {
        user: "Charlie Brown",
        query: "Where can I find my purchase history?",
        responseTime: "3 min",
        status: "Pending",
        date: "2024-06-07",
    },
    // Más entradas generadas automáticamente...
];

// Generador automático para las otras 995 entradas:
const generateRandomConsults = () => {
    const users = ["John Doe", "Jane Doe", "Alice Johnson", "Bob Smith", "Charlie Brown"];
    const queries = [
        "How to reset my password?",
        "How to change my email address?",
        "Account locked, how to unlock?",
        "Where can I find my purchase history?",
        "What is my account balance?",
    ];
    const statuses = ["Pending", "Resolved", "In Progress"];
    const randomDate = () => {
        const year = 2020 + Math.floor(Math.random() * 5);
        const month = String(1 + Math.floor(Math.random() * 12)).padStart(2, "0");
        const day = String(1 + Math.floor(Math.random() * 28)).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const consults = [];
    for (let i = 0; i < 50; i++) {
        consults.push({
            user: users[Math.floor(Math.random() * users.length)],
            query: queries[Math.floor(Math.random() * queries.length)],
            responseTime: `${1 + Math.floor(Math.random() * 10)} min`,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            date: randomDate(),
        });
    }
    return consults;
};

recentConsults.push(...generateRandomConsults());