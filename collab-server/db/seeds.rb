puts "🌱 Seeding..."

User.create([
  {
    name: "Jim"
  },
  {
    name: "KayDee"
  },
  {
    name: "Jacky Skellz"
  },
  {
    name: "Wyze Guy"
  },
  {
    name: "Task Whisperer"
  }
])

Project.create([
 {
  name: "Proj One"
  },
  {
    name: "Proj Two"
  },
  {
    name: "Proj Three"
  },
  {
    name: "Proj Four"
  }
])

Task.create([
  {
    name: "Task 1 Proj 4",
    completedYN: false,
    user_id: 5,
    project_id:4
  },
  {
    name: "special task",
    completedYN: false,
    user_id: 2,
    project_id:3
  },
  {
    name: "very special task",
    completedYN: false,
    user_id: 2,
    project_id:1
  },
  {
    name: "task Two Proj Four",
    completedYN: false,
    user_id: 5,
    project_id:4
  },
  {
    name: "task Three Proj 3",
    completedYN: false,
    user_id: 3,
    project_id:3
  },
  {
    name: "taskFOUR",
    completedYN: false,
    user_id: 2,
    project_id:2
  },
  {
    name: "Task 1 Proj 1",
    completedYN: false,
    user_id: 1,
    project_id: 1
  }
])

puts "✅ Done seeding!"
