import { Suspense } from 'react';
import dbConnect from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';
import Project from '@/models/Project';
import Navbar from './components/ui/Navbar';
import Hero from './components/sections/Hero';
import Skills from './components/sections/Skills';
import Services from './components/sections/Services';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getData() {
  await dbConnect();
  let portfolio = await Portfolio.findOne({}).lean();
  if (!portfolio) portfolio = await Portfolio.create({});
  const projects = await Project.find({}).sort({ order: 1, createdAt: -1 }).lean();
  return { portfolio, projects };
}

export default async function Home() {
  const { portfolio: p, projects } = await getData() as any;

  return (
    <main>
      <Navbar name={p.name} />
      <Hero
        name={p.name} title={p.title} tagline={p.tagline} bio={p.bio}
        github={p.github} linkedin={p.linkedin} twitter={p.twitter} website={p.website}
        profileImage={p.profileImage} profileImageType={p.profileImageType}
        stats={p.stats}
      />
      <Skills skills={p.skills} />
      <Services services={p.services} />
      <Projects projects={JSON.parse(JSON.stringify(projects))} />
      <Experience experience={p.experience} education={p.education} />
      <Contact
        email={p.email} phone={p.phone} location={p.location}
        github={p.github} linkedin={p.linkedin} twitter={p.twitter} website={p.website}
        name={p.name}
      />
    </main>
  );
}
