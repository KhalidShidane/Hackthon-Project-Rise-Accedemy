// Reusable freelancer data for the Find Talent page.
export const freelancers = [
  { id: 1, name: "Ahmed Hassan", title: "Senior Full Stack Developer", image: "https://i.pravatar.cc/150?img=12", description: "Experienced developer specializing in React and Node.js. I build scalable web applications for local businesses in Mogadishu and international clients.", skills: ["React", "Node.js", "TypeScript"], location: "Mogadishu", hourlyRate: 45, rating: 4.9, jobsCompleted: 42, verified: true, category: "Software Development" },
  { id: 2, name: "Ayan Mohamed", title: "UI/UX Designer", image: "https://i.pravatar.cc/150?img=47", description: "Transforming complex problems into elegant, user-centric interfaces. Specializing in SaaS and marketplace platforms.", skills: ["Figma", "Wireframing", "User Research"], location: "Hargeisa", hourlyRate: 35, rating: 5.0, jobsCompleted: 28, verified: true, category: "Design & Creative" },
  { id: 3, name: "Hassan Mohamed", title: "Full Stack Developer", image: "https://i.pravatar.cc/150?img=14", description: "Builds fast, secure web applications for growing businesses and startups.", skills: ["React", "MongoDB", "Express"], location: "Mogadishu", hourlyRate: 28, rating: 4.9, jobsCompleted: 24, verified: true, category: "Software Development" },
  { id: 4, name: "Farhia Ali", title: "Brand and Graphic Designer", image: "https://i.pravatar.cc/150?img=45", description: "Creates memorable brands, social media graphics, and marketing materials for ambitious teams.", skills: ["Branding", "Photoshop", "Illustration"], location: "Garowe", hourlyRate: 24, rating: 4.8, jobsCompleted: 19, verified: true, category: "Design & Creative" },
  { id: 5, name: "Ismail Abdullahi", title: "Mobile App Developer", image: "https://i.pravatar.cc/150?img=11", description: "Develops reliable Android and iOS mobile applications from idea to launch.", skills: ["Flutter", "React Native", "Firebase"], location: "Beledweyne", hourlyRate: 38, rating: 4.8, jobsCompleted: 31, verified: true, category: "Software Development" },
  { id: 6, name: "Sahra Osman", title: "Content Writer and Translator", image: "https://i.pravatar.cc/150?img=32", description: "Writes engaging Somali and English content for websites, blogs, and social media campaigns.", skills: ["Copywriting", "Translation", "SEO"], location: "Hargeisa", hourlyRate: 20, rating: 4.9, jobsCompleted: 35, verified: true, category: "Writing & Translation" },
  { id: 7, name: "Mohamed Warsame", title: "WordPress Developer", image: "https://i.pravatar.cc/150?img=68", description: "Builds professional WordPress and e-commerce websites that are easy to manage.", skills: ["WordPress", "WooCommerce", "PHP"], location: "Kismayo", hourlyRate: 26, rating: 4.7, jobsCompleted: 22, verified: false, category: "Software Development" },
  { id: 8, name: "Hodan Yusuf", title: "Social Media Manager", image: "https://i.pravatar.cc/150?img=44", description: "Plans and manages social media content that helps Somali brands reach more customers.", skills: ["Social Media", "Content Strategy", "Canva"], location: "Baidoa", hourlyRate: 18, rating: 4.7, jobsCompleted: 17, verified: true, category: "Design & Creative" },
];

// The profile page uses this shape, while the Find Talent page uses `freelancers` above.
export const demoFreelancers = freelancers.map((freelancer) => ({
  ...freelancer,
  _id: String(freelancer.id),
  profileImage: freelancer.image,
  bio: freelancer.description,
  about: freelancer.description,
  background: "Available for freelance projects with Somali and international teams.",
  education: "Professional freelancer",
  experience: `${freelancer.jobsCompleted} completed projects`,
}));
