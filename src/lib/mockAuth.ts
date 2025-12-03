export type MockUser = {
    name: string;
    email: string;
    password: string;
};

// helper pentru a încărca userii din localStorage
const getUsers = (): MockUser[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem("mockUsers");
    return data ? JSON.parse(data) : [];
};

const saveUsers = (users: MockUser[]) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("mockUsers", JSON.stringify(users));
};

export const mockRegister = async (name: string, email: string, password: string) => {
    const users = getUsers();
    const exists = users.find(u => u.email === email);
    if (exists) throw new Error("User already exists");

    const newUser = { name, email, password };
    users.push(newUser);
    saveUsers(users);

    return { message: "Registered", user: { name, email } };
};

export const mockLogin = async (email: string, password: string) => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error("Invalid credentials");

    const token = "mock-jwt-token-123456"; // fake token
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify({ name: user.name, email: user.email }));

    return { message: "Logged in", token, user: { name: user.name, email: user.email } };
};

export const mockLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return { message: "Logged out" };
};
