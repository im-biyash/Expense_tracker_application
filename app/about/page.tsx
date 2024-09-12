"use client";
import React from "react";
import Image from "next/image";
import profilePic from "../assets/profilePic.png"; // Replace with your actual profile image
import { Button } from "@/components/ui/button";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

const About = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-[90vh] p-6 pt-2 mt-0 "> {/* Adjusted padding based on screen size */}
      
      {/* Left side - Profile Photo */}
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center mb-6 md:mb-0">
        <Image
          src={profilePic} // Replace with your image path
          alt="Profile Picture"
          width={300}
          height={300}
          className="rounded-full shadow-lg object-cover"
          priority
        />
        <h2 className="text-2xl font-bold mt-4">Biyash Shrestha</h2>

        {/* Social Media Icons */}
        <div className="flex justify-center items-center gap-6 mt-4">
          <a href="https://github.com/im-biyash" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-2xl hover:text-gray-600" />
          </a>
          <a href="https://www.linkedin.com/in/biyash-shrestha-375593278/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-2xl text-blue-600 hover:text-blue-400" />
          </a>
          <a href="https://www.instagram.com/biyash10/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-2xl text-pink-600 hover:text-pink-400" />
          </a>
        </div>
      </div>

      {/* Right side - Description */}
      <div className="w-full md:w-2/3 flex flex-col justify-center items-start md:pl-12">
        <h1 className="text-4xl font-bold mb-4">About Me &amp; This Project</h1>

        <p className="text-lg dark:text-slate-400 mb-4">
          Hello! I&apos;m an enthusiastic learner, passionate about exploring web development and building modern, user-friendly applications. Currently, I&apos;m diving deep into <strong>React.js</strong> and <strong>Next.js</strong>, with a focus on mastering the <strong>full-stack development</strong> process.
        </p>

        <p className="text-lg mb-4 dark:text-slate-400">
          This <strong>Expense Tracker</strong> is my first full-stack project, and it represents a significant milestone in my journey. The goal of this application is to simplify the way you manage your finances, providing easy-to-understand insights into your spending habits.
        </p>

        <p className="text-lg mb-4 dark:text-slate-400">
          With features like the <strong>Doughnut Chart</strong> for visualizing transactions and a responsive form to record your expenses, this app is designed for ease of use. I&apos;ve implemented <strong>Redux Toolkit</strong> for state management, and the backend is powered by <strong>Node.js</strong> and <strong>MongoDB</strong>.
        </p>

        <Button variant="default" className="mt-4">
          Explore More
        </Button>
      </div>
    </div>
  );
};

export default About;
