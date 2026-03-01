import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "./models/Job.js";
import Application from "./models/Application.js";

dotenv.config();

const jobs = [
  {
    title: "Senior Full Stack Engineer",
    company: "TechNova Solutions",
    location: "Remote",
    category: "Software Development",
    description: "We are looking for a Senior Full Stack Engineer with expertise in Next.js, Node.js, and MongoDB to join our globally distributed team. You will lead architecture decisions and mentor junior developers. 5+ years of experience required."
  },
  {
    title: "Product Designer",
    company: "CreativeEdge Studios",
    location: "New York, NY",
    category: "Design",
    description: "Seeking a visionary Product Designer who is obsessed with user experience. You will collaborate closely with engineering to build beautiful, functional interfaces. Figma mastery is a must."
  },
  {
    title: "DevOps Engineer",
    company: "CloudScale Inc",
    location: "Austin, TX (Hybrid)",
    category: "Operations",
    description: "Join our infrastructure team to manage and scale our AWS-based microservices architecture. Kubernetes, Docker, and CI/CD pipeline automation experience is essential."
  },
  {
     title: "Marketing Manager",
     company: "GrowthX",
     location: "London, UK",
     category: "Marketing",
     description: "Looking for a data-driven Marketing Manager to lead our user acquisition campaigns. Experience with B2B SaaS scaling preferred."
  },
  {
    title: "Frontend Developer (React)",
    company: "WebWizards",
    location: "Remote",
    category: "Software Development",
    description: "Looking for an energetic Frontend Developer with React/Next.js and Tailwind CSS experience to build highly interactive web applications."
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/job-board");
    console.log("Connected to MongoDB for Seeding...");

    // Clear existing data
    await Job.deleteMany({});
    await Application.deleteMany({});
    console.log("Previous data cleared.");

    // Insert new data
    await Job.insertMany(jobs);
    console.log("Database seeded successfully!");

    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
