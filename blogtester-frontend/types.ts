export interface User {
  _id: string;
  email: string;
  username?: string;
  // Add other user fields if your backend returns them
}

export interface Article {
  _id: string;
  title: string;
  content: string;
  author?: User | string; // Depending on if your backend populates the author
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  content: string;
  articleId: string;
  article?: Article | string; // Populated article
  author?: User | string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  userId: string; // Assuming backend sends userId or user object
  user?: User;
}