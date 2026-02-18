``mermaid
classDiagram

class User {
    +int id
    +string name
    +string email
    -string password
    +string role
    +register()
    +login()
}

class Skill {
    +int id
    +string name
    +string category
}

class UserSkill {
    +int id
    +int level
}

class CareerRole {
    +int id
    +string name
    +string description
}

class CareerRequiredSkill {
    +int id
    +int requiredLevel
}

class Roadmap {
    +int id
    +string steps
}

class AuthController {
    +login()
    +register()
}

class CareerController {
    +getRecommendations()
    +generateRoadmap()
}

class CareerService {
    +processRecommendation(userId)
    +calculateMatch()
    +identifySkillGap()
}

class UserService {
    +addSkill()
    +updateSkill()
}

class UserRepository {
    +findById()
    +save()
}

class SkillRepository {
    +findByUserId()
}

class CareerRepository {
    +findAllCareers()
}

User "1" --> "many" UserSkill
Skill "1" --> "many" UserSkill
CareerRole "1" --> "many" CareerRequiredSkill
Skill "1" --> "many" CareerRequiredSkill
CareerRole "1" --> "1" Roadmap
AuthController --> UserService
CareerController --> CareerService
CareerService --> SkillRepository
CareerService --> CareerRepository
UserService --> UserRepository
UserService --> SkillRepository
```