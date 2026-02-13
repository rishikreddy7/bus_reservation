```mermaid
erDiagram
    USERS ||--o{ BOOKINGS : "makes"
    BUSES ||--o{ SCHEDULES : "assigned to"
    ROUTES ||--o{ SCHEDULES : "has"
    SCHEDULES ||--o{ BOOKINGS : "has"
    BOOKINGS ||--o{ BOOKING_PASSENGERS : "contains"

    USERS {
        int id PK
        string name
        string email UK
        string password
        enum role
        timestamp created_at
    }

    BUSES {
        int id PK
        string bus_number UK
        int total_seats
        string bus_type
        timestamp created_at
    }

    ROUTES {
        int id PK
        string source
        string destination
        int travel_time
        timestamp created_at
    }

    SCHEDULES {
        int id PK
        int bus_id FK
        int route_id FK
        date date_of_journey
        time departure_time
        time arrival_time
        timestamp created_at
    }

    BOOKINGS {
        int id PK
        int user_id FK
        int schedule_id FK
        string ticket_id UK
        timestamp booking_time
        enum status
    }

    BOOKING_PASSENGERS {
        int id PK
        int booking_id FK
        int seat_number
        string passenger_name
        int age
        enum gender
    }
```

## Entity Relationship Diagram Explanation

This ER diagram represents a Bus Booking System with the following entities and relationships:

1. **USERS**
   - Primary key: id
   - Unique constraint: email
   - One user can make many bookings (1:N)

2. **BUSES**
   - Primary key: id
   - Unique constraint: bus_number
   - One bus can have many schedules (1:N)

3. **ROUTES**
   - Primary key: id
   - Composite index: source, destination
   - One route can have many schedules (1:N)

4. **SCHEDULES**
   - Primary key: id
   - Foreign keys: bus_id, route_id
   - One schedule can have many bookings (1:N)

5. **BOOKINGS**
   - Primary key: id
   - Foreign keys: user_id, schedule_id
   - Unique constraint: ticket_id
   - One booking can have many passengers (1:N)

6. **BOOKING_PASSENGERS**
   - Primary key: id
   - Foreign key: booking_id
   - Contains passenger details for each booking

### Relationship Cardinality:
- USERS to BOOKINGS: One-to-Many (1:N)
- BUSES to SCHEDULES: One-to-Many (1:N)
- ROUTES to SCHEDULES: One-to-Many (1:N)
- SCHEDULES to BOOKINGS: One-to-Many (1:N)
- BOOKINGS to BOOKING_PASSENGERS: One-to-Many (1:N) 