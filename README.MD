# Finance Management API

## Project Description

This RESTful API enables users to manage their personal finances effectively. Users can create accounts, track expenses and income, set budgets, and generate detailed financial reports. The API covers CRUD operations, user authentication and authorization, data validation, and complex database relationships.

## Key Features and Endpoints

### 1. User Authentication and Authorization

- **Signup**: `POST /auth/signup`
  - Allows users to create an account by providing a username, email, and password.
- **Login**: `POST /auth/login`
  - Authenticates users and provides a JWT token for secure future requests.
- **Password Reset**: `POST /auth/reset-password`
  - Sends an email with a password reset link to the user.
- **Logout**: `POST /auth/logout`
  - Invalidates the user’s session by deactivating their token.

### 2. User Profile

- **Get Profile**: `GET /user/profile`
  - Retrieves the user’s profile information.
- **Update Profile**: `PUT /user/profile`
  - Allows users to update their profile (e.g., username, email).
- **Change Password**: `PUT /user/change-password`
  - Enables users to change their password.

### 3. Account Management

- **Create Account**: `POST /accounts`
  - Creates a financial account (e.g., Bank, Credit Card, Cash) with an initial balance.
- **List Accounts**: `GET /accounts`
  - Retrieves a list of all user’s financial accounts.
- **Update Account**: `PUT /accounts/:id`
  - Allows users to update account details, such as renaming.
- **Delete Account**: `DELETE /accounts/:id`
  - Deletes an account, with optional cascading to remove associated transactions.

### 4. Transaction Management

- **Create Transaction**: `POST /transactions`
  - Creates a transaction linked to an account. Types: expense, income, or transfer.
- **List Transactions**: `GET /transactions`
  - Retrieves a paginated list of transactions, with filters for date range, account, or type.
- **Update Transaction**: `PUT /transactions/:id`
  - Edits a transaction (e.g., change amount, category).
- **Delete Transaction**: `DELETE /transactions/:id`
  - Deletes a specific transaction.
- **Transaction Categories**: `GET /transactions/categories`
  - Lists transaction categories (e.g., Food, Utilities, Entertainment).

### 5. Budgeting

- **Create Budget**: `POST /budgets`
  - Allows users to set a monthly budget for a category (e.g., $500 for Food).
- **List Budgets**: `GET /budgets`
  - Lists all active budgets with spent amounts and remaining balance.
- **Update Budget**: `PUT /budgets/:id`
  - Adjusts a budget (e.g., increase/decrease monthly limits).
- **Delete Budget**: `DELETE /budgets/:id`
  - Deletes a specific budget.

### 6. Financial Reports

- **Monthly Report**: `GET /reports/monthly`
  - Generates a monthly summary of income and expenses.

## Implementation Details

### 1. Tech Stack

- **Framework**: Express (TypeScript)
- **Authentication**: JWT for session management with route protection.
- **ORM**: Prisma for database operations and schema handling.
- **Database**: PostgreSQL or SQLite for local development.

### 2. Relations

- **User ⟶ Account**: One-to-Many
- **User ⟶ Transaction**: One-to-Many
- **User ⟶ Budget**: One-to-Many
- **Account ⟶ Transaction**: One-to-Many
- Cascade deletion: Deleting an account also deletes related transactions.

## Getting Started

1. **Clone the repository**: `git clone https://github.com/vitalii-hrymalyuk/finance-management-api.git`
2. **Install dependencies**: `npm install`
3. **Setup environment variables**: Create a `.env` file based on `.env.example`.
4. **Run migrations**: `npx prisma migrate dev`
5. **Start the server**: `npm run dev`

## License

This project is licensed under the MIT License. See `LICENSE` for more details.

## Contact Information

- **Author**: Vitalii Hrymalyuk
- **Email**: [vitalii.hrymalyuk@gmail.com](mailto:vitalii.hrymalyuk@gmail.com)

Feel free to reach out if you have any questions or need assistance setting up the project.
